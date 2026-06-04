#!/usr/bin/env python3
"""言語別URL（/en /zh /ko）の静的HTMLを root(ja) から生成し、全ファイルの hreflang を統一する。
- 各言語ファイル: <html lang>, title, meta description, OGP(og:title/description/url/locale),
  twitter, canonical を翻訳/言語別URLに置換。相対アセット参照を ../ に補正。
- root(ja) ファイル: hreflang ブロックを言語別URL方式へ更新（in place）。
本文テキストは i18n.js がブラウザ側で翻訳するため、body は ja のまま複製する。
冪等: 常に root から生成するので再実行で重複しない。
"""
import os, re

ROOT = "dev/site"
BASE = "https://www.z-global.jp"
PAGES = ["index.html", "about.html", "services.html", "fleet.html", "contact.html"]
LANGS = ["en", "zh", "ko"]
LOCALE = {"ja": "ja_JP", "en": "en_US", "zh": "zh_CN", "ko": "ko_KR"}

TITLE = {
  "index.html": {
    "en": "Premium Chauffeur Haneda & Narita | Z&GLOBAL - Airport, Executive & Tour",
    "zh": "羽田・成田高级包车 Z&GLOBAL | 机场接送・商务接送・观光包车 4语言对应",
    "ko": "하네다・나리타 고급 하이어 Z&GLOBAL | 공항 픽업・임원 의전・관광 전세 4개국어",
  },
  "about.html": {
    "en": "About Us | Z&GLOBAL - Trusted Haneda & Narita Chauffeur Service",
    "zh": "公司介绍 | Z&GLOBAL - 羽田・成田包车接送的实绩与信赖",
    "ko": "회사 소개 | Z&GLOBAL - 하네다・나리타 하이어 송영의 실적과 신뢰",
  },
  "services.html": {
    "en": "Chauffeur Services | Z&GLOBAL - Airport, Executive, Tour & Golf",
    "zh": "包车服务 | Z&GLOBAL - 机场接送・商务接送・观光・高尔夫接送",
    "ko": "하이어 서비스 | Z&GLOBAL - 공항・임원・관광・골프 송영",
  },
  "fleet.html": {
    "en": "Our Fleet | Z&GLOBAL - Alphard, Granace & Hiace Rates",
    "zh": "车辆阵容 | Z&GLOBAL - 埃尔法・格瑞维亚・海狮 价格比较",
    "ko": "차량 라인업 | Z&GLOBAL - 알파드・그란에이스・하이에이스 요금 비교",
  },
  "contact.html": {
    "en": "Contact & Booking | Z&GLOBAL - Haneda & Narita Hire, 24h",
    "zh": "联系与预约 | Z&GLOBAL - 羽田・成田包车 24小时受理",
    "ko": "문의 및 예약 | Z&GLOBAL - 하네다・나리타 하이어 24시간 접수",
  },
}

DESC = {
  "index.html": {
    "en": "Z&GLOBAL is a premium chauffeur company based at Haneda & Narita airports. Airport transfers, executive business transport, sightseeing charters and golf transfers in Alphard, Granace and Hiace. Multilingual chauffeurs (JP/EN/ZH/KO) serving Tokyo, Chiba, Kanagawa and Saitama.",
    "zh": "Z&GLOBAL 是以羽田・成田机场为据点的高级包车专门公司。提供埃尔法・格瑞维亚・海狮的机场接送、商务高管接送、观光包车与高尔夫接送。4种语言对应的专属司机，服务东京・千叶・神奈川・埼玉全区域。",
    "ko": "Z&GLOBAL은 하네다・나리타 공항을 거점으로 하는 고급 하이어 전문 회사입니다. 알파드・그란에이스・하이에이스로 공항 픽업, 임원 비즈니스 의전, 관광 전세, 골프 송영을 제공. 4개국어 대응 전속 기사가 도쿄・지바・가나가와・사이타마 전 지역을 운행합니다.",
  },
  "about.html": {
    "en": "About Z&GLOBAL. Based at Haneda & Narita, we specialize in chauffeur transfers, sightseeing charters, airport and executive transport. Alphard, Granace and Hiace fleet. Multilingual support in Japanese, English, Chinese and Korean.",
    "zh": "Z&GLOBAL 公司介绍。以羽田・成田为据点，专营包车接送、观光包车、机场接送与高管接送。拥有埃尔法・格瑞维亚・海狮车辆。提供日语・英语・中文・韩语对应。",
    "ko": "Z&GLOBAL 회사 소개. 하네다・나리타를 거점으로 하이어 송영, 관광 전세, 공항 픽업, 임원 의전을 전문으로 합니다. 알파드・그란에이스・하이에이스 보유. 일본어・영어・중국어・한국어 대응.",
  },
  "services.html": {
    "en": "Z&GLOBAL's four chauffeur services: airport transfers from Haneda & Narita to Tokyo, Kanagawa and Saitama; executive business transport for international clients; sightseeing charters to Mt. Fuji, Hakone, Kamakura and Nikko; golf and resort transfers. Monthly and multi-ride plans available.",
    "zh": "Z&GLOBAL 的四大包车服务：羽田・成田至东京・神奈川・埼玉的机场接送；面向海外客户的高管商务接送；富士山・箱根・镰仓・日光的观光包车；高尔夫与度假接送。提供月租与回数券方案。",
    "ko": "Z&GLOBAL의 4대 하이어 서비스: 하네다・나리타에서 도쿄・가나가와・사이타마로의 공항 픽업; 해외 고객 대응 임원 비즈니스 의전; 후지산・하코네・가마쿠라・닛코 관광 전세; 골프・리조트 송영. 월정액・회수권 플랜 제공.",
  },
  "fleet.html": {
    "en": "Compare Z&GLOBAL's three premium vehicles by price, capacity and features. Alphard/Vellfire (7 seats) for airport and small groups; Granace (6 seats) with web-conference setup for executives; Hiace (10 seats) for large groups and golf bags. All with USB charging, air purifier and leather seats.",
    "zh": "按价格・座位・特点比较 Z&GLOBAL 的三款高级车辆。埃尔法/威尔法（7座）适合机场接送与小团体；格瑞维亚（6座）配备网络会议设备，适合高管；海狮（10座）适合大团体与高尔夫球包。全车配备USB充电・空气净化器・真皮座椅。",
    "ko": "Z&GLOBAL의 고급 차량 3종을 요금・정원・특징으로 비교. 알파드/벨파이어(7인승)는 공항・소인원용; 그란에이스(6인승)는 웹 회의 대응 임원용; 하이에이스(10인승)는 대인원・골프백용. 전 차량 USB 충전・공기청정기・가죽시트 완비.",
  },
  "contact.html": {
    "en": "Contact Z&GLOBAL for booking, quotes and inquiries. Available 24h via phone (080-3999-0379), email, LINE, WeChat and reservation form. We usually reply within 2 hours. All services: airport, executive, tour and golf transfers.",
    "zh": "联系 Z&GLOBAL 进行预约・报价・咨询。可通过电话（080-3999-0379）・邮件・LINE・WeChat・预约表单24小时受理，通常2小时内回复。提供机场・高管・观光・高尔夫等全部接送服务。",
    "ko": "예약・견적・문의는 Z&GLOBAL로. 전화(080-3999-0379)・이메일・LINE・WeChat・예약 폼으로 24시간 접수하며 보통 2시간 이내 회신합니다. 공항・임원・관광・골프 등 전 서비스 대응.",
  },
}

# JSON-LD（構造化データ）本文の翻訳辞書。ja の JSON 値（"..."）完全一致で各言語へ置換する。
# 完全一致（前後のダブルクオート込み）なので、"千葉県"→Chiba と FAQ 文中の "千葉" を取り違える誤爆が起きない。
# 会社名は法人格サフィックスの誤訳を避けるためブランド名 "Z&GLOBAL" に統一（root ja のみ正式名 "Z&GLOBAL株式会社"）。
LD_TR = {
  "Z&GLOBAL株式会社": {"en": "Z&GLOBAL", "zh": "Z&GLOBAL", "ko": "Z&GLOBAL"},
  "東京都": {"en": "Tokyo", "zh": "东京都", "ko": "도쿄도"},
  "千葉県": {"en": "Chiba", "zh": "千叶县", "ko": "지바현"},
  "神奈川県": {"en": "Kanagawa", "zh": "神奈川县", "ko": "가나가와현"},
  "埼玉県": {"en": "Saitama", "zh": "埼玉县", "ko": "사이타마현"},
  "印西市": {"en": "Inzai", "zh": "印西市", "ko": "인자이시"},
  "大森2550-1-301": {"en": "2550-1-301 Omori", "zh": "大森2550-1-301", "ko": "오모리 2550-1-301"},
  # services.html: serviceType / OfferCatalog
  "高級ハイヤー・送迎サービス": {"en": "Premium Chauffeur & Transfer Service", "zh": "高级包车・接送服务", "ko": "고급 하이어・송영 서비스"},
  "ハイヤーサービス": {"en": "Chauffeur Services", "zh": "包车服务", "ko": "하이어 서비스"},
  "空港送迎": {"en": "Airport Transfers", "zh": "机场接送", "ko": "공항 픽업"},
  "羽田・成田空港への送迎、深夜・早朝対応": {"en": "Transfers to and from Haneda and Narita airports, with late-night and early-morning service", "zh": "羽田・成田机场的接送，对应深夜・清晨", "ko": "하네다・나리타 공항 송영, 심야・새벽 대응"},
  "役員・ビジネス送迎": {"en": "Executive & Business Transport", "zh": "高管・商务接送", "ko": "임원・비즈니스 의전"},
  "海外クライアント対応のエグゼクティブ送迎": {"en": "Executive transport for international clients", "zh": "面向海外客户的高管接送", "ko": "해외 고객 대응 임원 의전"},
  "観光チャーター": {"en": "Sightseeing Charters", "zh": "观光包车", "ko": "관광 전세"},
  "富士山・箱根・鎌倉・日光などのプライベートツアー": {"en": "Private tours to Mt. Fuji, Hakone, Kamakura, Nikko and more", "zh": "富士山・箱根・镰仓・日光等私人观光包车", "ko": "후지산・하코네・가마쿠라・닛코 등 프라이빗 투어"},
  "ゴルフ・リゾート送迎": {"en": "Golf & Resort Transfers", "zh": "高尔夫・度假接送", "ko": "골프・리조트 송영"},
  "ゴルフ場・リゾートへの送迎、ゴルフバッグ積載対応": {"en": "Transfers to golf courses and resorts, with golf-bag loading", "zh": "高尔夫球场・度假村的接送，可装载高尔夫球包", "ko": "골프장・리조트 송영, 골프백 적재 대응"},
  # contact.html: FAQPage
  "対応言語は何ですか？": {"en": "What languages do you support?", "zh": "支持哪些语言？", "ko": "대응 언어는 무엇인가요?"},
  "日本語・英語・中国語・韓国語の4言語に対応しています。専属乗務員が対応いたします。": {"en": "We support four languages: Japanese, English, Chinese and Korean. A dedicated chauffeur will assist you.", "zh": "对应日语・英语・中文・韩语4种语言，由专属司机为您服务。", "ko": "일본어・영어・중국어・한국어 4개국어에 대응합니다. 전속 기사가 대응해 드립니다."},
  "受付時間と返信までの時間は？": {"en": "What are your hours and response time?", "zh": "受理时间和回复时间是？", "ko": "접수 시간과 회신까지 걸리는 시간은?"},
  "電話・メール・LINE・WeChat・予約フォームから24時間受付しています。通常2時間以内に返信いたします。": {"en": "We accept inquiries 24 hours a day by phone, email, LINE, WeChat and the reservation form, and usually reply within 2 hours.", "zh": "通过电话・邮件・LINE・WeChat・预约表单24小时受理，通常2小时内回复。", "ko": "전화・이메일・LINE・WeChat・예약 폼으로 24시간 접수하며, 보통 2시간 이내에 회신합니다."},
  "対応エリアはどこですか？": {"en": "Which areas do you cover?", "zh": "对应区域是哪里？", "ko": "대응 지역은 어디인가요?"},
  "羽田・成田空港を拠点に、東京・千葉・神奈川・埼玉エリアへ配車可能です。": {"en": "Based at Haneda and Narita airports, we can dispatch vehicles to the Tokyo, Chiba, Kanagawa and Saitama areas.", "zh": "以羽田・成田机场为据点，可派车至东京・千叶・神奈川・埼玉区域。", "ko": "하네다・나리타 공항을 거점으로 도쿄・지바・가나가와・사이타마 지역에 배차 가능합니다."},
  "どの車種を選べますか？": {"en": "Which vehicles can I choose?", "zh": "可以选择哪些车型？", "ko": "어떤 차종을 선택할 수 있나요?"},
  "アルファード/ヴェルファイア、グランエース、ハイエースの高級車3車種からお選びいただけます。": {"en": "You can choose from three premium vehicles: the Alphard/Vellfire, Granace and Hiace.", "zh": "可从埃尔法/威尔法、格瑞维亚、海狮3款高级车中选择。", "ko": "알파드/벨파이어, 그란에이스, 하이에이스의 고급차 3종 중에서 선택하실 수 있습니다."},
}


def page_url(page, lang):
    if page == "index.html":
        return BASE + "/" if lang == "ja" else f"{BASE}/{lang}/index.html"
    return f"{BASE}/{page}" if lang == "ja" else f"{BASE}/{lang}/{page}"


def hreflang_block(page, indent, nl):
    langs = ["ja", "en", "zh", "ko"]
    lines = [f'{indent}<link rel="alternate" hreflang="{l}" href="{page_url(page, l)}" />' for l in langs]
    lines.append(f'{indent}<link rel="alternate" hreflang="x-default" href="{page_url(page, "ja")}" />')
    return nl.join(lines)


def set_meta(h, selector, value):
    pat = re.compile(r'(<meta ' + re.escape(selector) + r' content=")[^"]*(")')
    return pat.sub(lambda m: m.group(1) + value + m.group(2), h, count=1)


def set_canonical(h, value):
    return re.sub(r'(<link rel="canonical" href=")[^"]*(")',
                  lambda m: m.group(1) + value + m.group(2), h, count=1)


def replace_hreflang(h, page, nl):
    # remove all existing hreflang alternate lines (incl trailing newline)
    h = re.sub(r'[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*" />\r?\n', '', h)
    block = hreflang_block(page, "    ", nl) + nl
    # insert right after the canonical link line
    h = re.sub(r'(<link rel="canonical" href="[^"]*" />\r?\n)',
               lambda m: m.group(1) + block, h, count=1)
    return h


def prefix_assets(h):
    for a, b in [
        ('href="css/', 'href="../css/'),
        ('src="js/', 'src="../js/'),
        ('src="images/', 'src="../images/'),
        ('href="images/', 'href="../images/'),
        ('url(images/', 'url(../images/'),
        ("url('images/", "url('../images/"),
        ('url("images/', 'url("../images/'),
    ]:
        h = h.replace(a, b)
    return h


def absolutize_nav(h, lang):
    """内部ページリンク(index/about/services/fleet/contact.html)を /{lang}/... の絶対パスに。
    末尾スラッシュ有無に依存せず同一言語内で正しく遷移させるため。#アンカーやクエリも保持。"""
    return re.sub(r'href="(index|about|services|fleet|contact)\.html',
                  lambda m: f'href="/{lang}/{m.group(1)}.html', h)


def set_captcha_lang(h, lang):
    """hCaptcha ウィジェットの表示言語(data-hl)を生成先の言語に合わせる。
    body は ja から複製されるため、明示しないと data-hl="ja" のまま残る(再生成で言語別設定が消える)。"""
    return h.replace('data-hl="ja"', f'data-hl="{lang}"')


def translate_ld(h, lang):
    """head 内 JSON-LD（構造化データ）の本文文字列を lang へ翻訳。
    JSON 値（"..."）の完全一致置換のため部分語の誤爆なし。改行構造はそのまま保つ。
    JSON-LD を持たないページ（about/fleet）では re.sub が非マッチで no-op。"""
    def repl(m):
        block = m.group(0)
        for ja, tr in LD_TR.items():
            block = block.replace(f'"{ja}"', f'"{tr[lang]}"')
        return block
    return re.sub(r'<script type="application/ld\+json">.*?</script>', repl, h, count=1, flags=re.S)


def build_lang_file(page, lang):
    src = open(os.path.join(ROOT, page), encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in src else "\n"
    h = src
    h = re.sub(r'<html lang="ja">', f'<html lang="{lang}">', h, count=1)
    title = TITLE[page][lang]
    desc = DESC[page][lang]
    url = page_url(page, lang)
    h = re.sub(r'<title>.*?</title>', lambda m: f'<title>{title}</title>', h, count=1, flags=re.S)
    h = set_meta(h, 'name="description"', desc)
    h = set_meta(h, 'property="og:title"', title)
    h = set_meta(h, 'property="og:description"', desc)
    h = set_meta(h, 'property="og:url"', url)
    h = set_meta(h, 'property="og:locale"', LOCALE[lang])
    h = set_meta(h, 'name="twitter:title"', title)
    h = set_meta(h, 'name="twitter:description"', desc)
    h = set_canonical(h, url)
    h = replace_hreflang(h, page, nl)
    h = translate_ld(h, lang)
    h = prefix_assets(h)
    h = absolutize_nav(h, lang)
    h = set_captcha_lang(h, lang)
    outdir = os.path.join(ROOT, lang)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, page), "w", encoding="utf-8", newline="") as f:
        f.write(h)
    print(f"  generated {lang}/{page}")


def update_root_hreflang(page):
    p = os.path.join(ROOT, page)
    src = open(p, encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in src else "\n"
    h = replace_hreflang(src, page, nl)
    if h != src:
        with open(p, "w", encoding="utf-8", newline="") as f:
            f.write(h)
        print(f"  updated root hreflang: {page}")
    else:
        print(f"  root hreflang unchanged: {page}")


if __name__ == "__main__":
    print("== generate language pages ==")
    for page in PAGES:
        for lang in LANGS:
            build_lang_file(page, lang)
    print("== update root(ja) hreflang ==")
    for page in PAGES:
        update_root_hreflang(page)
    print("done")
