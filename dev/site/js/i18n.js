/* Z&GLOBAL i18n: ja / en / zh / ko */
(function () {
  const DICT = {
    /* ============ NAV ============ */
    "nav.home":     { ja: "ホーム",     en: "Home",      zh: "首页",     ko: "홈" },
    "nav.about":    { ja: "会社概要",   en: "About",     zh: "公司介绍", ko: "회사소개" },
    "nav.fleet":    { ja: "車両ラインナップ", en: "Fleet", zh: "车辆阵容", ko: "차량 라인업" },
    "nav.services": { ja: "サービス",   en: "Services",  zh: "服务",     ko: "서비스" },
    "nav.taxi":     { ja: "タクシー",   en: "Taxi",      zh: "出租车",   ko: "택시" },
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
    "hero.bannerCta":  { ja: "お電話・LINE・予約サイトから24時間受付:",
                          en: "24/7 by phone, LINE, or our booking site:",
                          zh: "电话・LINE・预约网站 24小时受理:",
                          ko: "전화・LINE・예약 사이트로 24시간 접수:" },

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
    "foot.dispatch":   { ja: "配車担当（谷）", en: "Dispatch (Tani)", zh: "配车负责人（谷）", ko: "배차 담당 (타니)" },
    "foot.address.lbl":{ ja: "住所",      en: "Address",    zh: "地址",     ko: "주소" },
    "foot.address":    { ja: "千葉県印西市大森2550-1-301",
                          en: "2550-1-301 Omori, Inzai-shi, Chiba, Japan",
                          zh: "千叶县印西市大森2550-1-301",
                          ko: "치바현 인자이시 오모리 2550-1-301" },
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
    "page.about.info.biz.v":   { ja: "ハイヤー送迎・観光チャーター・空港送迎・役員送迎・タクシー",
                                  en: "Chauffeured transport, private tours, airport transfers, executive transport, taxis",
                                  zh: "司机包车、观光包车、机场接送、商务用车、出租车",
                                  ko: "하이어 송영, 관광 전세, 공항 픽업, 임원 의전, 택시" },
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
    "page.about.info.area.v":  { ja: "千葉県印西市大森2550-1-301",
                                  en: "2550-1-301 Omori, Inzai-shi, Chiba",
                                  zh: "千叶县印西市大森2550-1-301",
                                  ko: "치바현 인자이시 오모리 2550-1-301" },
    "page.about.info.tel":     { ja: "電話 / FAX", en: "Phone / Fax", zh: "电话 / 传真", ko: "전화 / 팩스" },
    "page.about.info.mail":    { ja: "メール", en: "Email", zh: "邮箱", ko: "이메일" },
    "page.about.info.lic":     { ja: "事業の許可", en: "License", zh: "事业许可", ko: "사업 허가" },
    "page.about.info.lic.v":   { ja: "一般乗用旅客自動車運送事業（ハイヤー・タクシー）",
                                  en: "General passenger vehicle transport business (chauffeur & taxi)",
                                  zh: "一般乘用旅客汽车运输事业（包车・出租车）",
                                  ko: "일반승용여객자동차운송사업 (하이어・택시)" },

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
    "page.contact.lead":  { ja: "ご予約は予約サイトから24時間受付。お見積もり・ご質問はお電話・メール・LINEから、通常2時間以内に返信いたします。",
                            en: "Bookings are taken 24/7 on our reservation site. For quotes and questions, reach us by phone, email or LINE — replies within 2 hours.",
                            zh: "预约请使用预约网站，24小时受理。询价・咨询请通过电话、邮箱或 LINE 联系，我们通常2小时内回复。",
                            ko: "예약은 예약 사이트에서 24시간 접수합니다. 견적・문의는 전화・이메일・LINE으로, 보통 2시간 이내 회신해 드립니다." },
    "page.contact.line":    { ja: "LINE", en: "LINE", zh: "LINE", ko: "LINE" },
    "page.contact.line.v":  { ja: "ID: @z-global", en: "ID: @z-global", zh: "ID: @z-global", ko: "ID: @z-global" },
    "page.contact.wechat":  { ja: "WeChat / 微信", en: "WeChat", zh: "微信", ko: "WeChat" },
    "page.contact.wechat.v":{ ja: "ID: zglobal777", en: "ID: zglobal777", zh: "ID: zglobal777", ko: "ID: zglobal777" },

    /* ============ BOOKING CTA (reserve.z-global.jp) ============ */
    "book.cta.primary": { ja: "ご予約はこちら",
                          en: "Book Now",
                          zh: "立即预约",
                          ko: "예약하기" },
    "book.cta.status":  { ja: "すでにご予約の方 ▶ 予約状況の確認",
                          en: "Already booked? ▶ Check your reservation",
                          zh: "已预约的客户 ▶ 查询预约状态",
                          ko: "이미 예약하신 분 ▶ 예약 상태 확인" },
    "book.cta.note":    { ja: "※Web申込は24時間受付です。担当者確認後、確定のご連絡を差し上げます（ご連絡は営業時間 10:00〜20:00 / 営業時間内は3時間以内目安）。",
                          en: "※Online requests are accepted 24/7. Our staff will review your request and send a confirmation (contact hours 10:00-20:00; typically within 3 hours during business hours).",
                          zh: "※网上申请24小时受理。工作人员确认后将与您联系确认（联络时间 10:00〜20:00 / 营业时间内约3小时以内）。",
                          ko: "※웹 신청은 24시간 접수합니다. 담당자 확인 후 확정 연락을 드립니다(연락은 영업시간 10:00~20:00 / 영업시간 내 3시간 이내 목표)." },
    "book.cta.note2":   { ja: "※ご用途（空港送迎・役員送迎・観光チャーター・ゴルフ送迎）は、予約サイトの備考欄にご記入ください。予約番号をお忘れの場合は、ご予約時のメールアドレスとお電話番号で照会いただけます（メールアドレスをご入力いただいたご予約に限ります。ご不明な場合は 0476-29-5498 へお電話ください）。",
                          en: "※Please note your purpose of travel (airport, executive, sightseeing or golf transfer) in the remarks field on the reservation site. If you forget your reservation number, you can look it up with the email address and phone number used when booking (only for bookings made with an email address; otherwise please call 0476-29-5498).",
                          zh: "※用车用途（机场接送・高管接送・观光包车・高尔夫接送）请填写在预约网站的备注栏。忘记预约编号时，可用预约时的邮箱地址与电话号码查询（仅限填写了邮箱地址的预约。如无法查询请致电 0476-29-5498）。",
                          ko: "※이용 목적(공항 픽업・임원 의전・관광 전세・골프 송영)은 예약 사이트의 비고란에 기입해 주세요. 예약 번호를 잊으신 경우 예약 시 입력하신 이메일 주소와 전화번호로 조회하실 수 있습니다(이메일 주소를 입력하신 예약에 한합니다. 확인이 어려우시면 0476-29-5498로 전화해 주세요)." },

    /* ============ HEAD TITLES ============ */
    "title.index": { ja: "羽田・成田の高級ハイヤー Z&GLOBAL | 空港送迎・役員送迎・観光チャーター 4言語対応", en: "Premium Chauffeur Haneda & Narita | Z&GLOBAL - Airport, Executive & Tour", zh: "羽田・成田高级包车 Z&GLOBAL | 机场接送・商务接送・观光包车 4语言对应", ko: "하네다・나리타 고급 하이어 Z&GLOBAL | 공항 픽업・임원 의전・관광 전세 4개국어" },
    "title.about": { ja: "会社概要 | Z&GLOBAL株式会社 - 羽田・成田ハイヤー送迎の実績と信頼", en: "About Us | Z&GLOBAL - Trusted Haneda & Narita Chauffeur Service", zh: "公司介绍 | Z&GLOBAL - 羽田・成田包车接送的实绩与信赖", ko: "회사 소개 | Z&GLOBAL - 하네다・나리타 하이어 송영의 실적과 신뢰" },
    "title.fleet": { ja: "車両ラインナップ | Z&GLOBAL - アルファード・グランエース・ハイエース料金比較", en: "Our Fleet | Z&GLOBAL - Alphard, Granace & Hiace Rates", zh: "车辆阵容 | Z&GLOBAL - 埃尔法・格瑞维亚・海狮 价格比较", ko: "차량 라인업 | Z&GLOBAL - 알파드・그란에이스・하이에이스 요금 비교" },
    "title.services": { ja: "ハイヤーサービス | Z&GLOBAL - 空港送迎・役員送迎・観光・ゴルフ送迎", en: "Chauffeur Services | Z&GLOBAL - Airport, Executive, Tour & Golf", zh: "包车服务 | Z&GLOBAL - 机场接送・商务接送・观光・高尔夫接送", ko: "하이어 서비스 | Z&GLOBAL - 공항・임원・관광・골프 송영" },
    "title.contact": { ja: "お問い合わせ・ご予約 | Z&GLOBAL - 羽田・成田ハイヤー24時間受付中", en: "Contact & Booking | Z&GLOBAL - Haneda & Narita Hire, 24h", zh: "联系与预约 | Z&GLOBAL - 羽田・成田包车 24小时受理", ko: "문의 및 예약 | Z&GLOBAL - 하네다・나리타 하이어 24시간 접수" },
    "title.taxi": { ja: "タクシー | Z&GLOBAL - 成田・印西エリアのタクシー配車・予約", en: "Taxi | Z&GLOBAL - Taxi Dispatch & Booking in Narita and Inzai", zh: "出租车 | Z&GLOBAL - 成田・印西地区出租车叫车・预约", ko: "택시 | Z&GLOBAL - 나리타・인자이 지역 택시 배차・예약" },

    /* ============ TAXI（taxi.html・トップの帯・サービスページの案内） 2026-11-19 ============ */
    "taxi.eyebrow":    { ja: "Taxi Service", en: "Taxi Service", zh: "出租车服务", ko: "택시 서비스" },
    "taxi.heading":    { ja: "成田・印西エリアの<br />タクシー",
                          en: "Taxi Service in<br />Narita &amp; Inzai",
                          zh: "成田・印西地区的<br />出租车",
                          ko: "나리타・인자이 지역의<br />택시" },
    "taxi.lead":       { ja: "Z&GLOBALは、国土交通省の許可を受けた一般乗用旅客自動車運送事業者として、ハイヤーに加えてタクシーを運行しています。ご自宅や駅へのお迎え、成田空港への移動、通院やお買い物まで。地域の毎日の移動を、ハイヤーと同じ運行管理のもとでお支えします。",
                          en: "Z&GLOBAL is a general passenger vehicle transport operator licensed by Japan's Ministry of Land, Infrastructure, Transport and Tourism, and we run taxis alongside our chauffeur service. From pickups at your home or the station to rides to Narita Airport, hospital visits and shopping, we support everyday travel in the area under the same operations management as our chauffeur service.",
                          zh: "Z&GLOBAL 是获得日本国土交通省许可的一般乘用旅客汽车运输业者，除包车外也经营出租车业务。从住宅・车站接送、前往成田机场，到就医与购物，我们以与包车相同的运行管理体制，支持您在本地区的日常出行。",
                          ko: "Z&GLOBAL은 일본 국토교통성의 허가를 받은 일반승용여객자동차운송사업자로서, 하이어와 함께 택시를 운행하고 있습니다. 자택이나 역 픽업, 나리타 공항 이동, 병원 방문과 쇼핑까지. 지역의 일상 이동을 하이어와 동일한 운행 관리 체제로 지원합니다." },
    "taxi.call.label": { ja: "タクシーのご用命", en: "Call a Taxi", zh: "出租车叫车", ko: "택시 호출" },
    "taxi.call.note":  { ja: "お電話で配車・ご予約を承ります", en: "We take dispatch requests and bookings by phone.", zh: "电话受理叫车与预约", ko: "전화로 배차・예약을 받습니다" },
    "taxi.line.btn":   { ja: "LINEで予約する", en: "Book via LINE", zh: "通过LINE预约", ko: "LINE으로 예약" },
    "taxi.fact.area.k": { ja: "営業区域", en: "Service Area", zh: "营业区域", ko: "영업 구역" },
    "taxi.fact.area.v": { ja: "北総交通圏（成田・印西ほか）", en: "Hokuso traffic zone (Narita, Inzai and more)", zh: "北总交通圈（成田・印西等）", ko: "호쿠소 교통권 (나리타・인자이 등)" },
    "taxi.fact.lic.k":  { ja: "事業の許可", en: "License", zh: "事业许可", ko: "사업 허가" },
    "taxi.fact.lic.v":  { ja: "一般乗用旅客自動車運送事業", en: "General passenger vehicle transport business", zh: "一般乘用旅客汽车运输事业", ko: "일반승용여객자동차운송사업" },
    "taxi.fact.lang.k": { ja: "ご予約の言語", en: "Booking Languages", zh: "预约语言", ko: "예약 언어" },

    "taxi.svc.eyebrow": { ja: "Taxi Services", en: "Taxi Services", zh: "出租车服务内容", ko: "택시 서비스" },
    "taxi.svc.heading": { ja: "6つのご利用シーン", en: "Six Ways to Ride", zh: "六种乘车场景", ko: "여섯 가지 이용 장면" },
    "taxi.svc.pickup.h": { ja: "ご予約・お迎え配車", en: "Booked Pickups", zh: "预约・上门接送", ko: "예약・픽업 배차" },
    "taxi.svc.pickup.b": { ja: "ご自宅・駅・ホテル・施設など、ご指定の場所と時間にお迎えに伺います。朝の通勤や大切なご予定の前も、時間どおりに。",
                            en: "We pick you up at your home, the station, a hotel or any other facility at the time you choose, so you arrive on time for your morning commute or an important appointment.",
                            zh: "按您指定的地点与时间，到住宅・车站・酒店・各类设施接您。早晨通勤或重要行程前，也准时到达。",
                            ko: "자택・역・호텔・시설 등 지정하신 장소와 시간에 픽업하러 갑니다. 아침 출근이나 중요한 일정 전에도 시간에 맞춰 모십니다." },
    "taxi.svc.airport.h": { ja: "成田空港へのタクシー", en: "Taxi to Narita Airport", zh: "前往成田机场的出租车", ko: "나리타 공항 택시" },
    "taxi.svc.airport.b": { ja: "成田・印西エリアから成田空港へ。早朝・深夜のフライトも事前のご予約で承ります。スーツケースなどお荷物が多い場合は、ご予約時にお知らせください。",
                             en: "From the Narita and Inzai area to Narita Airport. Early-morning and late-night flights are covered with an advance booking. If you have a lot of luggage, such as suitcases, please let us know when you book.",
                             zh: "从成田・印西地区前往成田机场。清晨・深夜航班亦可提前预约。行李箱等行李较多时，请在预约时告知。",
                             ko: "나리타・인자이 지역에서 나리타 공항까지. 이른 아침・심야 항공편도 사전 예약으로 받습니다. 여행 가방 등 짐이 많으시면 예약 시 알려 주세요." },
    "taxi.svc.daily.h": { ja: "通院・お買い物", en: "Hospital Visits & Shopping", zh: "就医・购物", ko: "병원・쇼핑" },
    "taxi.svc.daily.b": { ja: "定期的な通院やお買い物の足に。お帰りの時間に合わせたお迎えもご予約いただけます。障害者手帳をお持ちの方は運賃の割引があります。",
                           en: "A dependable ride for regular hospital visits and shopping. You can also book a pickup for your return trip. Fare discounts are available for holders of a disability certificate.",
                           zh: "定期就医与购物的出行好帮手。也可预约配合您回程时间的接送。持有残障者手册的乘客可享受车费优惠。",
                           ko: "정기적인 병원 방문이나 쇼핑의 발이 되어 드립니다. 귀가 시간에 맞춘 픽업도 예약하실 수 있습니다. 장애인 수첩을 소지하신 분은 운임 할인이 있습니다." },
    "taxi.svc.tour.h": { ja: "地域の観光", en: "Local Sightseeing", zh: "本地观光", ko: "지역 관광" },
    "taxi.svc.tour.b": { ja: "成田山新勝寺や佐原の町並みなど、北総エリアの観光に。乗り継ぎの待ち時間を使った観光も、行き先と所要時間をご相談のうえ料金の目安をご案内します。",
                          en: "Explore the Hokuso area, including Naritasan Shinshoji Temple and the historic streets of Sawara. Even for a short outing during a flight layover, tell us where you would like to go and how much time you have, and we will give you a fare estimate.",
                          zh: "成田山新胜寺、佐原古街等北总地区观光。利用转机等待时间的观光也可，请告知目的地与所需时间，我们将为您介绍费用参考。",
                          ko: "나리타산 신쇼지, 사와라의 옛 거리 등 호쿠소 지역 관광에. 환승 대기 시간을 이용한 관광도 목적지와 소요 시간을 상담해 주시면 요금 기준을 안내해 드립니다." },
    "taxi.svc.corp.h": { ja: "法人・ビジネスのご利用", en: "Corporate & Business", zh: "企业・商务用车", ko: "법인・비즈니스 이용" },
    "taxi.svc.corp.b": { ja: "取引先のお出迎えや社員の移動に。法人のお客様は、ご利用分をまとめてご請求する後払いにも対応します。まずはお気軽にご相談ください。",
                          en: "For meeting clients and moving your staff. Corporate customers can also pay later, with rides billed together on one invoice. Please feel free to contact us.",
                          zh: "用于迎接客户或员工出行。企业客户可选择后付款，将使用费用汇总开具账单。欢迎随时咨询。",
                          ko: "거래처 영접이나 직원 이동에. 법인 고객은 이용분을 모아서 청구하는 후불에도 대응합니다. 부담 없이 상담해 주세요." },
    "taxi.svc.lang.h": { ja: "外国語でのご予約", en: "Booking in Your Language", zh: "外语预约", ko: "외국어 예약" },
    "taxi.svc.lang.b": { ja: "英語・中国語・韓国語でもご予約を承ります。海外からのお客様やご家族の送迎も、行き先の確認から安心してお任せください。",
                          en: "We also take bookings in English, Chinese and Korean. Leave rides for overseas guests and their families to us, starting with confirming the destination.",
                          zh: "也可用英语・中文・韩语预约。海外来宾及其家人的接送，从确认目的地开始，请放心交给我们。",
                          ko: "영어・중국어・한국어로도 예약을 받습니다. 해외에서 오신 손님이나 가족의 송영도 목적지 확인부터 안심하고 맡겨 주세요." },

    "taxi.how.eyebrow": { ja: "How to Book", en: "How to Book", zh: "叫车方式", ko: "이용 방법" },
    "taxi.how.heading": { ja: "タクシーの呼び方・ご予約方法", en: "How to Call or Book a Taxi", zh: "叫车与预约方式", ko: "택시 호출・예약 방법" },
    "taxi.how.tel.h":   { ja: "お電話", en: "Phone", zh: "电话", ko: "전화" },
    "taxi.how.tel.b":   { ja: "今すぐの配車も、日時を決めたご予約も、お電話がいちばん確実です。お迎え場所・行き先・人数をお伝えください。",
                           en: "Phone is the surest way, whether you need a taxi now or want to book a time. Please tell us your pickup point, destination and number of passengers.",
                           zh: "无论是立即叫车还是指定时间预约，电话最为可靠。请告知上车地点・目的地・人数。",
                           ko: "지금 바로 배차도, 일시를 정한 예약도 전화가 가장 확실합니다. 픽업 장소・목적지・인원을 알려 주세요." },
    "taxi.how.line.h":  { ja: "LINE", en: "LINE", zh: "LINE", ko: "LINE" },
    "taxi.how.line.b":  { ja: "公式LINEからご予約いただけます。ご希望の日時・お迎え場所・行き先・人数をお送りください。担当者から確定のご連絡を差し上げます。",
                           en: "You can book through our official LINE account. Send us the date and time, pickup point, destination and number of passengers, and our staff will reply to confirm.",
                           zh: "可通过官方LINE预约。请发送希望的日期时间・上车地点・目的地・人数，工作人员将回复确认。",
                           ko: "공식 LINE으로 예약하실 수 있습니다. 희망 일시・픽업 장소・목적지・인원을 보내 주세요. 담당자가 확정 연락을 드립니다." },
    "taxi.how.line.btn": { ja: "LINEを開く", en: "Open LINE", zh: "打开LINE", ko: "LINE 열기" },
    "taxi.how.hire.h":  { ja: "高級車をご希望なら", en: "Prefer a Premium Vehicle?", zh: "如需高级车", ko: "고급차를 원하시면" },
    "taxi.how.hire.b":  { ja: "アルファード・グランエース・ハイエースでの空港送迎や貸切は、ハイヤーの予約サイトから24時間お申し込みいただけます。",
                           en: "For airport transfers or charters in an Alphard, Granace or Hiace, book 24 hours a day on our chauffeur reservation site.",
                           zh: "如需使用埃尔法・格瑞维亚・海狮进行机场接送或包车，可通过包车预约网站24小时申请。",
                           ko: "알파드・그란에이스・하이에이스로 공항 픽업이나 전세를 원하시면 하이어 예약 사이트에서 24시간 신청하실 수 있습니다." },
    "taxi.how.hire.btn": { ja: "予約サイトへ", en: "Go to Reservation Site", zh: "前往预约网站", ko: "예약 사이트로" },
    "taxi.how.note":    { ja: "当日の配車は、車両の空き状況によりお待ちいただく場合や、ご希望に沿えない場合があります。お時間が決まっている場合は、事前のご予約をおすすめします。",
                           en: "Same-day dispatch depends on vehicle availability, so you may need to wait or we may be unable to meet your request. If your schedule is fixed, we recommend booking in advance.",
                           zh: "当日叫车视车辆空闲情况而定，可能需要等候或无法满足您的要求。如时间已确定，建议提前预约。",
                           ko: "당일 배차는 차량 상황에 따라 기다리시거나 희망에 부응하지 못할 수 있습니다. 시간이 정해져 있다면 사전 예약을 권장합니다." },

    "taxi.flow.eyebrow": { ja: "Ride Flow", en: "Ride Flow", zh: "乘车流程", ko: "승차 흐름" },
    "taxi.flow.heading": { ja: "ご乗車までの流れ", en: "From Booking to Arrival", zh: "从预约到抵达", ko: "승차까지의 흐름" },
    "taxi.flow.1.h": { ja: "ご連絡", en: "Contact Us", zh: "联系我们", ko: "연락" },
    "taxi.flow.1.b": { ja: "お電話またはLINEで、日時・お迎え場所・行き先・人数をお知らせください。",
                        en: "By phone or LINE, tell us the date and time, pickup point, destination and number of passengers.",
                        zh: "请通过电话或LINE告知日期时间・上车地点・目的地・人数。",
                        ko: "전화 또는 LINE으로 일시・픽업 장소・목적지・인원을 알려 주세요." },
    "taxi.flow.2.h": { ja: "お迎え", en: "Pickup", zh: "上门接车", ko: "픽업" },
    "taxi.flow.2.b": { ja: "ご指定の時間・場所へ、乗務員がお迎えに伺います。",
                        en: "Your driver arrives at the time and place you specified.",
                        zh: "司机将按您指定的时间・地点前来接您。",
                        ko: "지정하신 시간・장소로 승무원이 픽업하러 갑니다." },
    "taxi.flow.3.h": { ja: "ご乗車", en: "Your Ride", zh: "乘车", ko: "승차" },
    "taxi.flow.3.b": { ja: "行き先と、ご希望のルートがあればお伝えください。乗務員がルートを確認して出発します。",
                        en: "Tell your driver the destination and any preferred route. The driver will confirm the route before setting off.",
                        zh: "请告知目的地及希望的路线（如有）。司机确认路线后出发。",
                        ko: "목적지와 희망 경로가 있으면 알려 주세요. 승무원이 경로를 확인한 후 출발합니다." },
    "taxi.flow.4.h": { ja: "お支払い", en: "Payment", zh: "付款", ko: "결제" },
    "taxi.flow.4.b": { ja: "到着後、メーターに表示された運賃・料金をお支払いください。領収書をお渡しします。",
                        en: "On arrival, pay the fare and charges shown on the meter. Your driver will give you a receipt.",
                        zh: "抵达后，请支付计价器显示的车费・费用。我们会为您提供收据。",
                        ko: "도착 후 미터기에 표시된 운임・요금을 지불해 주세요. 영수증을 드립니다." },

    "taxi.fare.eyebrow": { ja: "Fares & Payment", en: "Fares & Payment", zh: "车费与付款", ko: "운임・결제" },
    "taxi.fare.heading": { ja: "運賃・料金とお支払い", en: "Fares, Charges & Payment", zh: "车费・费用与付款", ko: "운임・요금과 결제" },
    "taxi.fare.meter.h": { ja: "メーター運賃", en: "Metered Fares", zh: "计价车费", ko: "미터 운임" },
    "taxi.fare.meter.b": { ja: "運賃は国の認可を受けた距離制のメーター運賃です。走行距離と時間に応じて、メーターに表示された金額をお支払いいただきます。",
                            en: "Fares are distance-based meter fares approved by the national government. You pay the amount shown on the meter, which reflects the distance and time travelled.",
                            zh: "车费为经国家认可的按里程计价的计价器车费。根据行驶距离与时间，支付计价器显示的金额。",
                            ko: "운임은 국가의 인가를 받은 거리제 미터 운임입니다. 주행 거리와 시간에 따라 미터기에 표시된 금액을 지불하시면 됩니다." },
    "taxi.fare.extra.h": { ja: "加算される料金", en: "Additional Charges", zh: "附加费用", ko: "추가 요금" },
    "taxi.fare.extra.b": { ja: "お迎えやご予約には、迎車料金・予約料金がかかる場合があります。深夜・早朝（22時〜翌5時）は割増運賃です。有料道路・駐車場の料金はお客様のご負担となります。",
                            en: "A pickup fee or booking fee may apply when we come to collect you or when you book in advance. A late-night and early-morning surcharge applies from 22:00 to 5:00. Toll road and parking fees are paid by the customer.",
                            zh: "上门接车或预约时可能产生接车费・预约费。深夜・清晨（22点至次日5点）加收夜间车费。收费道路・停车费用由乘客承担。",
                            ko: "픽업이나 예약 시에는 영차 요금・예약 요금이 부과될 수 있습니다. 심야・이른 아침(22시~다음 날 5시)에는 할증 운임이 적용됩니다. 유료 도로・주차장 요금은 고객님 부담입니다." },
    "taxi.fare.disc.h": { ja: "障害者割引", en: "Disability Discount", zh: "残障者优惠", ko: "장애인 할인" },
    "taxi.fare.disc.b": { ja: "障害者手帳を乗車時にご提示いただくと、運賃が割引になります。対象となる手帳は、お電話でお問い合わせください。",
                           en: "Show a disability certificate when you board to receive a fare discount. Please call us to check which certificates are eligible.",
                           zh: "乘车时出示残障者手册即可享受车费优惠。适用的手册种类请致电咨询。",
                           ko: "승차 시 장애인 수첩을 제시하시면 운임이 할인됩니다. 대상 수첩은 전화로 문의해 주세요." },
    "taxi.fare.pay.h": { ja: "お支払い方法", en: "Payment Methods", zh: "付款方式", ko: "결제 방법" },
    "taxi.fare.pay.b": { ja: "現金でお支払いいただけます。法人のお客様は請求書による後払いもご利用いただけます。そのほかの決済方法は、ご予約時にお問い合わせください。",
                          en: "You can pay in cash. Corporate customers can also pay later by invoice. For other payment methods, please ask when you book.",
                          zh: "可使用现金付款。企业客户也可使用账单后付款。其他付款方式请在预约时咨询。",
                          ko: "현금으로 결제하실 수 있습니다. 법인 고객은 청구서에 의한 후불도 이용하실 수 있습니다. 그 밖의 결제 방법은 예약 시 문의해 주세요." },
    "taxi.fare.note": { ja: "運賃の目安は、お迎え場所と行き先をお知らせいただければ、お電話でご案内します。",
                         en: "Tell us your pickup point and destination, and we will give you a fare estimate by phone.",
                         zh: "告知上车地点与目的地后，我们可通过电话为您介绍车费参考。",
                         ko: "픽업 장소와 목적지를 알려 주시면 전화로 운임 기준을 안내해 드립니다." },

    "taxi.cmp.eyebrow": { ja: "Taxi or Chauffeur?", en: "Taxi or Chauffeur?", zh: "出租车还是包车？", ko: "택시 또는 하이어?" },
    "taxi.cmp.heading": { ja: "タクシーとハイヤーの違い", en: "Taxi vs. Chauffeur Service", zh: "出租车与包车的区别", ko: "택시와 하이어의 차이" },
    "taxi.cmp.col.item": { ja: "項目", en: "Item", zh: "项目", ko: "항목" },
    "taxi.cmp.col.hire": { ja: "ハイヤー", en: "Chauffeur (Hire)", zh: "包车", ko: "하이어" },
    "taxi.cmp.r1.k": { ja: "ご利用の仕方", en: "How It Works", zh: "使用方式", ko: "이용 방법" },
    "taxi.cmp.r1.t": { ja: "今すぐの配車・ご予約", en: "Immediate dispatch or booking", zh: "即时叫车・预约", ko: "즉시 배차・예약" },
    "taxi.cmp.r1.h": { ja: "完全予約制", en: "Advance booking only", zh: "完全预约制", ko: "완전 예약제" },
    "taxi.cmp.r2.k": { ja: "料金", en: "Pricing", zh: "费用", ko: "요금" },
    "taxi.cmp.r2.t": { ja: "メーター運賃", en: "Metered fare", zh: "计价车费", ko: "미터 운임" },
    "taxi.cmp.r2.h": { ja: "時間制・事前のお見積もり", en: "Hourly rates or advance quote", zh: "按时计费・事先报价", ko: "시간제・사전 견적" },
    "taxi.cmp.r3.k": { ja: "車両", en: "Vehicles", zh: "车辆", ko: "차량" },
    "taxi.cmp.r3.t": { ja: "タクシー車両", en: "Taxi vehicles", zh: "出租车车辆", ko: "택시 차량" },
    "taxi.cmp.r3.h": { ja: "アルファード・グランエース・ハイエース", en: "Alphard, Granace, Hiace", zh: "埃尔法・格瑞维亚・海狮", ko: "알파드・그란에이스・하이에이스" },
    "taxi.cmp.r4.k": { ja: "おすすめの場面", en: "Best For", zh: "推荐场景", ko: "추천 장면" },
    "taxi.cmp.r4.t": { ja: "駅・病院・お買い物・成田空港への移動", en: "Trips to stations, hospitals, shops and Narita Airport", zh: "前往车站・医院・购物・成田机场", ko: "역・병원・쇼핑・나리타 공항 이동" },
    "taxi.cmp.r4.h": { ja: "空港送迎・役員送迎・観光チャーター・ゴルフ", en: "Airport transfers, executive transport, sightseeing charters, golf", zh: "机场接送・高管接送・观光包车・高尔夫", ko: "공항 픽업・임원 의전・관광 전세・골프" },
    "taxi.cmp.r5.k": { ja: "お申し込み", en: "How to Book", zh: "申请方式", ko: "신청 방법" },
    "taxi.cmp.r5.t": { ja: "お電話・LINE", en: "Phone or LINE", zh: "电话・LINE", ko: "전화・LINE" },
    "taxi.cmp.r5.h": { ja: "予約サイト・お電話・LINE", en: "Reservation site, phone or LINE", zh: "预约网站・电话・LINE", ko: "예약 사이트・전화・LINE" },
    "taxi.cmp.link": { ja: "ハイヤーのサービスを見る", en: "See Chauffeur Services", zh: "查看包车服务", ko: "하이어 서비스 보기" },

    "taxi.safe.eyebrow": { ja: "Safety", en: "Safety", zh: "安全", ko: "안전" },
    "taxi.safe.heading": { ja: "安全・安心への取り組み", en: "Our Commitment to Safety", zh: "安全与安心的举措", ko: "안전・안심을 위한 노력" },
    "taxi.safe.1.h": { ja: "乗務前後の点呼とアルコール検査", en: "Roll Calls and Alcohol Tests Every Shift", zh: "出车前后点名与酒精检测", ko: "승무 전후 점호와 알코올 검사" },
    "taxi.safe.1.b": { ja: "乗務の始まりと終わりに、運行管理者による点呼とアルコール検査を毎日行っています。",
                        en: "Every day, an operations manager conducts a roll call and an alcohol test at the start and end of each driver's shift.",
                        zh: "每天在出车开始与结束时，由运行管理者进行点名与酒精检测。",
                        ko: "매일 승무 시작과 종료 시에 운행관리자가 점호와 알코올 검사를 실시합니다." },
    "taxi.safe.2.h": { ja: "毎日の車両点検", en: "Daily Vehicle Inspections", zh: "每日车辆检查", ko: "매일 차량 점검" },
    "taxi.safe.2.b": { ja: "出庫前に日常点検を行い、整備の行き届いた車両でお迎えします。",
                        en: "We inspect every vehicle before it leaves the depot, so you ride in a well-maintained car.",
                        zh: "出库前进行日常检查，以保养良好的车辆迎接您。",
                        ko: "출고 전 일상 점검을 실시하여 정비가 잘 된 차량으로 모십니다." },
    "taxi.safe.3.h": { ja: "運行管理者による管理", en: "Oversight by Operations Managers", zh: "由运行管理者管理", ko: "운행관리자에 의한 관리" },
    "taxi.safe.3.b": { ja: "運行管理者が乗務員の健康状態や勤務・休憩の時間を確認し、無理のない運行を管理しています。",
                        en: "Operations managers check each driver's health and working and rest hours, so that every shift is run safely and without strain.",
                        zh: "运行管理者确认司机的健康状况及工作・休息时间，确保运行安全、不过劳。",
                        ko: "운행관리자가 승무원의 건강 상태와 근무・휴식 시간을 확인하여 무리 없는 운행을 관리합니다." },

    "taxi.faq.heading": { ja: "よくあるご質問", en: "Frequently Asked Questions", zh: "常见问题", ko: "자주 묻는 질문" },
    "taxi.faq.1.q": { ja: "タクシーの予約はできますか？", en: "Can I book a taxi in advance?", zh: "可以预约出租车吗？", ko: "택시를 예약할 수 있나요?" },
    "taxi.faq.1.a": { ja: "はい。お電話またはLINEで承ります。ご希望の日時・お迎え場所・行き先・人数をお知らせください。",
                       en: "Yes. We accept bookings by phone or LINE. Please tell us the date and time, pickup point, destination and number of passengers.",
                       zh: "可以。通过电话或LINE受理。请告知希望的日期时间・上车地点・目的地・人数。",
                       ko: "네. 전화 또는 LINE으로 받습니다. 희망 일시・픽업 장소・목적지・인원을 알려 주세요." },
    "taxi.faq.2.q": { ja: "どのエリアで利用できますか？", en: "Which areas do you serve?", zh: "可在哪些区域使用？", ko: "어느 지역에서 이용할 수 있나요?" },
    "taxi.faq.2.a": { ja: "成田市・印西市を中心とする北総交通圏が営業区域です。区域内から東京方面や羽田空港など、区域外への移動にもご利用いただけます。",
                       en: "Our service area is the Hokuso traffic zone, centred on Narita and Inzai. You can also ride from within the zone to destinations outside it, such as central Tokyo or Haneda Airport.",
                       zh: "营业区域为以成田市・印西市为中心的北总交通圈。也可从区域内前往东京方向或羽田机场等区域外目的地。",
                       ko: "나리타시・인자이시를 중심으로 하는 호쿠소 교통권이 영업 구역입니다. 구역 내에서 도쿄 방면이나 하네다 공항 등 구역 밖으로의 이동에도 이용하실 수 있습니다." },
    "taxi.faq.3.q": { ja: "成田空港まで、早朝や深夜でも乗れますか？", en: "Can I take a taxi to Narita Airport early in the morning or late at night?", zh: "清晨或深夜也能乘车去成田机场吗？", ko: "이른 아침이나 심야에도 나리타 공항까지 탈 수 있나요?" },
    "taxi.faq.3.a": { ja: "事前にご予約いただければ承ります。時間が決まっている場合は、前日までのご予約をおすすめします。",
                       en: "Yes, with an advance booking. If your time is fixed, we recommend booking by the day before.",
                       zh: "提前预约即可受理。如时间已确定，建议在前一天之前预约。",
                       ko: "사전에 예약하시면 받습니다. 시간이 정해져 있다면 전날까지 예약하시기를 권장합니다." },
    "taxi.faq.4.q": { ja: "支払い方法は何がありますか？", en: "How can I pay?", zh: "有哪些付款方式？", ko: "결제 방법은 무엇이 있나요?" },
    "taxi.faq.5.q": { ja: "外国語で予約できますか？", en: "Can I book in a language other than Japanese?", zh: "可以用外语预约吗？", ko: "외국어로 예약할 수 있나요?" },
    "taxi.faq.5.a": { ja: "英語・中国語・韓国語でもご予約を承ります。お電話・LINEのどちらでもお気軽にどうぞ。",
                       en: "Yes. We also take bookings in English, Chinese and Korean, by phone or LINE.",
                       zh: "也可用英语・中文・韩语预约。电话・LINE均可，欢迎随时联系。",
                       ko: "영어・중국어・한국어로도 예약을 받습니다. 전화・LINE 어느 쪽이든 편하게 연락 주세요." },
    "taxi.faq.6.q": { ja: "車内に忘れ物をしたときは？", en: "What if I leave something in the taxi?", zh: "在车内遗忘物品怎么办？", ko: "차 안에 물건을 두고 내렸을 때는?" },
    "taxi.faq.6.a": { ja: "お電話（0476-29-5498）で、ご乗車の日時・乗った場所と降りた場所・お忘れ物の特徴をお知らせください。",
                       en: "Please call us at 0476-29-5498 and tell us the date and time of your ride, where you got on and off, and a description of the item.",
                       zh: "请致电（0476-29-5498），告知乘车日期时间・上下车地点・遗失物品的特征。",
                       ko: "전화(0476-29-5498)로 승차 일시・승차한 곳과 내린 곳・분실물의 특징을 알려 주세요." },

    "taxi.cta.heading": { ja: "タクシーのご用命は、<br />お電話・LINEで。",
                           en: "Need a taxi?<br />Call us or message us on LINE.",
                           zh: "叫出租车，<br />请致电或通过LINE联系。",
                           ko: "택시 호출은<br />전화・LINE으로." },

    "taxi.top.heading": { ja: "タクシーも、Z&GLOBALで。", en: "Taxis, Too, from Z&GLOBAL.", zh: "出租车，也选 Z&GLOBAL。", ko: "택시도 Z&GLOBAL로." },
    "taxi.top.lead":    { ja: "ハイヤーに加え、成田・印西を中心とした北総エリアでタクシーを運行しています。ご自宅や駅へのお迎え、成田空港への移動、通院やお買い物に。お電話・LINEで配車・ご予約を承ります。",
                           en: "Alongside our chauffeur service, we run taxis in the Hokuso area centred on Narita and Inzai, for pickups at home or the station, rides to Narita Airport, hospital visits and shopping. Call us or message us on LINE to request or book a taxi.",
                           zh: "除包车外，我们还在以成田・印西为中心的北总地区经营出租车。可用于住宅・车站接送、前往成田机场、就医与购物。电话・LINE受理叫车与预约。",
                           ko: "하이어와 함께 나리타・인자이를 중심으로 한 호쿠소 지역에서 택시를 운행하고 있습니다. 자택이나 역 픽업, 나리타 공항 이동, 병원 방문과 쇼핑에. 전화・LINE으로 배차・예약을 받습니다." },
    "taxi.top.more":    { ja: "タクシーについて詳しく", en: "Learn About Our Taxis", zh: "了解出租车服务", ko: "택시 자세히 보기" },
    "taxi.svcpage.h":   { ja: "近距離の移動や通院には、タクシーもどうぞ。", en: "For short trips and hospital visits, try our taxis.", zh: "短途出行或就医，也欢迎乘坐出租车。", ko: "가까운 이동이나 병원 방문에는 택시도 이용해 주세요." },
    "taxi.svcpage.b":   { ja: "成田・印西を中心とした北総エリアで、メーター運賃のタクシーを運行しています。お電話・LINEで配車・ご予約を承ります。",
                           en: "We run metered taxis in the Hokuso area centred on Narita and Inzai. Call us or message us on LINE to request or book a ride.",
                           zh: "我们在以成田・印西为中心的北总地区经营按表计费的出租车。电话・LINE受理叫车与预约。",
                           ko: "나리타・인자이를 중심으로 한 호쿠소 지역에서 미터 운임 택시를 운행하고 있습니다. 전화・LINE으로 배차・예약을 받습니다." }
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
