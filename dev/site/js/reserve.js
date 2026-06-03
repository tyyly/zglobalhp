/* Z&GLOBAL reservation form -> BFF (/api/reserve) -> Hireservice public booking API */
(function () {
  "use strict";

  var form = document.getElementById("reserveForm");
  if (!form) return;

  var BFF_ENDPOINT = "/api/reserve";

  var submitBtn = document.getElementById("rf-submit");
  var alertBox = document.getElementById("formAlert");
  var successBox = document.getElementById("reserveSuccess");

  // ---- hCaptcha human-check (verified server-side in the /api/reserve BFF) ----
  function getCaptchaToken() {
    var el = form.querySelector('[name="h-captcha-response"]');
    if (el && el.value) return el.value;
    if (window.hcaptcha && typeof window.hcaptcha.getResponse === "function") {
      try { return window.hcaptcha.getResponse() || ""; } catch (e) {}
    }
    return "";
  }
  function resetCaptcha() {
    if (window.hcaptcha && typeof window.hcaptcha.reset === "function") {
      try { window.hcaptcha.reset(); } catch (e) {}
    }
  }
  // hCaptcha data-callback: clear the captcha error message once solved
  window.zgCaptchaSolved = function () {
    var msg = form.querySelector('[data-error-for="captcha"]');
    if (msg) msg.classList.remove("show");
  };

  function t(key) {
    var i18n = window.ZGLOBAL_I18N;
    if (!i18n) return key;
    var lang = i18n.getLang();
    var entry = i18n.DICT[key];
    return (entry && entry[lang]) || (entry && entry.ja) || key;
  }

  function showAlert(key) {
    alertBox.textContent = t(key);
    alertBox.classList.add("show");
    alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function clearAlert() {
    alertBox.classList.remove("show");
    alertBox.textContent = "";
  }

  function setFieldError(name, on) {
    var input = form.querySelector('[name="' + name + '"]');
    var msg = form.querySelector('[data-error-for="' + name + '"]');
    if (input) input.classList.toggle("invalid", !!on);
    if (msg) msg.classList.toggle("show", !!on);
  }
  function clearAllFieldErrors() {
    form.querySelectorAll(".field-error").forEach(function (el) { el.classList.remove("show"); });
    form.querySelectorAll(".invalid").forEach(function (el) { el.classList.remove("invalid"); });
  }

  // "2026-06-10T14:00" (local, JST assumed) -> "2026-06-10T14:00:00+09:00"
  function toIsoJst(localValue) {
    if (!localValue) return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(localValue);
    if (!m) return null;
    var ss = m[6] || "00";
    return m[1] + "-" + m[2] + "-" + m[3] + "T" + m[4] + ":" + m[5] + ":" + ss + "+09:00";
  }

  function val(name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : "";
  }

  function validate(payload, rawPax, pickupLocalValue) {
    var firstBad = null;
    function fail(name) { setFieldError(name, true); if (!firstBad) firstBad = name; }

    if (!payload.name || payload.name.length < 1 || payload.name.length > 100) fail("name");
    if (!payload.phone || payload.phone.length < 8 || payload.phone.length > 20) fail("phone");
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) fail("email");
    if (!pickupLocalValue || !payload.pickupAt) fail("pickupAt");
    if (!payload.pickupLocation || payload.pickupLocation.length > 200) fail("pickupLocation");
    if (!payload.dropoffLocation || payload.dropoffLocation.length > 200) fail("dropoffLocation");
    var pax = parseInt(rawPax, 10);
    if (!(pax >= 1 && pax <= 20)) fail("passengerCount");
    if (!form.querySelector('[name="privacy"]').checked) fail("privacy");
    if (!payload.hcaptchaToken) fail("captcha");

    return firstBad;
  }

  function buildNote() {
    var parts = [];
    var purpose = val("purpose");
    var vehicle = val("vehicle");
    var note = val("note");
    if (purpose) parts.push(t("page.contact.f.purpose") + ": " + purpose);
    if (vehicle) parts.push(t("page.contact.f.car") + ": " + vehicle);
    if (note) parts.push(note);
    return parts.join("\n").slice(0, 1000);
  }

  function setLoading(on) {
    submitBtn.disabled = on;
    var title = submitBtn.querySelector(".btn-title");
    if (on) {
      submitBtn.dataset.label = title.textContent;
      title.textContent = t("reserve.submitting");
      if (!submitBtn.querySelector(".btn-spinner")) {
        var sp = document.createElement("span");
        sp.className = "btn-spinner";
        submitBtn.appendChild(sp);
      }
    } else {
      if (submitBtn.dataset.label) title.textContent = submitBtn.dataset.label;
      var spinner = submitBtn.querySelector(".btn-spinner");
      if (spinner) spinner.remove();
    }
  }

  function fmtJst(isoUtc) {
    // API returns UTC ISO; show in JST
    try {
      var d = new Date(isoUtc);
      return new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hour12: false
      }).format(d);
    } catch (e) { return isoUtc; }
  }

  function showSuccess(result) {
    document.getElementById("rs-no").textContent = result.reservationNo || "—";
    var recap = document.getElementById("rs-recap");
    recap.innerHTML = "";
    function row(labelKey, value) {
      if (!value) return;
      var div = document.createElement("div");
      var a = document.createElement("span"); a.textContent = t(labelKey);
      var b = document.createElement("span"); b.textContent = value;
      div.appendChild(a); div.appendChild(b); recap.appendChild(div);
    }
    row("reserve.recap.datetime", result.pickupAt ? fmtJst(result.pickupAt) : "");
    row("reserve.recap.route", (result.pickupLocation || "") + " → " + (result.dropoffLocation || ""));
    row("reserve.recap.pax", result.passengerCount != null ? String(result.passengerCount) : "");

    form.style.display = "none";
    successBox.classList.add("show");
    successBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;
    clearAlert();
    clearAllFieldErrors();

    var pickupLocalValue = val("pickupAt");
    var rawPax = val("passengerCount");
    var payload = {
      name: val("name"),
      phone: val("phone"),
      pickupAt: toIsoJst(pickupLocalValue),
      pickupLocation: val("pickupLocation"),
      dropoffLocation: val("dropoffLocation"),
      passengerCount: parseInt(rawPax, 10),
      source: "web"
    };
    var email = val("email");
    if (email) payload.email = email;
    var note = buildNote();
    if (note) payload.note = note;

    // anti-spam: honeypot + hCaptcha token (both verified server-side at /api/reserve)
    var honeypot = form.querySelector('[name="botcheck"]');
    payload.botcheck = honeypot && honeypot.checked ? "on" : "";
    payload.hcaptchaToken = getCaptchaToken();

    var firstBad = validate(payload, rawPax, pickupLocalValue);
    if (firstBad) {
      var alertKey = firstBad === "privacy" ? "reserve.err.f.privacy"
                   : firstBad === "captcha" ? "reserve.err.captcha"
                   : "reserve.err.required";
      showAlert(alertKey);
      var badEl = form.querySelector('[name="' + firstBad + '"]');
      if (badEl) badEl.focus();
      return;
    }

    setLoading(true);
    fetch(BFF_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          return { status: res.status, body: body };
        });
      })
      .then(function (r) {
        if (r.status === 201) {
          showSuccess(r.body);
          return;
        }
        if (r.status === 400) {
          // map class-validator field messages back to fields where possible
          var errs = (r.body && r.body.errors) || [];
          var map = {
            name: "name", phone: "phone", email: "email", pickupAt: "pickupAt",
            pickupLocation: "pickupLocation", dropoffLocation: "dropoffLocation",
            passengerCount: "passengerCount"
          };
          var matched = false;
          errs.forEach(function (msg) {
            Object.keys(map).forEach(function (field) {
              if (typeof msg === "string" && msg.indexOf(field) === 0) {
                setFieldError(map[field], true); matched = true;
              }
            });
          });
          showAlert(matched ? "reserve.err.400" : "reserve.err.400");
        } else if (r.status === 403) {
          // honeypot / hCaptcha rejected by the BFF
          setFieldError("captcha", true);
          showAlert("reserve.err.captcha");
        } else if (r.status === 422) {
          setFieldError("pickupAt", true);
          showAlert("reserve.err.422");
        } else if (r.status === 429) {
          var retry = (r.body && r.body.retryAfterSeconds) || null;
          var base = t("reserve.err.429");
          alertBox.textContent = retry ? base + " (" + retry + "s)" : base;
          alertBox.classList.add("show");
          alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          showAlert("reserve.err.500");
        }
      })
      .catch(function () {
        showAlert("reserve.err.500");
      })
      .finally(function () {
        setLoading(false);
        // hCaptcha tokens are single-use; reset so a retry requires a fresh check
        resetCaptcha();
      });
  });

  // clear a field's error as the user edits it
  form.addEventListener("input", function (e) {
    var name = e.target.name;
    if (name) setFieldError(name, false);
  });

  // copy reservation number
  var copyBtn = document.getElementById("rs-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var no = document.getElementById("rs-no").textContent;
      var done = function () {
        var orig = copyBtn.dataset.orig || copyBtn.textContent;
        copyBtn.dataset.orig = orig;
        copyBtn.textContent = t("reserve.copied");
        setTimeout(function () { copyBtn.textContent = t("reserve.copy"); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(no).then(done).catch(done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = no; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  // reset for another reservation
  var againBtn = document.getElementById("rs-again");
  if (againBtn) {
    againBtn.addEventListener("click", function () {
      form.reset();
      clearAllFieldErrors();
      clearAlert();
      successBox.classList.remove("show");
      form.style.display = "";
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
