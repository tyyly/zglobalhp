/* Z&GLOBAL i18n: ja / en / zh / ko */
(function () {
  const DICT = {
    /* ============ NAV ============ */
    "nav.home":     { ja: "ホーム",     en: "Home",      zh: "首页",     ko: "홈" },
    "nav.about":    { ja: "会社概要",   en: "About",     zh: "公司介绍", ko: "회사소개" },
    "nav.fleet":    { ja: "車両ラインナップ", en: "Fleet", zh: "车辆阵容", ko: "차량 라인업" },
    "nav.services": { ja: "サービス",   en: "Services",  zh: "服务",     ko: "서비스" },
    "nav.contact":  { ja: "お問い合わせ", en: "Contact", zh: "联系我们", ko: "문의하기" },
    "nav.book":     { ja: "ご予約",     en: "Book Now",  zh: "立即预约", ko: "예약하기" },

    /* ============ HERO ============ */
    "hero.title":      { ja: "羽田・成田から、",
                          en: "From Haneda and Narita,",
                          zh: "从羽田・成田机场，",
                          ko: "하네다・나리타에서," },
    "hero.title2":     { ja: "格別の移動体験を。",
                          en: "an extraordinary journey awaits.",
                          zh: "开启与众不同的旅程。",
                          ko: "특별한 이동을 약속합니다." },
    "hero.subShort":   { ja: "アルファード・グランエース・ハイエースを<br />4言語対応の専属乗務員がご案内します。",
                          en: "Alphard, Granace, HiAce —<br />operated by four-language-capable chauffeurs.",
                          zh: "阿尔法、皇狮、海狮 —<br />由4种语言对应的专属司机驾驶。",
                          ko: "알파드, 그란에이스, 하이에이스 —<br />4개 언어 대응 전속 기사가 안내합니다." },
    "hero.cta2":       { ja: "車両を見る", en: "View Our Fleet", zh: "查看车型", ko: "차량 보기" },
    "hero.bannerCta":  { ja: "お電話・LINE・フォームから24時間受付:",
                          en: "24/7 by phone, LINE, or form:",
                          zh: "电话・LINE・表单 24小时受理:",
                          ko: "전화・LINE・폼으로 24시간 접수:" },

    /* ============ SERVICES (TOP carousel) ============ */
    "svc.eyebrow":     { ja: "Our Services", en: "Our Services", zh: "我们的服务", ko: "서비스" },
    "svc.heading":     { ja: "4つのご利用シーン",
                          en: "Four Ways to Travel With Us",
                          zh: "四种用车场景",
                          ko: "네 가지 이용 장면" },

    "svc.airport.ja":  { ja: "空港送迎",         en: "Airport Transfer",  zh: "机场接送",   ko: "공항 픽업・송영" },
    "svc.airport.body":{ ja: "羽田・成田空港から都内・近郊エリアまでドアtoドアで送迎。到着90分まで待機料金無料、フライト遅延の追跡もお任せ下さい。",
                          en: "Door-to-door service from Haneda and Narita to Tokyo hotels and nearby areas. Free 90-minute wait at arrivals; we track your flight in real time.",
                          zh: "从羽田・成田机场至都内、周边地区的门到门接送。到达大厅90分钟内免费等待，航班延误自动追踪。",
                          ko: "하네다・나리타에서 도쿄 호텔・근교까지 도어 투 도어. 도착 후 90분까지 대기료 무료, 항공편 지연 추적도 맡겨 주세요." },

    "svc.business.ja":  { ja: "役員・ビジネス送迎", en: "Executive Charter", zh: "商务包车", ko: "임원 비즈니스 송영" },
    "svc.business.body":{ ja: "海外取引先のお出迎え、レセプション、視察等、大切な場面の送迎を承ります。インボイス・月極契約にも対応。",
                          en: "Overseas client pick-ups, receptions, inspections — handled for the moments that matter. Invoice and monthly contracts available.",
                          zh: "迎接海外客户、招待会、视察等重要场合的接送。可开具发票，提供月度合约。",
                          ko: "해외 거래처 의전, 리셉션, 시찰 등 중요한 장면의 송영. 인보이스・월정액 계약 대응." },

    "svc.tour.ja":     { ja: "観光チャーター",  en: "Private Tour",  zh: "观光包车",   ko: "관광 전세" },
    "svc.tour.body":   { ja: "富士山・箱根・鎌倉・日光など関東近郊の1日〜数日のプライベートツアー。多言語ガイド手配も可能です。",
                          en: "Mt. Fuji, Hakone, Kamakura, Nikko — one-day to multi-day private tours in the Kanto area. Multilingual guides arranged on request.",
                          zh: "富士山・箱根・镰仓・日光等关东周边1日至数日的私人观光。可代为安排多语言导游。",
                          ko: "후지산・하코네・가마쿠라・닛코 등 간토 근교 1일~수일 프라이빗 투어. 다국어 가이드 수배 가능." },

    "svc.golf.ja":     { ja: "ゴルフ・リゾート送迎", en: "Golf & Resort", zh: "高尔夫・度假村接送", ko: "골프・리조트 송영" },
    "svc.golf.body":   { ja: "早朝のゴルフ送迎(3:00〜)、ディズニーリゾート、軽井沢・那須等のリゾート目的の送迎。荷物の積み下ろしもお任せください。",
                          en: "Early-morning golf rounds (from 3:00), Tokyo Disney Resort, Karuizawa, Nasu — leisure transport made easy. We handle the luggage too.",
                          zh: "清晨高尔夫接送（3:00起）、东京迪士尼、轻井泽・那须等度假地接送。行李装卸均由我们负责。",
                          ko: "이른 아침 골프 송영(3:00~), 도쿄 디즈니 리조트, 가루이자와・나스 등 리조트 송영. 짐 적재도 맡겨 주세요." },

    /* ============ FLEET (tabs section) ============ */
    "fleet.eyebrow":   { ja: "Our Fleet", en: "Our Fleet", zh: "车辆阵容", ko: "차량 라인업" },
    "fleet.heading":   { ja: "高級ハイヤー3車種", en: "Three Premium Vehicles", zh: "三款高级车型", ko: "고급 하이어 3종" },
    "fleet.tab.all":   { ja: "ALL", en: "ALL", zh: "全部", ko: "ALL" },

    "fleet.alphard.nameja": { ja: "アルファード / ヴェルファイア", en: "Toyota Premium Minivan", zh: "丰田高级商务车 阿尔法 / 威尔法", ko: "토요타 알파드 / 벨파이어" },
    "fleet.granace.nameja": { ja: "グランエース", en: "Toyota Granace Premium", zh: "丰田皇狮", ko: "토요타 그란에이스" },
    "fleet.hiace.nameja":   { ja: "ハイエース", en: "Toyota HiAce Group Van", zh: "丰田海狮 团组用车", ko: "토요타 하이에이스" },

    "fleet.spec.max":       { ja: "最大乗車人数", en: "Max Capacity", zh: "最大乘员", ko: "최대 승차" },
    "fleet.spec.recommend": { ja: "推奨人数",     en: "Recommended",  zh: "推荐人数", ko: "추천 인원" },
    "fleet.spec.suitcase":  { ja: "スーツケース", en: "Suitcases",    zh: "行李箱",   ko: "수트케이스" },
    "fleet.from":           { ja: "目安料金",     en: "From",         zh: "起价",     ko: "기본 요금" },
    "fleet.pax":            { ja: "名", en: " pax", zh: "人", ko: "명" },
    "fleet.case":           { ja: "個", en: " cases", zh: "件", ko: "개" },

    /* ============ ABOUT (top) ============ */
    "about.eyebrow":     { ja: "About Us", en: "About Us", zh: "公司介绍", ko: "회사 소개" },
    "about.headingShort":{ ja: "世界に誇れる、<br />最高のホスピタリティへ。",
                            en: "Hospitality worthy<br />of the world stage.",
                            zh: "向世界献上<br />最高品质的款待。",
                            ko: "세계에 자랑할<br />최고의 호스피탈리티." },
    "about.body1":       { ja: "Z&GLOBALは羽田・成田を拠点とする送迎専門会社。空港の近辺に営業所を構えることで迅速かつ柔軟な配車を実現し、世界中からのお客様を、車両の品質・乗務員のホスピタリティ・運行の安全性を通して最高基準でお迎えします。",
                            en: "Z&GLOBAL is a chauffeur transport company based at Haneda and Narita. Our offices near the airports enable fast, flexible dispatch — we welcome guests from around the world with vehicle quality, hospitality, and operational safety of the highest standard.",
                            zh: "Z&GLOBAL是以羽田・成田机场为基地的送迎专门公司。在机场附近设立营业所实现快速灵活的调度，以车辆品质、司机服务、运营安全的最高标准迎接来自世界各地的客人。",
                            ko: "Z&GLOBAL은 하네다・나리타를 거점으로 하는 송영 전문 회사. 공항 근처에 영업소를 두어 신속하고 유연한 배차를 실현, 세계 각지의 손님을 차량 품질・호스피탈리티・운행 안전성의 최고 기준으로 맞이합니다." },
    "about.ceo.name":    { ja: "Z&GLOBAL株式会社", en: "Z&GLOBAL Co., Ltd.", zh: "Z&GLOBAL株式会社", ko: "Z&GLOBAL 주식회사" },
    "about.ceo.title":   { ja: "Premium Chauffeur Service since 2018",
                            en: "Premium Chauffeur Service since 2018",
                            zh: "高级司机包车服务 自2018年",
                            ko: "프리미엄 쇼퍼 서비스 since 2018" },
    "about.more":        { ja: "会社概要を見る", en: "Read More", zh: "了解更多", ko: "더 알아보기" },

    /* ============ COUNTERS ============ */
    "counter.fleet":     { ja: "車両ラインナップ", en: "Vehicle Models", zh: "车型阵容", ko: "차량 라인업" },
    "counter.airports":  { ja: "拠点空港", en: "Base Airports", zh: "基地机场", ko: "거점 공항" },
    "counter.langs":     { ja: "対応言語", en: "Languages", zh: "对应语言", ko: "대응 언어" },

    /* ============ PRICING ============ */
    "price.eyebrow":     { ja: "料金プラン", en: "Pricing", zh: "价格方案", ko: "요금 플랜" },
    "price.heading":     { ja: "用途別 料金目安", en: "Pricing by Use Case", zh: "按用途价格目安", ko: "용도별 요금 안내" },
    "price.from":        { ja: "〜", en: "+", zh: "起", ko: "~" },
    "price.permonth":    { ja: "/月〜", en: "/mo+", zh: "/月起", ko: "/월~" },
    "price.cta":         { ja: "見積依頼", en: "Request Quote", zh: "立即询价", ko: "견적 요청" },

    "price.airport.h":   { ja: "空港送迎", en: "Airport Transfer", zh: "机场接送", ko: "공항 송영" },
    "price.airport.f1":  { ja: "羽田/成田 ⇔ 都内ホテル", en: "Haneda/Narita ⇔ Tokyo hotels", zh: "羽田/成田 ⇔ 都内酒店", ko: "하네다/나리타 ⇔ 도쿄 호텔" },
    "price.airport.f2":  { ja: "到着90分まで待機料金 ¥0", en: "Free 90-min wait at arrivals", zh: "到达后90分钟内免等待费", ko: "도착 후 90분까지 대기료 ¥0" },
    "price.airport.f3":  { ja: "フライト遅延 自動追跡", en: "Auto flight-delay tracking", zh: "航班延误自动追踪", ko: "항공편 지연 자동 추적" },
    "price.airport.f4":  { ja: "アルファード基本", en: "Alphard standard", zh: "标配阿尔法", ko: "알파드 기본" },

    "price.tour.h":      { ja: "観光チャーター (1日)", en: "Private Tour (1 day)", zh: "观光包车（1天）", ko: "관광 전세 (1일)" },
    "price.tour.f1":     { ja: "8時間 / 100km まで", en: "Up to 8 hrs / 100 km", zh: "最长8小时 / 100公里", ko: "8시간 / 100km 까지" },
    "price.tour.f2":     { ja: "富士山・箱根・鎌倉対応", en: "Mt.Fuji / Hakone / Kamakura", zh: "富士山・箱根・镰仓可达", ko: "후지산・하코네・가마쿠라 대응" },
    "price.tour.f3":     { ja: "グランエース推奨", en: "Granace recommended", zh: "推荐皇狮", ko: "그란에이스 추천" },
    "price.tour.f4":     { ja: "多言語ガイド手配可", en: "Multilingual guide on request", zh: "可安排多语言导游", ko: "다국어 가이드 수배 가능" },

    "price.exec.h":      { ja: "役員送迎 (月極)", en: "Executive (monthly)", zh: "高管接送（月度）", ko: "임원 송영 (월정액)" },
    "price.exec.f1":     { ja: "月8回 まで定額", en: "Flat for up to 8 rides/mo", zh: "每月8次定额", ko: "월 8회까지 정액" },
    "price.exec.f2":     { ja: "ドライバー指名可", en: "Choose your driver", zh: "可指定司机", ko: "기사 지명 가능" },
    "price.exec.f3":     { ja: "インボイス対応", en: "Invoice-compatible", zh: "可开发票", ko: "인보이스 대응" },
    "price.exec.f4":     { ja: "月次まとめ請求書", en: "Monthly consolidated billing", zh: "月度汇总账单", ko: "월별 합산 청구서" },

    /* ============ TESTIMONIALS ============ */
    "test.eyebrow":    { ja: "Voices", en: "Voices", zh: "客户评价", ko: "고객 후기" },
    "test.heading":    { ja: "ご利用いただいたお客様の声", en: "What Our Clients Say", zh: "客户的真实声音", ko: "이용 고객의 목소리" },
    "test.1.body":     { ja: "海外からの取引先を空港まで送迎して頂きましたが、ドライバーの方の英語対応も完璧で、お客様にも大変喜ばれました。月の役員送迎は全てお任せしています。",
                          en: "Picked up our overseas client at Haneda. The driver's English was perfect and our guest was delighted. We now use Z&GLOBAL for all monthly executive transport.",
                          zh: "司机接送我们的海外客户，英语对应非常完美，客户也十分满意。每月的高管接送都委托给Z&GLOBAL。",
                          ko: "해외 거래처를 공항까지 픽업해 주셨는데, 기사님의 영어 대응이 완벽해 고객도 매우 만족하셨습니다. 매월 임원 의전은 모두 맡기고 있습니다." },
    "test.1.who":      { ja: "鈴木 美咲 様", en: "Ms. Suzuki", zh: "铃木女士", ko: "스즈키 님" },
    "test.1.role":     { ja: "外資系企業 役員秘書", en: "Executive Secretary, Foreign Corp.", zh: "外资企业高管秘书", ko: "외국계 기업 임원 비서" },

    "test.2.body":     { ja: "成田到着が深夜にも関わらず、笑顔でお迎え頂きました。グランエースは家族4人と大きなスーツケースも余裕で、移動の疲れが残らない上質さでした。",
                          en: "Even though we landed at Narita past midnight, our driver greeted us with a smile. The Granace easily fit our family of four with large suitcases — luxurious enough to erase travel fatigue.",
                          zh: "尽管深夜到达成田，司机仍笑容迎接。皇狮容纳我们一家四口和大行李箱毫无压力，旅途疲劳一扫而光。",
                          ko: "나리타 도착이 한밤중인데도 미소로 맞이해 주셨습니다. 그란에이스는 가족 4명과 큰 수트케이스도 여유 있었고, 이동의 피로가 남지 않는 상질의 서비스였습니다." },
    "test.2.who":      { ja: "Wang ご家族", en: "Wang Family", zh: "王先生一家", ko: "Wang 가족" },
    "test.2.role":     { ja: "上海より家族旅行", en: "Family travel from Shanghai", zh: "来自上海的家庭旅行", ko: "상하이에서 가족 여행" },

    "test.3.body":     { ja: "Hakone day tour with my elderly parents. The driver patiently waited at every stop and helped with luggage. Genuinely felt like a private host, not just a driver.",
                          en: "Hakone day tour with my elderly parents. The driver patiently waited at every stop and helped with luggage. Genuinely felt like a private host, not just a driver.",
                          zh: "和年迈父母去箱根一日游。司机在每个景点耐心等待，主动帮忙搬行李，真正像私人接待而非普通司机。",
                          ko: "고령의 부모님과 함께 하코네 1일 투어. 기사님이 모든 정류장에서 인내심 있게 기다리고 짐도 도와주셔서, 단순한 기사가 아닌 진정한 프라이빗 호스트 같았습니다." },
    "test.3.who":      { ja: "John Smith 様", en: "Mr. John Smith", zh: "约翰·史密斯先生", ko: "John Smith 님" },
    "test.3.role":     { ja: "米国 駐在員ファミリー", en: "Expat family, USA", zh: "美国驻日家庭", ko: "미국 주재원 가족" },

    /* ============ NEW TAGS / TRUST ============ */
    "trust.heading":   { ja: "パートナー・運行実績", en: "Trusted By / Partners", zh: "合作伙伴・运行实绩", ko: "파트너・운행 실적" },
    "fleet.granace.exp": { ja: "移動中のWeb会議や、エグゼクティブの複数名移動に最適な最上級空間", en: "The ultimate premium space, perfect for in-transit web meetings or executive group travel.", zh: "旅途中进行视频会议、高管多人出行的绝佳顶级空间", ko: "이동 중 웹 회의나 임원 다수 이동에 최적인 최상급 공간" },
    "fleet.alphard.f1": { ja: "革張りシート / 静粛性", en: "Leather Seats / Quiet Cabin", zh: "真皮座椅 / 静谧性", ko: "가죽 시트 / 정숙성" },
    "fleet.alphard.f2": { ja: "空気清浄機・USB充電", en: "Air Purifier / USB Charging", zh: "空气净化器 / USB充电", ko: "공기 청정기・USB 충전" },
    "fleet.granace.f1": { ja: "広い室内空間", en: "Spacious Interior", zh: "宽敞的室内空间", ko: "넓은 실내 공간" },
    "fleet.granace.f2": { ja: "ファミリー・グループ向け", en: "Ideal for Families / Groups", zh: "适合家庭・团队", ko: "가족・그룹용" },
    "fleet.hiace.f1":   { ja: "大人数グループ最適", en: "Best for Large Groups", zh: "最适合多人团队", ko: "다인원 그룹 최적" },
    "fleet.hiace.f2":   { ja: "ゴルフバッグ多数積載可", en: "Holds Multiple Golf Bags", zh: "可装载多个高尔夫球包", ko: "골프백 다수 적재 가능" },
    "fleet.note":       { ja: "※ 上記は羽田空港〜都内基本送迎の目安。深夜割増(22:00-5:00) +20%、高速代別途。詳細はお問い合わせください。", en: "* Estimated base fare from Haneda to central Tokyo. Late-night surcharge (22:00-5:00) +20%. Tolls extra. Contact us for details.", zh: "※ 以上为羽田机场至都内基本接送的预估价格。深夜附加费（22:00-5:00）+20%，高速费另计。详情请咨询。", ko: "※ 위 요금은 하네다 공항~도쿄 도심 기본 송영 기준. 심야 할증(22:00-5:00) +20%, 톨게이트 비용 별도. 자세한 사항은 문의해 주세요." },

    /* ============ PROCESS ============ */
    "proc.eyebrow":    { ja: "Reservation Flow", en: "Reservation Flow", zh: "预约流程", ko: "예약 절차" },
    "proc.heading":    { ja: "ご予約から乗車まで、4ステップ。",
                          en: "From Booking to Pick-up in Four Steps",
                          zh: "从预约到上车，仅需4步",
                          ko: "예약부터 승차까지, 4단계" },
    "proc.1.short":    { ja: "01. Web・LINE・お電話・メールから予約",
                          en: "01. Book via web, LINE, phone, or email",
                          zh: "01. 通过网页・LINE・电话・邮件预约",
                          ko: "01. 웹・LINE・전화・이메일로 예약" },
    "proc.2.short":    { ja: "02. 決済リンク送付 (クレカ・PayPay・振込)",
                          en: "02. Secure payment link (card, PayPay, transfer)",
                          zh: "02. 发送支付链接（信用卡・PayPay・转账）",
                          ko: "02. 결제 링크 발송 (카드・PayPay・이체)" },
    "proc.3.short":    { ja: "03. 前日に乗務員・車両番号をご連絡",
                          en: "03. Driver and vehicle info sent the day before",
                          zh: "03. 前一日告知司机和车牌号",
                          ko: "03. 전일에 기사・차량번호 안내" },
    "proc.4.short":    { ja: "04. 当日 時間通りにお迎え (到着90分待機 ¥0)",
                          en: "04. On-time pick-up (free 90-min wait at arrivals)",
                          zh: "04. 当天准时接车（到达后90分钟免等待）",
                          ko: "04. 당일 시간 맞춰 픽업 (도착 후 90분 대기 ¥0)" },

    /* ============ CTA / FOOTER TOP ============ */
    "cta.eyebrow":     { ja: "Reservation", en: "Reservation", zh: "立即预约", ko: "예약 안내" },
    "cta.heading":     { ja: "ご予約・お見積もりは、<br />お気軽に。",
                          en: "Get a Quote or Book —<br />We're Here.",
                          zh: "预约・询价，<br />请随时联系。",
                          ko: "예약・견적은,<br />편하게 문의하세요." },
    "cta.call":        { ja: "お電話", en: "Call Us", zh: "致电", ko: "전화" },

    /* ============ FOOTER ============ */
    "foot.about":      { ja: "会社情報", en: "Company", zh: "公司", ko: "회사" },
    "foot.about.body": { ja: "Z&GLOBAL株式会社 — 羽田・成田の二大空港を拠点に、上質なハイヤーサービスを世界基準のホスピタリティでお届けします。",
                          en: "Z&GLOBAL Co., Ltd. — Premium chauffeured transport from Haneda and Narita with world-class hospitality.",
                          zh: "Z&GLOBAL株式会社 — 以羽田・成田双机场为基地，提供世界级品质的高级司机包车服务。",
                          ko: "Z&GLOBAL주식회사 — 하네다・나리타 두 공항을 거점으로 세계 수준의 프리미엄 하이어 서비스를 제공합니다." },
    "foot.menu":       { ja: "メニュー",  en: "Menu",       zh: "导航",     ko: "메뉴" },
    "foot.contact":    { ja: "コンタクト", en: "Contact",   zh: "联系方式", ko: "연락처" },
    "foot.tel":        { ja: "TEL",       en: "TEL",        zh: "电话",     ko: "TEL" },
    "foot.fax":        { ja: "FAX",       en: "FAX",        zh: "传真",     ko: "FAX" },
    "foot.mail":       { ja: "MAIL",      en: "Email",      zh: "邮箱",     ko: "이메일" },
    "foot.address.lbl":{ ja: "住所",      en: "Address",    zh: "地址",     ko: "주소" },
    "foot.address":    { ja: "千葉県成田市 (羽田・成田空港 拠点)",
                          en: "Narita-shi, Chiba, Japan (Haneda & Narita based)",
                          zh: "千叶县成田市（羽田・成田机场基地）",
                          ko: "치바현 나리타시 (하네다・나리타 공항 거점)" },
    "foot.hours.lbl":  { ja: "対応時間", en: "Hours", zh: "对应时间", ko: "대응 시간" },
    "foot.hours":      { ja: "24時間対応 (要事前予約)", en: "24/7 with advance booking", zh: "24小时受理（需提前预约）", ko: "24시간 대응 (사전 예약 필요)" },
    "foot.copy":       { ja: "© 2026 Z&GLOBAL Co., Ltd. All rights reserved.",
                          en: "© 2026 Z&GLOBAL Co., Ltd. All rights reserved.",
                          zh: "© 2026 Z&GLOBAL株式会社 版权所有",
                          ko: "© 2026 Z&GLOBAL Co., Ltd. All rights reserved." },

    /* ============ PAGE HEROES / BREADCRUMBS ============ */
    "page.about.title":    { ja: "会社概要", en: "About Us", zh: "公司介绍", ko: "회사 소개" },
    "page.fleet.title":    { ja: "車両ラインナップ", en: "Our Fleet", zh: "车辆阵容", ko: "차량 라인업" },
    "page.services.title": { ja: "サービス", en: "Services", zh: "服务内容", ko: "서비스" },
    "page.contact.title":  { ja: "お問い合わせ", en: "Contact Us", zh: "联系我们", ko: "문의하기" },

    /* ============ ABOUT PAGE ============ */
    "page.about.lead":     { ja: "ハイヤーは「移動の道具」ではなく「ご旅程の一部」。Z&GLOBALは、世界中からのお客様を最高基準でお迎えすることに挑戦し続けます。",
                              en: "A chauffeured car is not a means of transport — it is part of your journey. Z&GLOBAL continually pursues the highest standards to welcome guests from around the world.",
                              zh: "高级司机包车不仅是「移动工具」，更是「行程的一部分」。Z&GLOBAL持续以最高标准迎接来自世界各地的客人。",
                              ko: "하이어는 「이동 수단」이 아닌 「여정의 일부」. Z&GLOBAL은 세계 각국의 손님을 최고 기준으로 맞이하는 것에 끊임없이 도전합니다." },

    "page.about.info.name":    { ja: "商号", en: "Company Name", zh: "公司名称", ko: "상호" },
    "page.about.info.name.v":  { ja: "Z&GLOBAL株式会社", en: "Z&GLOBAL Co., Ltd.", zh: "Z&GLOBAL株式会社", ko: "Z&GLOBAL 주식회사" },
    "page.about.info.found":   { ja: "創業", en: "Founded", zh: "成立", ko: "창업" },
    "page.about.info.found.v": { ja: "2018年", en: "2018", zh: "2018年", ko: "2018년" },
    "page.about.info.biz":     { ja: "事業内容", en: "Business", zh: "业务内容", ko: "사업 내용" },
    "page.about.info.biz.v":   { ja: "ハイヤー送迎・観光チャーター・空港送迎・役員送迎",
                                  en: "Chauffeured transport, private tours, airport transfers, executive transport",
                                  zh: "司机包车、观光包车、机场接送、商务用车",
                                  ko: "하이어 송영, 관광 전세, 공항 픽업, 임원 의전" },
    "page.about.info.fleet":   { ja: "保有車両", en: "Fleet", zh: "保有车型", ko: "보유 차량" },
    "page.about.info.fleet.v": { ja: "アルファード / グランエース / ハイエース 他",
                                  en: "Alphard / Granace / HiAce, etc.",
                                  zh: "阿尔法 / 皇狮 / 海狮 等",
                                  ko: "알파드 / 그란에이스 / 하이에이스 등" },
    "page.about.info.langs":   { ja: "対応言語", en: "Languages", zh: "对应语言", ko: "대응 언어" },
    "page.about.info.langs.v": { ja: "日本語・英語・中国語・韓国語",
                                  en: "Japanese, English, Chinese, Korean",
                                  zh: "日语、英语、中文、韩语",
                                  ko: "일본어・영어・중국어・한국어" },
    "page.about.info.area":    { ja: "拠点", en: "Base", zh: "营业基地", ko: "거점" },
    "page.about.info.area.v":  { ja: "千葉県成田市 (羽田空港・成田空港 営業所)",
                                  en: "Narita-shi, Chiba (offices at Haneda and Narita Airports)",
                                  zh: "千叶县成田市（羽田机场・成田机场营业所）",
                                  ko: "치바현 나리타시 (하네다・나리타 공항 영업소)" },
    "page.about.info.tel":     { ja: "電話 / FAX", en: "Phone / Fax", zh: "电话 / 传真", ko: "전화 / 팩스" },
    "page.about.info.mail":    { ja: "メール", en: "Email", zh: "邮箱", ko: "이메일" },

    /* ============ FLEET PAGE ============ */
    "page.fleet.lead":    { ja: "ご利用人数、お荷物、ご用途に合わせて、最適な一台をお選びいただけます。すべての車両は革張りシート・空気清浄機・USB充電を完備しています。",
                            en: "Choose the right vehicle for your party size, luggage, and purpose. All vehicles feature leather seats, air purifiers, and USB charging.",
                            zh: "可根据人数、行李、用途选择最合适的车型。所有车辆均配备真皮座椅、空气净化器、USB充电。",
                            ko: "이용 인원, 짐, 용도에 맞춰 최적의 차량을 선택. 모든 차량에 가죽 시트, 공기 청정기, USB 충전 완비." },

    /* ============ SERVICES PAGE ============ */
    "page.svc.lead":      { ja: "空港送迎から観光チャーターまで、4つの主要サービスをご用意。すべてのプランで4言語対応・上質な車両・経験豊富な乗務員が標準装備です。",
                            en: "Four core services from airport transfers to private tours. All plans include four-language support, premium vehicles, and experienced chauffeurs.",
                            zh: "从机场接送到观光包车，4项主要服务一应俱全。所有方案均含4种语言对应、高级车型、经验丰富的司机。",
                            ko: "공항 픽업부터 관광 전세까지 4가지 주요 서비스. 모든 플랜에 4개 언어 지원, 상질 차량, 경험 풍부한 기사 기본 포함." },

    "page.svc.airport.h":  { ja: "空港送迎 / Airport Transfer", en: "Airport Transfer", zh: "机场接送 / Airport Transfer", ko: "공항 픽업・송영 / Airport Transfer" },
    "page.svc.airport.b":  { ja: "羽田空港・成田空港から、都内ホテル・ご自宅・近郊エリアまでドアtoドアで送迎。フライト遅延の追跡もお任せください。到着ロビーでは到着後90分まで待機料金無料。",
                              en: "Door-to-door service from Haneda and Narita to Tokyo hotels, your home, or nearby areas. We monitor your flight in real time. Free 90-minute wait at arrivals.",
                              zh: "从羽田・成田机场至都内酒店、住宅、周边地区的门到门接送。航班延误自动追踪，到达大厅免费等待90分钟。",
                              ko: "하네다・나리타 공항에서 도쿄 호텔・자택・근교 지역까지 도어 투 도어 송영. 항공편 지연 추적도 맡겨 주세요. 도착 로비는 90분까지 대기료 무료." },

    "page.svc.business.h": { ja: "役員・ビジネス送迎 / Executive Charter", en: "Executive Charter", zh: "商务包车 / Business Chartered", ko: "임원 비즈니스 송영 / Executive Charter" },
    "page.svc.business.b": { ja: "海外取引先のお出迎え、レセプション、視察、社内イベント等、大切な場面の送迎を承ります。月極・回数券プランで定常的なご利用にも柔軟に対応。請求書・領収書発行可。",
                              en: "Overseas client pick-ups, receptions, inspections, corporate events — we handle the moments that matter. Monthly and prepaid plans available; invoices issued.",
                              zh: "迎接海外客户、招待会、视察、公司活动等重要场合的接送。提供月度合约・回数券方案，灵活对应日常使用，可开具发票。",
                              ko: "해외 거래처 의전, 리셉션, 시찰, 사내 이벤트 등 중요한 장면의 송영을 담당. 월정액・회수권 플랜으로 정기 이용도 유연 대응. 인보이스 발행 가능." },

    "page.svc.tour.h":     { ja: "観光チャーター / Private Tour", en: "Private Tour", zh: "观光包车 / Private Tour", ko: "관광 전세 / Private Tour" },
    "page.svc.tour.b":     { ja: "富士山・箱根・鎌倉・日光など、関東近郊への1日〜数日のプライベートツアー。観光プランのご相談から、ご家族・ご友人グループに最適な車両と行程をご提案します。",
                              en: "Mt. Fuji, Hakone, Kamakura, Nikko and beyond — one-day to multi-day private tours in the Kanto area. We help plan the route and pick the right vehicle for your group.",
                              zh: "富士山・箱根・镰仓・日光等关东周边1日至数日的私人观光行程。从行程咨询到为家庭・朋友团队推荐最合适的车型与路线。",
                              ko: "후지산・하코네・가마쿠라・닛코 등 간토 근교 1일~수일 프라이빗 투어. 관광 계획 상담부터 가족・친구 그룹에 최적인 차량과 일정 제안." },

    "page.svc.golf.h":     { ja: "ゴルフ・リゾート送迎 / Golf & Resort", en: "Golf & Resort", zh: "高尔夫・度假村接送 / Golf & Resort", ko: "골프・리조트 송영 / Golf & Resort" },
    "page.svc.golf.b":     { ja: "早朝のゴルフラウンド、ディズニーリゾート、軽井沢への送迎などリゾート目的の利用に。荷物の積み下ろしから、温泉宿への往復まで快適なご移動を。",
                              en: "Early-morning golf rounds, Tokyo Disney Resort, Karuizawa retreats — leisure transport made effortless. Luggage handled, hot-spring return trips arranged.",
                              zh: "清晨高尔夫、东京迪士尼、轻井泽等度假地的接送。从行李装卸到温泉旅馆往返，舒适出行无忧。",
                              ko: "이른 아침 골프 라운드, 도쿄 디즈니 리조트, 가루이자와 여행 등 리조트 목적의 이용. 짐 적재부터 온천 숙박 왕복까지 쾌적한 이동을." },

    /* ============ CONTACT PAGE ============ */
    "page.contact.lead":  { ja: "ご予約・お見積もり・ご質問は、お電話・メール・LINEまたは下記フォームから。通常2時間以内に返信いたします。",
                            en: "Reservations, quotes, questions — reach us by phone, email, LINE, or the form below. Replies within 2 hours.",
                            zh: "预约・询价・咨询，请通过电话、邮箱、LINE 或下方表单联系。我们通常2小时内回复。",
                            ko: "예약・견적・문의는 전화・이메일・LINE 또는 아래 폼으로. 보통 2시간 이내 회신해 드립니다." },
    "page.contact.line":    { ja: "LINE", en: "LINE", zh: "LINE", ko: "LINE" },
    "page.contact.line.v":  { ja: "ID: @zglobal", en: "ID: @zglobal", zh: "ID: @zglobal", ko: "ID: @zglobal" },
    "page.contact.wechat":  { ja: "WeChat / 微信", en: "WeChat", zh: "微信", ko: "WeChat" },
    "page.contact.wechat.v":{ ja: "ID: zglobal777", en: "ID: zglobal777", zh: "ID: zglobal777", ko: "ID: zglobal777" },

    "page.contact.f.name":     { ja: "お名前", en: "Your Name", zh: "您的姓名", ko: "성함" },
    "page.contact.f.email":    { ja: "メールアドレス", en: "Email Address", zh: "邮箱地址", ko: "이메일" },
    "page.contact.f.tel":      { ja: "電話番号", en: "Phone Number", zh: "电话号码", ko: "전화번호" },
    "page.contact.f.date":     { ja: "ご利用日", en: "Service Date", zh: "用车日期", ko: "이용일" },
    "page.contact.f.from":     { ja: "出発地", en: "Pick-up", zh: "出发地", ko: "출발지" },
    "page.contact.f.to":       { ja: "目的地", en: "Destination", zh: "目的地", ko: "목적지" },
    "page.contact.f.car":      { ja: "ご希望車両", en: "Preferred Vehicle", zh: "意向车型", ko: "희망 차량" },
    "page.contact.f.purpose":  { ja: "ご用途", en: "Purpose", zh: "用车用途", ko: "이용 목적" },
    "page.contact.f.msg":      { ja: "ご質問・備考", en: "Notes / Questions", zh: "备注・咨询", ko: "메시지・비고" },
    "page.contact.f.submit":   { ja: "送信する", en: "Send Message", zh: "发送", ko: "보내기" },

    /* ============ RESERVATION FORM ============ */
    "page.contact.f.submit.book": { ja: "予約を送信する", en: "Submit Reservation", zh: "提交预约", ko: "예약 보내기" },
    "page.contact.f.datetime": { ja: "希望乗車日時", en: "Pick-up Date & Time", zh: "希望乘车时间", ko: "희망 승차 일시" },
    "page.contact.f.pax":      { ja: "乗車人数", en: "Passengers", zh: "乘车人数", ko: "탑승 인원" },
    "reserve.optional":        { ja: " (任意)", en: " (optional)", zh: " (选填)", ko: " (선택)" },
    "reserve.opt.none":        { ja: "指定なし", en: "No preference", zh: "不指定", ko: "지정 안 함" },
    "reserve.ph.from":         { ja: "例: 羽田空港 第3ターミナル", en: "e.g. Haneda Airport Terminal 3", zh: "例: 羽田机场第3航站楼", ko: "예: 하네다공항 제3터미널" },
    "reserve.ph.to":           { ja: "例: 東京駅 丸の内口", en: "e.g. Tokyo Station Marunouchi", zh: "例: 东京站丸之内口", ko: "예: 도쿄역 마루노우치" },
    "reserve.privacy":         { ja: "個人情報の取り扱いに同意のうえ送信します。", en: "I agree to the handling of my personal information.", zh: "我同意对个人信息的处理后提交。", ko: "개인정보 취급에 동의하고 전송합니다." },

    "reserve.success.title":   { ja: "ご予約を受け付けました", en: "Reservation Received", zh: "已收到您的预约", ko: "예약을 접수했습니다" },
    "reserve.success.lead":    { ja: "担当者より折り返しご連絡いたします。予約番号は控えとして保管してください。", en: "Our staff will contact you shortly. Please keep your reservation number for reference.", zh: "工作人员将尽快与您联系。请保留预约编号以备查询。", ko: "담당자가 곧 연락드립니다. 예약 번호를 보관해 주세요." },
    "reserve.success.no":      { ja: "予約番号", en: "Reservation No.", zh: "预约编号", ko: "예약 번호" },
    "reserve.success.again":   { ja: "続けて予約する", en: "Make another reservation", zh: "继续预约", ko: "계속 예약하기" },
    "reserve.copy":            { ja: "予約番号をコピー", en: "Copy reservation number", zh: "复制预约编号", ko: "예약 번호 복사" },
    "reserve.copied":          { ja: "コピーしました", en: "Copied", zh: "已复制", ko: "복사했습니다" },
    "reserve.recap.datetime":  { ja: "乗車日時", en: "Pick-up", zh: "乘车时间", ko: "승차 일시" },
    "reserve.recap.route":     { ja: "区間", en: "Route", zh: "区间", ko: "구간" },
    "reserve.recap.pax":       { ja: "人数", en: "Passengers", zh: "人数", ko: "인원" },

    "reserve.submitting":      { ja: "送信中…", en: "Sending…", zh: "提交中…", ko: "전송 중…" },
    "reserve.err.required":    { ja: "未入力の必須項目があります。ご確認ください。", en: "Please fill in all required fields.", zh: "有必填项未填写，请确认。", ko: "필수 항목을 입력해 주세요." },
    "reserve.err.400":         { ja: "入力内容をご確認ください。", en: "Please check your input.", zh: "请检查您的输入内容。", ko: "입력 내용을 확인해 주세요." },
    "reserve.err.422":         { ja: "乗車日時の指定が正しくありません。", en: "The pick-up date/time is invalid.", zh: "乘车时间指定有误。", ko: "승차 일시 지정이 올바르지 않습니다." },
    "reserve.err.429":         { ja: "送信が混み合っています。少し時間をおいて再度お試しください。", en: "Too many requests. Please wait a moment and try again.", zh: "请求过于频繁，请稍后再试。", ko: "요청이 많습니다. 잠시 후 다시 시도해 주세요." },
    "reserve.err.500":         { ja: "通信エラーが発生しました。時間をおいて再度お試しください。", en: "A communication error occurred. Please try again later.", zh: "发生通信错误，请稍后再试。", ko: "통신 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
    "reserve.err.f.name":      { ja: "お名前を入力してください。", en: "Please enter your name.", zh: "请输入您的姓名。", ko: "이름을 입력해 주세요." },
    "reserve.err.f.phone":     { ja: "電話番号を8〜20文字で入力してください。", en: "Please enter a phone number (8–20 characters).", zh: "请输入8〜20位的电话号码。", ko: "전화번호를 8~20자로 입력해 주세요." },
    "reserve.err.f.email":     { ja: "メールアドレスの形式が正しくありません。", en: "Please enter a valid email address.", zh: "邮箱地址格式不正确。", ko: "이메일 형식이 올바르지 않습니다." },
    "reserve.err.f.pax":       { ja: "乗車人数は1〜20名で入力してください。", en: "Passengers must be between 1 and 20.", zh: "乘车人数请填写1〜20。", ko: "탑승 인원은 1~20명으로 입력해 주세요." },
    "reserve.err.f.datetime":  { ja: "希望乗車日時を指定してください。", en: "Please select a pick-up date and time.", zh: "请指定希望乘车时间。", ko: "희망 승차 일시를 지정해 주세요." },
    "reserve.err.f.from":      { ja: "出発地を入力してください。", en: "Please enter the pick-up location.", zh: "请输入出发地。", ko: "출발지를 입력해 주세요." },
    "reserve.err.f.to":        { ja: "目的地を入力してください。", en: "Please enter the destination.", zh: "请输入目的地。", ko: "목적지를 입력해 주세요." },
    "reserve.err.f.privacy":   { ja: "送信には同意が必要です。", en: "You must agree to proceed.", zh: "提交前需同意。", ko: "전송하려면 동의가 필요합니다." },
    "reserve.err.captcha":     { ja: "スパム対策の認証にチェックを入れてください。", en: "Please complete the anti-spam verification.", zh: "请完成人机验证（反垃圾）。", ko: "스팸 방지 인증을 완료해 주세요." },

    /* ============ HEAD TITLES ============ */
    "title.index": { ja: "羽田・成田の高級ハイヤー Z&GLOBAL | 空港送迎・役員送迎・観光チャーター 4言語対応", en: "Premium Chauffeur Haneda & Narita | Z&GLOBAL - Airport, Executive & Tour", zh: "羽田・成田高级包车 Z&GLOBAL | 机场接送・商务接送・观光包车 4语言对应", ko: "하네다・나리타 고급 하이어 Z&GLOBAL | 공항 픽업・임원 의전・관광 전세 4개국어" },
    "title.about": { ja: "会社概要 | Z&GLOBAL株式会社 - 羽田・成田ハイヤー送迎の実績と信頼", en: "About Us | Z&GLOBAL - Trusted Haneda & Narita Chauffeur Service", zh: "公司介绍 | Z&GLOBAL - 羽田・成田包车接送的实绩与信赖", ko: "회사 소개 | Z&GLOBAL - 하네다・나리타 하이어 송영의 실적과 신뢰" },
    "title.fleet": { ja: "車両ラインナップ | Z&GLOBAL - アルファード・グランエース・ハイエース料金比較", en: "Our Fleet | Z&GLOBAL - Alphard, Granace & Hiace Rates", zh: "车辆阵容 | Z&GLOBAL - 埃尔法・格瑞维亚・海狮 价格比较", ko: "차량 라인업 | Z&GLOBAL - 알파드・그란에이스・하이에이스 요금 비교" },
    "title.services": { ja: "ハイヤーサービス | Z&GLOBAL - 空港送迎・役員送迎・観光・ゴルフ送迎", en: "Chauffeur Services | Z&GLOBAL - Airport, Executive, Tour & Golf", zh: "包车服务 | Z&GLOBAL - 机场接送・商务接送・观光・高尔夫接送", ko: "하이어 서비스 | Z&GLOBAL - 공항・임원・관광・골프 송영" },
    "title.contact": { ja: "お問い合わせ・ご予約 | Z&GLOBAL - 羽田・成田ハイヤー24時間受付中", en: "Contact & Booking | Z&GLOBAL - Haneda & Narita Hire, 24h", zh: "联系与预约 | Z&GLOBAL - 羽田・成田包车 24小时受理", ko: "문의 및 예약 | Z&GLOBAL - 하네다・나리타 하이어 24시간 접수" }
  };

  // 言語別URL（/en/ /zh/ /ko/）配下なら、その言語をパスから判定する
  function langFromPath() {
    const m = location.pathname.match(/^\/(en|zh|ko)(?=\/|$)/);
    return m ? m[1] : null;
  }

  // 現在ページの「言語接頭辞を除いたパス」に、指定言語の接頭辞を付けたURLを返す
  function urlForLang(lang) {
    let path = location.pathname.replace(/^\/(en|zh|ko)(?=\/|$)/, "");
    if (path === "" || path === "/") path = "/index.html";
    const prefix = lang === "ja" ? "" : "/" + lang;
    return prefix + path + location.hash;
  }

  function getLang() {
    const fromPath = langFromPath();
    if (fromPath) return fromPath; // 言語別URLが最優先
    const saved = localStorage.getItem("zglobal_lang");
    if (saved && DICT["nav.home"][saved]) return saved;
    const nav = (navigator.language || "ja").toLowerCase();
    if (nav.startsWith("zh")) return "zh";
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("en")) return "en";
    return "ja";
  }

  function setLang(lang) {
    localStorage.setItem("zglobal_lang", lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const v = DICT[key] && DICT[key][lang];
      if (v != null) {
        // contains HTML if value has any tag like <br>
        if (/<[a-z][\s\S]*>/i.test(v)) el.innerHTML = v;
        else el.textContent = v;
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const v = DICT[key] && DICT[key][lang];
      if (v != null) el.setAttribute("placeholder", v);
    });

    // Translate Document Title
    const titleKey = document.body.getAttribute("data-i18n-title");
    if (titleKey && DICT[titleKey] && DICT[titleKey][lang]) {
      document.title = DICT[titleKey][lang];
    }

    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
  }

  function init() {
    const lang = getLang();
    setLang(lang);
    // 言語切替は言語別URL（/en/ 等）へ遷移する。各言語ページの head が
    // 翻訳済み meta/OGP を静的に持つため、SNS スクレイパーにも正しく伝わる。
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.addEventListener("click", () => {
        const target = b.dataset.lang;
        localStorage.setItem("zglobal_lang", target);
        window.location.href = urlForLang(target);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.ZGLOBAL_I18N = { DICT, setLang, getLang };
})();
