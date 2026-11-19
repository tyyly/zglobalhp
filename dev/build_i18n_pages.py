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
PAGES = ["index.html", "about.html", "services.html", "fleet.html", "contact.html", "taxi.html"]
LANGS = ["en", "zh", "ko"]
LOCALE = {"ja": "ja_JP", "en": "en_US", "zh": "zh_CN", "ko": "ko_KR"}

TITLE = {
  "index.html": {
    "en": "Haneda & Narita Airport Chauffeur and Taxi | Z&GLOBAL, Chiba",
    "zh": "羽田・成田机场接送包车与出租车 | Z&GLOBAL（千叶县印西市）",
    "ko": "하네다・나리타 공항 픽업 하이어・택시 | Z&GLOBAL (지바현 인자이시)",
  },
  "about.html": {
    "en": "About Us | Z&GLOBAL - Chauffeur & Taxi Company in Inzai, Chiba",
    "zh": "公司介绍 | Z&GLOBAL - 千叶县印西市的包车・出租车公司",
    "ko": "회사 소개 | Z&GLOBAL - 지바현 인자이시의 하이어・택시 회사",
  },
  "services.html": {
    "en": "Chauffeur Services | Narita & Haneda Airport Transfers, Executive Cars, Tours - Z&GLOBAL",
    "zh": "包车服务 | 成田・羽田机场接送・商务用车・观光包车 Z&GLOBAL",
    "ko": "하이어 서비스 | 나리타・하네다 공항 픽업・임원 의전・관광 전세 Z&GLOBAL",
  },
  "fleet.html": {
    "en": "Fleet & Rates | Alphard, Granace & Hiace Chauffeur Cars - Z&GLOBAL",
    "zh": "车辆与价格 | 埃尔法・格瑞维亚・海狮包车 Z&GLOBAL",
    "ko": "차량과 요금 | 알파드・그란에이스・하이에이스 하이어 Z&GLOBAL",
  },
  "contact.html": {
    "en": "Contact & Booking | Z&GLOBAL - Haneda & Narita Chauffeur, 24h",
    "zh": "联系与预约 | Z&GLOBAL 羽田・成田包车 24小时受理",
    "ko": "문의 및 예약 | Z&GLOBAL 하네다・나리타 하이어 24시간 접수",
  },
  "taxi.html": {
    "en": "Taxi in Inzai & Narita | Book a Taxi to Narita Airport - Z&GLOBAL",
    "zh": "印西・成田出租车 预约・叫车 | Z&GLOBAL 成田机场・就医・企业",
    "ko": "인자이・나리타 택시 예약・배차 | Z&GLOBAL 나리타 공항・병원・법인",
  },
}

DESC = {
  "index.html": {
    "en": "Z&GLOBAL (Inzai, Chiba) is a chauffeur and taxi company focused on Haneda and Narita airport transfers. Alphard, Granace and Hiace for airport, executive, sightseeing and golf transfers, plus taxis in the Narita and Inzai area. Japanese, English, Chinese and Korean.",
    "zh": "Z&GLOBAL（千叶县印西市）是以羽田・成田机场接送为主的包车与出租车公司。使用埃尔法・格瑞维亚・海狮提供机场接送、商务用车、观光包车与高尔夫接送，并在成田・印西地区经营出租车。支持日语・英语・中文・韩语。",
    "ko": "Z&GLOBAL(지바현 인자이시)은 하네다・나리타 공항 픽업을 중심으로 하는 하이어・택시 회사입니다. 알파드・그란에이스・하이에이스로 공항 픽업・임원 의전・관광 전세・골프 송영, 나리타・인자이 지역에서는 택시도 운행. 일본어・영어・중국어・한국어 대응.",
  },
  "about.html": {
    "en": "About Z&GLOBAL Co., Ltd. Based in Inzai, Chiba since 2018, we provide chauffeur, airport, executive and sightseeing transport, and run taxis in the Narita and Inzai area. Licensed general passenger vehicle transport business. Japanese, English, Chinese and Korean.",
    "zh": "Z&GLOBAL株式会社 公司介绍。自2018年起以千叶县印西市为据点，提供包车接送・机场接送・商务用车・观光包车，并在成田・印西地区经营出租车。一般乘用旅客汽车运输事业。支持日语・英语・中文・韩语。",
    "ko": "Z&GLOBAL 주식회사 회사 소개. 2018년부터 지바현 인자이시를 거점으로 하이어 송영・공항 픽업・임원 의전・관광 전세를 제공하며, 나리타・인자이 지역에서는 택시도 운행합니다. 일반승용여객자동차운송사업. 일본어・영어・중국어・한국어 대응.",
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
    "en": "Contact Z&GLOBAL for quotes and inquiries by phone (0476-29-5498), email, LINE or WeChat — we usually reply within 2 hours. Bookings are taken 24h on our reservation site. All services: airport, executive, tour and golf transfers.",
    "zh": "联系 Z&GLOBAL 进行报价・咨询，可通过电话（0476-29-5498）・邮件・LINE・WeChat 受理，通常2小时内回复。预约请使用预约网站，24小时受理。提供机场・高管・观光・高尔夫等全部接送服务。",
    "ko": "견적・문의는 전화(0476-29-5498)・이메일・LINE・WeChat으로 Z&GLOBAL에 문의해 주세요. 보통 2시간 이내 회신합니다. 예약은 예약 사이트에서 24시간 접수합니다. 공항・임원・관광・골프 등 전 서비스 대응.",
  },
  "taxi.html": {
    "en": "Taxis in Inzai and Narita, Chiba from Z&GLOBAL: pickups at home or stations such as Chiba New Town Chuo, Inzai-Makinohara and Narita, rides to Narita Airport, hospital visits, shopping and corporate use. Book by phone or LINE in Japanese, English, Chinese or Korean.",
    "zh": "印西・成田的出租车就选 Z&GLOBAL。可到千叶新城中央・印西牧之原・成田等车站或住宅接您，前往成田机场、就医・购物及企业用车。电话・LINE受理叫车与预约，也可用英语・中文・韩语预约。",
    "ko": "인자이・나리타 택시는 Z&GLOBAL. 지바 뉴타운 주오・인자이 마키노하라・나리타 등의 역이나 자택 픽업, 나리타 공항 이동, 병원・쇼핑, 법인 이용에. 전화・LINE으로 배차・예약하며 영어・중국어・한국어로도 예약할 수 있습니다.",
  },
}

# meta keywords（検索エンジン向けの語。2026-11-19 追加）
KEYWORDS = {
  "index.html": {
    "en": "Narita airport chauffeur,Haneda airport chauffeur,airport transfer Tokyo,private car Narita,Alphard chauffeur,executive car service Japan,private tour Mt Fuji,golf transfer,Narita taxi,Inzai taxi,Z&GLOBAL",
    "zh": "成田机场 包车,羽田机场 包车,成田机场 接机,机场接送 东京,埃尔法 包车,商务用车 日本,富士山 包车,高尔夫 接送,成田 出租车,印西 出租车,中文 司机,Z&GLOBAL",
    "ko": "나리타 공항 픽업,하네다 공항 픽업,공항 송영 도쿄,나리타 공항 하이어,알파드 하이어,임원 의전 차량,후지산 투어 전세,골프 송영,나리타 택시,인자이 택시,Z&GLOBAL",
  },
  "about.html": {
    "en": "Z&GLOBAL Co. Ltd.,about,Inzai Chiba,chauffeur company Japan,taxi company Chiba,airport transfer company,multilingual service",
    "zh": "Z&GLOBAL株式会社,公司介绍,千叶县印西市,包车公司 日本,出租车公司 千叶,机场接送公司,多语言服务",
    "ko": "Z&GLOBAL 주식회사,회사 소개,지바현 인자이시,하이어 회사 일본,택시 회사 지바,공항 송영 회사,다국어 서비스",
  },
  "services.html": {
    "en": "airport transfer Narita,airport transfer Haneda,chauffeur service rates,executive transport Tokyo,VIP transfer Japan,private tour Mt Fuji Hakone,golf transfer Chiba,Disney resort transfer",
    "zh": "成田机场接送,羽田机场接送,包车 价格,高管接送 东京,VIP 接送 日本,富士山 箱根 包车,高尔夫 接送,迪士尼 接送",
    "ko": "나리타 공항 송영,하네다 공항 송영,하이어 요금,임원 의전 도쿄,VIP 송영 일본,후지산 하코네 전세,골프 송영,디즈니 송영",
  },
  "fleet.html": {
    "en": "Alphard chauffeur,Vellfire hire,Granace chauffeur,Hiace van hire,chauffeur rates Japan,airport transfer price,group transfer,golf bags",
    "zh": "埃尔法 包车,威尔法 包车,格瑞维亚 包车,海狮 包车,包车 价格,机场接送 价格,多人 接送,高尔夫球包",
    "ko": "알파드 하이어,벨파이어 송영,그란에이스 하이어,하이에이스 송영,하이어 요금,공항 송영 요금,단체 송영,골프백 적재",
  },
  "contact.html": {
    "en": "book chauffeur Japan,airport transfer booking,Narita transfer reservation,quote,contact,LINE booking,WeChat",
    "zh": "包车 预约,机场接送 预约,成田机场 接送 预约,报价,咨询,LINE 预约,微信 WeChat",
    "ko": "하이어 예약,공항 송영 예약,나리타 공항 송영 예약,견적,문의,LINE 예약,위챗 WeChat",
  },
  "taxi.html": {
    "en": "Inzai taxi,Narita taxi,taxi to Narita Airport,book taxi Narita,Chiba New Town taxi,taxi booking in English,taxi booking in Chinese,Z&GLOBAL taxi",
    "zh": "印西 出租车,成田 出租车,成田机场 出租车 预约,千叶新城 出租车,中文预约 出租车,Z&GLOBAL 出租车",
    "ko": "인자이 택시,나리타 택시,나리타 공항 택시 예약,지바 뉴타운 택시,한국어 예약 택시,Z&GLOBAL 택시",
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
  "ご予約は予約サイト (https://reserve.z-global.jp) から24時間受付しています。お問い合わせは電話・メール・LINE・WeChatから24時間受付し、通常2時間以内に返信いたします。ご予約の確定連絡は営業時間 10:00〜20:00 に差し上げます。": {"en": "Bookings are accepted 24 hours a day on our reservation site (https://reserve.z-global.jp). Inquiries by phone, email, LINE and WeChat are also accepted 24 hours a day and we usually reply within 2 hours. Booking confirmations are sent during business hours, 10:00-20:00.", "zh": "预约通过预约网站（https://reserve.z-global.jp）24小时受理。电话・邮件・LINE・WeChat 的咨询同样24小时受理，通常2小时内回复。预约确认将在营业时间 10:00〜20:00 内联系您。", "ko": "예약은 예약 사이트(https://reserve.z-global.jp)에서 24시간 접수합니다. 전화・이메일・LINE・WeChat 문의도 24시간 접수하며 보통 2시간 이내에 회신합니다. 예약 확정 연락은 영업시간 10:00~20:00에 드립니다."},
  "対応エリアはどこですか？": {"en": "Which areas do you cover?", "zh": "对应区域是哪里？", "ko": "대응 지역은 어디인가요?"},
  "羽田・成田空港を拠点に、東京・千葉・神奈川・埼玉エリアへ配車可能です。": {"en": "Based at Haneda and Narita airports, we can dispatch vehicles to the Tokyo, Chiba, Kanagawa and Saitama areas.", "zh": "以羽田・成田机场为据点，可派车至东京・千叶・神奈川・埼玉区域。", "ko": "하네다・나리타 공항을 거점으로 도쿄・지바・가나가와・사이타마 지역에 배차 가능합니다."},
  "どの車種を選べますか？": {"en": "Which vehicles can I choose?", "zh": "可以选择哪些车型？", "ko": "어떤 차종을 선택할 수 있나요?"},
  "アルファード/ヴェルファイア、グランエース、ハイエースの高級車3車種からお選びいただけます。": {"en": "You can choose from three premium vehicles: the Alphard/Vellfire, Granace and Hiace.", "zh": "可从埃尔法/威尔法、格瑞维亚、海狮3款高级车中选择。", "ko": "알파드/벨파이어, 그란에이스, 하이에이스의 고급차 3종 중에서 선택하실 수 있습니다."},
  # taxi.html: TaxiService + FAQPage（FAQ の訳は js/i18n.js の taxi.faq.* と同じ文にそろえる）
  "Z&GLOBAL タクシー": {"en": "Z&GLOBAL Taxi", "zh": "Z&GLOBAL 出租车", "ko": "Z&GLOBAL 택시"},
  "タクシー（一般乗用旅客自動車運送事業）": {"en": "Taxi (general passenger vehicle transport business)", "zh": "出租车（一般乘用旅客汽车运输事业）", "ko": "택시 (일반승용여객자동차운송사업)"},
  "成田市": {"en": "Narita", "zh": "成田市", "ko": "나리타시"},
  "タクシーの予約はできますか？": {"en": "Can I book a taxi in advance?", "zh": "可以预约出租车吗？", "ko": "택시를 예약할 수 있나요?"},
  "はい。お電話またはLINEで承ります。ご希望の日時・お迎え場所・行き先・人数をお知らせください。": {"en": "Yes. We accept bookings by phone or LINE. Please tell us the date and time, pickup point, destination and number of passengers.", "zh": "可以。通过电话或LINE受理。请告知希望的日期时间・上车地点・目的地・人数。", "ko": "네. 전화 또는 LINE으로 받습니다. 희망 일시・픽업 장소・목적지・인원을 알려 주세요."},
  "どのエリアで利用できますか？": {"en": "Which areas do you serve?", "zh": "可在哪些区域使用？", "ko": "어느 지역에서 이용할 수 있나요?"},
  "成田空港まで、早朝や深夜でも乗れますか？": {"en": "Can I take a taxi to Narita Airport early in the morning or late at night?", "zh": "清晨或深夜也能乘车去成田机场吗？", "ko": "이른 아침이나 심야에도 나리타 공항까지 탈 수 있나요?"},
  "事前にご予約いただければ承ります。時間が決まっている場合は、前日までのご予約をおすすめします。": {"en": "Yes, with an advance booking. If your time is fixed, we recommend booking by the day before.", "zh": "提前预约即可受理。如时间已确定，建议在前一天之前预约。", "ko": "사전에 예약하시면 받습니다. 시간이 정해져 있다면 전날까지 예약하시기를 권장합니다."},
  "支払い方法は何がありますか？": {"en": "How can I pay?", "zh": "有哪些付款方式？", "ko": "결제 방법은 무엇이 있나요?"},
  "現金でお支払いいただけます。法人のお客様は請求書による後払いもご利用いただけます。そのほかの決済方法は、ご予約時にお問い合わせください。": {"en": "You can pay in cash. Corporate customers can also pay later by invoice. For other payment methods, please ask when you book.", "zh": "可使用现金付款。企业客户也可使用账单后付款。其他付款方式请在预约时咨询。", "ko": "현금으로 결제하실 수 있습니다. 법인 고객은 청구서에 의한 후불도 이용하실 수 있습니다. 그 밖의 결제 방법은 예약 시 문의해 주세요."},
  "外国語で予約できますか？": {"en": "Can I book in a language other than Japanese?", "zh": "可以用外语预约吗？", "ko": "외국어로 예약할 수 있나요?"},
  "英語・中国語・韓国語でもご予約を承ります。お電話・LINEのどちらでもお気軽にどうぞ。": {"en": "Yes. We also take bookings in English, Chinese and Korean, by phone or LINE.", "zh": "也可用英语・中文・韩语预约。电话・LINE均可，欢迎随时联系。", "ko": "영어・중국어・한국어로도 예약을 받습니다. 전화・LINE 어느 쪽이든 편하게 연락 주세요."},
  "車内に忘れ物をしたときは？": {"en": "What if I leave something in the taxi?", "zh": "在车内遗忘物品怎么办？", "ko": "차 안에 물건을 두고 내렸을 때는?"},
  "お電話（0476-29-5498）で、ご乗車の日時・乗った場所と降りた場所・お忘れ物の特徴をお知らせください。": {"en": "Please call us at 0476-29-5498 and tell us the date and time of your ride, where you got on and off, and a description of the item.", "zh": "请致电（0476-29-5498），告知乘车日期时间・上下车地点・遗失物品的特征。", "ko": "전화(0476-29-5498)로 승차 일시・승차한 곳과 내린 곳・분실물의 특징을 알려 주세요."},
  # 2026-11-19 SEO: 会社情報・料金・パンくず・ハイヤーのよくあるご質問
  "羽田・成田の空港送迎を中心とするハイヤー・タクシー会社。アルファード・グランエース・ハイエースで空港送迎・役員送迎・観光チャーター・ゴルフ送迎を行い、成田・印西エリアではタクシーも運行しています。": {"en": "A chauffeur and taxi company focused on Haneda and Narita airport transfers. We provide airport, executive, sightseeing and golf transfers in the Alphard, Granace and Hiace, and run taxis in the Narita and Inzai area.", "zh": "以羽田・成田机场接送为主的包车与出租车公司。使用埃尔法・格瑞维亚・海狮提供机场接送・高管接送・观光包车・高尔夫接送，并在成田・印西地区经营出租车。", "ko": "하네다・나리타 공항 픽업을 중심으로 하는 하이어・택시 회사. 알파드・그란에이스・하이에이스로 공항 픽업・임원 의전・관광 전세・골프 송영을 제공하며, 나리타・인자이 지역에서는 택시도 운행합니다."},
  "千葉県印西市を拠点とするハイヤー・タクシー会社（一般乗用旅客自動車運送事業）。2018年創業。": {"en": "A chauffeur and taxi company based in Inzai, Chiba (general passenger vehicle transport business), founded in 2018.", "zh": "以千叶县印西市为据点的包车・出租车公司（一般乘用旅客汽车运输事业），2018年成立。", "ko": "지바현 인자이시를 거점으로 하는 하이어・택시 회사(일반승용여객자동차운송사업). 2018년 창업."},
  "空港送迎（ハイヤー）": {"en": "Airport Transfers (Chauffeur)", "zh": "机场接送（包车）", "ko": "공항 픽업 (하이어)"},
  "観光チャーター（1日）": {"en": "Sightseeing Charter (1 day)", "zh": "观光包车（1天）", "ko": "관광 전세 (1일)"},
  "役員送迎（月極）": {"en": "Executive Transport (monthly plan)", "zh": "高管接送（月租）", "ko": "임원 의전 (월정액)"},
  "ハイヤー車両と目安料金": {"en": "Chauffeur Vehicles and Guide Prices", "zh": "包车车辆与参考价格", "ko": "하이어 차량과 기준 요금"},
  "アルファード / ヴェルファイア（最大7名・スーツケース3個）": {"en": "Alphard / Vellfire (up to 7 passengers, 3 suitcases)", "zh": "埃尔法 / 威尔法（最多7人・行李箱3个）", "ko": "알파드 / 벨파이어 (최대 7명・여행 가방 3개)"},
  "グランエース（最大6名・スーツケース4個）": {"en": "Granace (up to 6 passengers, 4 suitcases)", "zh": "格瑞维亚（最多6人・行李箱4个）", "ko": "그란에이스 (최대 6명・여행 가방 4개)"},
  "ハイエース（最大10名・スーツケース8個）": {"en": "Hiace (up to 10 passengers, 8 suitcases)", "zh": "海狮（最多10人・行李箱8个）", "ko": "하이에이스 (최대 10명・여행 가방 8개)"},
  "ホーム": {"en": "Home", "zh": "首页", "ko": "홈"},
  "会社概要": {"en": "About", "zh": "公司介绍", "ko": "회사소개"},
  "サービス": {"en": "Services", "zh": "服务", "ko": "서비스"},
  "車両ラインナップ": {"en": "Fleet", "zh": "车辆阵容", "ko": "차량 라인업"},
  "お問い合わせ": {"en": "Contact", "zh": "联系我们", "ko": "문의하기"},
  "タクシー": {"en": "Taxi", "zh": "出租车", "ko": "택시"},
  "空港送迎の料金はいくらですか？": {"en": "How much does an airport transfer cost?", "zh": "机场接送的费用是多少？", "ko": "공항 송영 요금은 얼마인가요?"},
  "アルファードで¥35,000〜が目安です（羽田・成田⇔都内ホテル）。グランエースは¥42,000〜、ハイエースは¥48,000〜。深夜（22:00〜5:00）は20%増し、高速代は別途です。正確な金額はお見積もりでご案内します。": {"en": "As a guide, an Alphard starts from ¥35,000 (Haneda or Narita to a hotel in central Tokyo). A Granace starts from ¥42,000 and a Hiace from ¥48,000. A 20% surcharge applies late at night (22:00-5:00), and highway tolls are extra. We will give you an exact price in a quote.", "zh": "参考价格：埃尔法 ¥35,000起（羽田・成田⇔东京市内酒店）。格瑞维亚 ¥42,000起，海狮 ¥48,000起。深夜（22:00〜5:00）加收20%，高速费另计。准确金额将通过报价告知。", "ko": "알파드 기준 ¥35,000~입니다(하네다・나리타⇔도쿄 시내 호텔). 그란에이스는 ¥42,000~, 하이에이스는 ¥48,000~. 심야(22:00~5:00)는 20% 할증, 고속도로 요금은 별도입니다. 정확한 금액은 견적으로 안내해 드립니다."},
  "フライトが遅れたら、待機料金はかかりますか？": {"en": "Will I pay waiting fees if my flight is delayed?", "zh": "航班延误会产生等候费吗？", "ko": "항공편이 지연되면 대기 요금이 드나요?"},
  "到着後90分までは待機料金はかかりません。フライトの遅延も追跡しますので、ご安心ください。": {"en": "No. Waiting is free for up to 90 minutes after arrival, and we track your flight for delays.", "zh": "抵达后90分钟内不收取等候费。我们也会追踪航班延误情况，请放心。", "ko": "도착 후 90분까지는 대기 요금이 들지 않습니다. 항공편 지연도 추적하므로 안심하세요."},
  "どこまで送迎できますか？": {"en": "Where can you take me?", "zh": "可以接送到哪里？", "ko": "어디까지 송영할 수 있나요?"},
  "羽田空港・成田空港を拠点に、東京・千葉・神奈川・埼玉へ送迎します。富士山・箱根・鎌倉・日光などへの観光チャーターも承ります。": {"en": "Based at Haneda and Narita airports, we serve Tokyo, Chiba, Kanagawa and Saitama. We also run sightseeing charters to Mt. Fuji, Hakone, Kamakura, Nikko and more.", "zh": "以羽田・成田机场为据点，接送范围覆盖东京・千叶・神奈川・埼玉。也承接前往富士山・箱根・镰仓・日光等地的观光包车。", "ko": "하네다・나리타 공항을 거점으로 도쿄・지바・가나가와・사이타마로 송영합니다. 후지산・하코네・가마쿠라・닛코 등 관광 전세도 받습니다."},
  "予約と支払いの方法は？": {"en": "How do I book and pay?", "zh": "如何预约和付款？", "ko": "예약과 결제 방법은?"},
  "予約サイトから24時間お申し込みいただけます（お電話・LINE・メールも可）。お支払いは、お送りする決済リンクからクレジットカード・PayPay・お振込みで承ります。": {"en": "Book any time, 24 hours a day, on our reservation site (or by phone, LINE or email). Pay by credit card, PayPay or bank transfer through the payment link we send you.", "zh": "可通过预约网站24小时申请（也可通过电话・LINE・邮件）。付款可通过我们发送的付款链接，使用信用卡・PayPay・银行转账。", "ko": "예약 사이트에서 24시간 신청하실 수 있습니다(전화・LINE・이메일도 가능). 결제는 보내 드리는 결제 링크로 신용카드・PayPay・계좌이체로 받습니다."},
  "観光チャーターの料金は？": {"en": "How much is a sightseeing charter?", "zh": "观光包车的费用是多少？", "ko": "관광 전세 요금은?"},
  "1日（8時間・100kmまで）で¥85,000〜が目安です。行き先と行程に合わせてお見積もりします。": {"en": "A full day (up to 8 hours and 100 km) starts from ¥85,000 as a guide. We will quote based on your destinations and itinerary.", "zh": "1天（8小时・100公里以内）参考价格 ¥85,000起。将根据目的地与行程为您报价。", "ko": "1일(8시간・100km까지) 기준 ¥85,000~입니다. 목적지와 일정에 맞춰 견적해 드립니다."},
  "法人で定期的に利用できますか？": {"en": "Can companies use you on a regular basis?", "zh": "企业可以定期使用吗？", "ko": "법인이 정기적으로 이용할 수 있나요?"},
  "役員送迎の月極プラン（月8回まで定額）を¥240,000/月〜でご用意しています。インボイス対応の請求書を月ごとにまとめて発行します。": {"en": "Yes. Our monthly executive plan (flat rate for up to 8 rides a month) starts from ¥240,000 per month, with one invoice per month that meets Japan's qualified invoice requirements.", "zh": "我们提供高管接送月租方案（每月8次以内定额），¥240,000/月起。每月汇总开具符合日本发票制度的账单。", "ko": "임원 의전 월정액 플랜(월 8회까지 정액)을 ¥240,000/월~로 준비하고 있습니다. 인보이스 대응 청구서를 매월 모아서 발행합니다."},
  "成田市・印西市を中心とする北総交通圏が営業区域です（千葉ニュータウン中央駅・印西牧の原駅・木下駅・成田駅などからのお迎えも承ります）。区域内から東京方面や羽田空港など、区域外への移動にもご利用いただけます。": {"en": "Our service area is the Hokuso traffic zone, centred on Narita and Inzai (we also pick up at stations such as Chiba New Town Chuo, Inzai-Makinohara, Kioroshi and Narita). You can also ride from within the zone to destinations outside it, such as central Tokyo or Haneda Airport.", "zh": "营业区域为以成田市・印西市为中心的北总交通圈（也可在千叶新城中央站・印西牧之原站・木下站・成田站等地接您）。也可从区域内前往东京方向或羽田机场等区域外目的地。", "ko": "나리타시・인자이시를 중심으로 하는 호쿠소 교통권이 영업 구역입니다(지바 뉴타운 주오역・인자이 마키노하라역・기오로시역・나리타역 등에서의 픽업도 가능합니다). 구역 내에서 도쿄 방면이나 하네다 공항 등 구역 밖으로의 이동에도 이용하실 수 있습니다."},
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
    """内部ページリンク(index/about/services/fleet/contact/taxi.html)を /{lang}/... の絶対パスに。
    末尾スラッシュ有無に依存せず同一言語内で正しく遷移させるため。#アンカーやクエリも保持。"""
    return re.sub(r'href="(index|about|services|fleet|contact|taxi)\.html',
                  lambda m: f'href="/{lang}/{m.group(1)}.html', h)


def set_captcha_lang(h, lang):
    """hCaptcha ウィジェットの表示言語(data-hl)を生成先の言語に合わせる。
    body は ja から複製されるため、明示しないと data-hl="ja" のまま残る(再生成で言語別設定が消える)。"""
    return h.replace('data-hl="ja"', f'data-hl="{lang}"')


def localize_ld_urls(block, lang):
    """JSON-LD 内のページ URL（xxx.html と、パンくずのホーム）をその言語の URL にする。
    会社の url・@id（https://www.z-global.jp/ と #organization）はそのまま。"""
    block = re.sub(r'"https://www\.z-global\.jp/(index|about|services|fleet|contact|taxi)\.html"',
                   lambda m: '"' + page_url(m.group(1) + ".html", lang) + '"', block)
    return block.replace('"item": "https://www.z-global.jp/"', '"item": "' + page_url("index.html", lang) + '"')


def translate_ld(h, lang):
    """head 内 JSON-LD（構造化データ）の本文文字列を lang へ翻訳。
    JSON 値（"..."）の完全一致置換のため部分語の誤爆なし。改行構造はそのまま保つ。
    JSON-LD を持たないページ（about/fleet）では re.sub が非マッチで no-op。"""
    def repl(m):
        block = m.group(0)
        for ja, tr in LD_TR.items():
            block = block.replace(f'"{ja}"', f'"{tr[lang]}"')
        return localize_ld_urls(block, lang)
    return re.sub(r'<script type="application/ld\+json">.*?</script>', repl, h, count=1, flags=re.S)


# ---- 本文の訳を HTML に書き込む（2026-11-19 追加）----
# AI 検索のクローラー（GPTBot・ClaudeBot・PerplexityBot など）の多くは JavaScript を動かさない。
# i18n.js が画面で訳すだけだと、/en /zh /ko の本文が日本語のまま読まれるので、生成時に訳を入れておく。
# 安全のため「元の HTML の中身が DICT の ja と同じ要素」だけを置き換える（違う要素は今までどおり画面で訳す）。
import html as _html, json as _json, subprocess as _sp

_DICT_CACHE = None


def load_i18n_dict():
    """js/i18n.js の DICT を node で読み出す。node が無ければ None（本文の書き込みを省く）。"""
    global _DICT_CACHE
    if _DICT_CACHE is not None:
        return _DICT_CACHE
    js = os.path.abspath(os.path.join(ROOT, "js", "i18n.js"))
    stub = ("global.window={};global.document={readyState:'complete',querySelectorAll:()=>[],"
            "documentElement:{},body:{getAttribute:()=>null}};global.localStorage={getItem:()=>null,setItem:()=>{}};"
            "global.location={pathname:'/'};global.navigator={language:'ja'};require(process.argv[1]);"
            "process.stdout.write(JSON.stringify(window.ZGLOBAL_I18N.DICT));")
    try:
        out = _sp.run(["node", "-e", stub, js], capture_output=True, check=True).stdout
        _DICT_CACHE = _json.loads(out.decode("utf-8"))
    except Exception as e:  # node が無い環境
        print("  WARN: i18n.js を読めないため本文の訳の書き込みを省略:", e)
        _DICT_CACHE = {}
    return _DICT_CACHE


_I18N_EL = re.compile(r'<(?P<tag>[a-zA-Z][a-zA-Z0-9]*)(?P<attrs>[^<>]*?\sdata-i18n="(?P<key>[^"]+)"[^<>]*)>(?P<inner>.*?)</(?P=tag)>', re.S)


def _norm(s):
    return re.sub(r"\s+", " ", re.sub(r"<br\s*/?>", "<br>", s, flags=re.I)).replace("&amp;", "&").strip()


def prerender_i18n(h, lang):
    D = load_i18n_dict()
    if not D:
        return h, 0, 0
    head, sep, body = h.partition("</head>")
    done = skipped = 0

    def repl(m):
        nonlocal done, skipped
        d = D.get(m.group("key"))
        if not d or d.get(lang) is None or d.get("ja") is None:
            return m.group(0)
        if _norm(m.group("inner")) != _norm(d["ja"]):
            skipped += 1
            return m.group(0)
        v = d[lang]
        inner = v if re.search(r"<[a-z][\s\S]*>", v, re.I) else _html.escape(v, quote=False)
        done += 1
        return f'<{m.group("tag")}{m.group("attrs")}>{inner}</{m.group("tag")}>'

    body = _I18N_EL.sub(repl, body)
    return head + sep + body, done, skipped


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
    h = set_meta(h, 'name="keywords"', KEYWORDS[page][lang])
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
    h, n_done, n_skip = prerender_i18n(h, lang)
    outdir = os.path.join(ROOT, lang)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, page), "w", encoding="utf-8", newline="") as f:
        f.write(h)
    print(f"  generated {lang}/{page}（本文の訳 {n_done} 件、画面で訳す {n_skip} 件）")


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
