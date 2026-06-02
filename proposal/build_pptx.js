// Z&GLOBAL株式会社 HPリニューアル提案書
// pptxgenjs で作成

const path = require('path');
const NM = 'C:\\Users\\FLYSRV01\\AppData\\Roaming\\npm\\node_modules';
const pptxgen = require(path.join(NM, 'pptxgenjs'));
const React = require(path.join(NM, 'react'));
const ReactDOMServer = require(path.join(NM, 'react-dom/server'));
const sharp = require(path.join(NM, 'sharp'));
const FA = require(path.join(NM, 'react-icons/fa'));

// ---------- 色定義 (Premium Navy + Champagne Gold) ----------
const C = {
  navy:      '0F1F3D', // 深紺
  navyLight: '1E3A6A',
  gold:      'C9A961', // シャンパンゴールド
  goldDk:    'A8893E',
  cream:     'F7F3EA', // 温かいクリーム
  paper:     'FAF8F3',
  white:     'FFFFFF',
  ink:       '1F2937', // 本文濃灰
  gray:      '6B7280',
  grayLine:  'D1D5DB',
  red:       'B0413E', // 警告用
  green:     '3E6F5C',
};

// ---------- フォント (Windows 標準を想定) ----------
const F = {
  serif: 'Yu Mincho',     // 游明朝 (見出し・タイトル)
  sans:  'Yu Gothic UI',  // 游ゴシックUI (本文)
  num:   'Georgia',       // 数字強調用
};

// ---------- アイコン生成 ----------
async function ico(IconComponent, color = '#C9A961', size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + png.toString('base64');
}

// shadow helper - 毎回新しいオブジェクトを返す
const sh = (op = 0.12, blur = 8, offset = 3) => ({
  type: 'outer', color: '000000', blur, offset, angle: 90, opacity: op
});

(async () => {

let pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';  // 13.3" x 7.5"
pres.author = 'Web Design Partner';
pres.title = 'Z&GLOBAL HPリニューアル提案書';
const W = 13.333, H = 7.5;

// ---------- 共通ヘルパー: 章扉ヘッダーバー (細・タイトル小) ----------
function pageHeader(slide, sectionNo, sectionTitle) {
  // 左肩のセクション番号 (Georgia 数字)
  slide.addText(String(sectionNo).padStart(2, '0'), {
    x: 0.6, y: 0.35, w: 1.0, h: 0.5,
    fontFace: F.num, fontSize: 28, color: C.gold, bold: true, margin: 0
  });
  // 縦線
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.55, y: 0.42, w: 0.02, h: 0.45,
    fill: { color: C.gold }, line: { color: C.gold }
  });
  // タイトル
  slide.addText(sectionTitle, {
    x: 1.75, y: 0.4, w: 10.5, h: 0.5,
    fontFace: F.serif, fontSize: 22, color: C.navy, bold: true, margin: 0,
    valign: 'middle'
  });
  // フッターのドキュメント名
  slide.addText('HPリニューアルご提案 / Z&GLOBAL株式会社 御中', {
    x: 0.6, y: 7.05, w: 8, h: 0.3,
    fontFace: F.sans, fontSize: 9, color: C.gray, margin: 0
  });
  slide.addText('v1.0 / 2026-05-20', {
    x: W - 2.5, y: 7.05, w: 1.9, h: 0.3,
    fontFace: F.num, fontSize: 9, color: C.gray, align: 'right', margin: 0
  });
}

// =========================================================
// Slide 1 :: 表紙
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };

  // 装飾: 右下に大きなゴールドの細い斜め線群 (手作り感)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.5, y: 0, w: 0.04, h: H, fill: { color: C.gold, transparency: 30 }, line: { color: C.gold, transparency: 30 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.2, y: 0, w: 0.015, h: H, fill: { color: C.gold, transparency: 60 }, line: { color: C.gold, transparency: 60 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.65, y: 0, w: 0.015, h: H, fill: { color: C.gold, transparency: 75 }, line: { color: C.gold, transparency: 75 }
  });

  // 左肩: 小タグ "Web Renewal Proposal"
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 0.85, w: 0.4, h: 0.02, fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText('PROPOSAL  /  2026.05', {
    x: 0.8, y: 0.95, w: 6, h: 0.35,
    fontFace: F.num, fontSize: 12, color: C.gold, charSpacing: 4, margin: 0
  });

  // 宛名
  s.addText('Z&GLOBAL 株式会社  御中', {
    x: 0.8, y: 1.45, w: 11, h: 0.5,
    fontFace: F.sans, fontSize: 16, color: 'CADCFC', margin: 0
  });

  // メインタイトル
  s.addText('ホームページ', {
    x: 0.8, y: 2.15, w: 11, h: 1.0,
    fontFace: F.serif, fontSize: 52, color: C.white, bold: true, margin: 0
  });
  s.addText('リニューアル ご提案', {
    x: 0.8, y: 3.1, w: 11, h: 1.0,
    fontFace: F.serif, fontSize: 52, color: C.white, bold: true, margin: 0
  });

  // サブタイトル (英語)
  s.addText([
    { text: 'Z&GLOBAL  Website Renewal Proposal', options: { color: C.gold, charSpacing: 2 } },
  ], {
    x: 0.8, y: 4.25, w: 11, h: 0.4,
    fontFace: F.num, fontSize: 14, italic: true, margin: 0
  });

  // タグライン
  s.addText('— 高級ハイヤーに、ふさわしい一枚を。', {
    x: 0.8, y: 4.8, w: 11, h: 0.4,
    fontFace: F.serif, fontSize: 18, color: 'CADCFC', margin: 0
  });

  // 提案先・提案元情報
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 6.0, w: 4, h: 0.02, fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText([
    { text: '提案者  ', options: { color: 'A8B3D0', fontSize: 10 } },
    { text: 'FLY株式会社  ', options: { color: C.white, fontSize: 13 } },
    { text: 'Your Vision, Our Wings.', options: { color: C.gold, fontSize: 10, italic: true, breakLine: true } },
    { text: '担当  ', options: { color: 'A8B3D0', fontSize: 10 } },
    { text: '院 光雄  /  eigyo@fly-japan.jp  /  03-6674-2802', options: { color: C.white, fontSize: 12 } },
  ], {
    x: 0.8, y: 6.15, w: 9, h: 1.1,
    fontFace: F.sans, margin: 0
  });

  // 右下にバージョン
  s.addText('v1.0  /  2026-05-20', {
    x: W - 2.6, y: H - 0.5, w: 2.2, h: 0.3,
    fontFace: F.num, fontSize: 10, color: C.gold, align: 'right', margin: 0
  });
}

// =========================================================
// Slide 2 :: 結論ファースト (1枚で全体像)
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };

  // ヘッダー (章番号無しの「結論」スライド)
  s.addText('結論を先に', {
    x: 0.6, y: 0.4, w: 8, h: 0.4,
    fontFace: F.num, fontSize: 11, color: C.gold, charSpacing: 4, bold: true, margin: 0
  });
  s.addText('現サイトを「高級ハイヤーにふさわしい一枚」へ。', {
    x: 0.6, y: 0.8, w: 12, h: 0.7,
    fontFace: F.serif, fontSize: 26, color: C.navy, bold: true, margin: 0
  });
  s.addText('3ヶ月 / 税込 198 万円〜 / インバウンド予約導線を最重要KPIに。', {
    x: 0.6, y: 1.55, w: 12, h: 0.5,
    fontFace: F.sans, fontSize: 14, color: C.ink, margin: 0
  });

  // 3カラム結論カード: 金額 / スケジュール / 体制
  const cards = [
    { label: '金額',         num: '198',  unit: '万円〜',   sub: '基本パッケージ・税込\n機能追加は別途お見積り' },
    { label: 'スケジュール', num: '3',    unit: 'ヶ月',     sub: '2026/06 着手 → 09 公開\n2 週間のバッファ込み' },
    { label: '体制',         num: '5',    unit: '名',       sub: 'PM / デザイナー / フロント\nバックエンド / 多言語QA' },
  ];
  cards.forEach((c, i) => {
    const x = 0.6 + i * 4.15;
    const y = 2.3;
    const w = 3.95, h = 3.4;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.white },
      line: { color: C.grayLine, width: 0.5 },
      shadow: sh(0.08, 12, 4),
    });
    // 上部ゴールドの細いアクセント
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.08,
      fill: { color: C.gold }, line: { color: C.gold }
    });
    s.addText(c.label, {
      x: x + 0.4, y: y + 0.35, w: w - 0.8, h: 0.4,
      fontFace: F.sans, fontSize: 13, color: C.gray, charSpacing: 2, margin: 0
    });
    // 大きな数字
    s.addText([
      { text: c.num, options: { fontFace: F.num, fontSize: 84, color: C.navy, bold: true } },
      { text: '  ' + c.unit, options: { fontFace: F.sans, fontSize: 18, color: C.navy } },
    ], {
      x: x + 0.4, y: y + 0.85, w: w - 0.8, h: 1.5, margin: 0, valign: 'top'
    });
    s.addText(c.sub, {
      x: x + 0.4, y: y + 2.45, w: w - 0.8, h: 0.85,
      fontFace: F.sans, fontSize: 11.5, color: C.ink, margin: 0
    });
  });

  // KPI ボックス (一行)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 6.0, w: 12.15, h: 0.95,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  s.addText([
    { text: '最重要KPI    ', options: { color: C.gold, fontSize: 11, charSpacing: 3, bold: true } },
    { text: 'インバウンド経由のオンライン予約数  ', options: { color: C.white, fontSize: 18, bold: true } },
    { text: '月 0件 → 月 30件 を 6ヶ月以内に。', options: { color: 'CADCFC', fontSize: 14 } },
  ], {
    x: 0.95, y: 6.0, w: 11.5, h: 0.95,
    fontFace: F.sans, margin: 0, valign: 'middle'
  });

  // バージョン
  s.addText('v1.0 / 2026-05-20', {
    x: W - 2.5, y: 7.15, w: 1.9, h: 0.3,
    fontFace: F.num, fontSize: 9, color: C.gray, align: 'right', margin: 0
  });
}

// =========================================================
// Slide 3 :: ご相談頂いた経緯 (ストーリー導入)
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.cream };
  pageHeader(s, 1, 'ご相談頂いた経緯');

  // 左: 引用テキスト
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.4, w: 0.05, h: 4.0,
    fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText([
    { text: '「中華圏のお客様からの予約が増えているのに、サイトからは取れない。\n  LINEで個別対応するのも限界です。」', options: { italic: true, color: C.navy, fontSize: 20 } },
  ], {
    x: 0.9, y: 1.4, w: 7.0, h: 1.8,
    fontFace: F.serif, margin: 0
  });
  s.addText('— 2026年4月 / 趙代表様との打ち合わせメモより', {
    x: 0.9, y: 3.3, w: 7.0, h: 0.4,
    fontFace: F.sans, fontSize: 11, color: C.gray, margin: 0
  });

  // 続きのストーリー本文
  s.addText([
    { text: '現サイトは「会社案内パンフレット」として一定の役割を果たしています。', options: { breakLine: true } },
    { text: '一方、', options: {} },
    { text: '羽田・成田空港の利用客の30%以上がインバウンド', options: { bold: true, color: C.navy } },
    { text: 'に戻ってきた今、', options: { breakLine: true } },
    { text: 'サイトを「受注の入口」に作り替えることで、御社の事業成長を後押しできると考えました。', options: {} },
  ], {
    x: 0.9, y: 3.85, w: 7.0, h: 2.0,
    fontFace: F.sans, fontSize: 13, color: C.ink, margin: 0,
    paraSpaceAfter: 6
  });

  // 右: ハイライト3つ (シンプル縦並び)
  const points = [
    { tag: '今 ', txt: 'お問い合わせ = LINE / 電話のみ' },
    { tag: '次 ', txt: 'オンライン予約 + LINE + 電話' },
    { tag: '結 ', txt: '深夜・休日でも機会損失ゼロ' },
  ];
  points.forEach((p, i) => {
    const y = 1.55 + i * 1.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.4, y, w: 4.3, h: 1.3,
      fill: { color: C.white },
      line: { color: C.grayLine, width: 0.5 }
    });
    s.addText(p.tag, {
      x: 8.55, y: y + 0.15, w: 0.7, h: 0.4,
      fontFace: F.num, fontSize: 22, color: C.gold, bold: true, margin: 0
    });
    s.addText(p.txt, {
      x: 9.25, y: y + 0.3, w: 3.3, h: 0.8,
      fontFace: F.sans, fontSize: 13, color: C.ink, margin: 0, valign: 'middle'
    });
  });
}

// =========================================================
// Slide 4 :: 現状サイトの課題分析
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 2, '現状サイトの課題分析');

  s.addText('実際に www.z-global.jp を 2026/05/20 に診断した結果', {
    x: 0.6, y: 1.0, w: 12, h: 0.35,
    fontFace: F.sans, fontSize: 11, color: C.gray, margin: 0
  });

  // 6つの課題カード (3x2 グリッド)
  const issues = [
    { sev: '重大', no: '01', title: 'SSL証明書の不一致', body: 'https://www.z-global.jp で証明書のホスト名エラー。Chrome / Safari で「保護されていません」表示 → 信頼性低下。' },
    { sev: '重大', no: '02', title: '/services/ が 404', body: 'フッターから辿れる「Services」が「このページは存在しないようです」を返す。SEO・UX 両面でマイナス。' },
    { sev: '重要', no: '03', title: 'オンライン予約導線なし', body: '受注は LINE / 電話 / メール のみ。海外旅行客は LINE 未導入が多く、現地予約のハードルが高い。' },
    { sev: '重要', no: '04', title: '多言語ページの薄さ', body: '中文 / English の切替リンクはあるが翻訳ページの粒度が不揃い。インバウンド SEO の機会損失。' },
    { sev: '中',   no: '05', title: 'デザインのテンプレ感', body: 'WordPress + Elementor 標準テーマの色味のまま。「高級ハイヤー」の世界観表現が不足。' },
    { sev: '中',   no: '06', title: 'スマホ最適化の余地', body: '主要 CTA (LINE / 電話) はあるが、車種比較・料金確認・予約フォームのモバイル UX に改善余地。' },
  ];
  const sevColor = { '重大': C.red, '重要': C.goldDk, '中': C.gray };
  issues.forEach((it, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 4.15;
    const y = 1.5 + row * 2.65;
    const w = 3.95, h = 2.45;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.white },
      line: { color: C.grayLine, width: 0.5 },
      shadow: sh(0.06, 6, 2),
    });
    // 重要度バッジ
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.32,
      fill: { color: sevColor[it.sev] }, line: { color: sevColor[it.sev] }
    });
    s.addText(it.sev, {
      x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.32,
      fontFace: F.sans, fontSize: 10, color: C.white, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
    // 番号
    s.addText(it.no, {
      x: x + w - 0.85, y: y + 0.2, w: 0.7, h: 0.5,
      fontFace: F.num, fontSize: 22, color: C.gold, bold: true, align: 'right', margin: 0
    });
    // タイトル
    s.addText(it.title, {
      x: x + 0.3, y: y + 0.75, w: w - 0.6, h: 0.5,
      fontFace: F.serif, fontSize: 15, color: C.navy, bold: true, margin: 0
    });
    // 本文
    s.addText(it.body, {
      x: x + 0.3, y: y + 1.3, w: w - 0.6, h: 1.0,
      fontFace: F.sans, fontSize: 10.5, color: C.ink, margin: 0
    });
  });
}

// =========================================================
// Slide 5 :: 悩みどころ - A案 / B案 の比較 (検討過程の見える化)
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 3, '悩みどころ ─ A案 / B案 で迷いました');

  s.addText('「予算を抑える部分改修」か「事業の入口として再設計」か。', {
    x: 0.6, y: 1.0, w: 12, h: 0.45,
    fontFace: F.serif, fontSize: 18, color: C.navy, margin: 0
  });
  s.addText('社内で議論の末、御社のフェーズと事業戦略を踏まえて B案を推奨します。', {
    x: 0.6, y: 1.5, w: 12, h: 0.35,
    fontFace: F.sans, fontSize: 12, color: C.gray, margin: 0
  });

  // A案カード
  const ax = 0.6, ay = 2.1, aw = 5.95, ah = 4.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: ax, y: ay, w: aw, h: ah,
    fill: { color: C.white }, line: { color: C.grayLine, width: 0.5 }
  });
  s.addText('A 案 ', {
    x: ax + 0.35, y: ay + 0.3, w: 1.5, h: 0.45,
    fontFace: F.num, fontSize: 28, color: C.gray, bold: true, margin: 0
  });
  s.addText('部分改修 (見た目だけ作り替え)', {
    x: ax + 0.35, y: ay + 0.85, w: aw - 0.7, h: 0.4,
    fontFace: F.serif, fontSize: 16, color: C.ink, margin: 0
  });
  s.addText([
    { text: '○ ', options: { color: C.green, bold: true } }, { text: 'コスト 80 万円程度 / 6 週間', options: { breakLine: true } },
    { text: '○ ', options: { color: C.green, bold: true } }, { text: '既存 WordPress を活かせる', options: { breakLine: true } },
    { text: '✗ ', options: { color: C.red, bold: true } }, { text: 'オンライン予約は別途実装が必要', options: { breakLine: true } },
    { text: '✗ ', options: { color: C.red, bold: true } }, { text: '多言語SEOは構造改修が無いと伸びない', options: { breakLine: true } },
    { text: '✗ ', options: { color: C.red, bold: true } }, { text: '2年後にもう一度フルリニューアルの可能性', options: {} },
  ], {
    x: ax + 0.35, y: ay + 1.4, w: aw - 0.7, h: 3.0,
    fontFace: F.sans, fontSize: 12.5, color: C.ink, margin: 0,
    paraSpaceAfter: 6
  });
  // 結論バンド
  s.addShape(pres.shapes.RECTANGLE, {
    x: ax, y: ay + ah - 0.55, w: aw, h: 0.55,
    fill: { color: 'EEEEEE' }, line: { color: 'EEEEEE' }
  });
  s.addText('結論: 緊急の SSL ・404 だけ直すなら可。', {
    x: ax + 0.35, y: ay + ah - 0.55, w: aw - 0.7, h: 0.55,
    fontFace: F.sans, fontSize: 11.5, color: C.gray, margin: 0, valign: 'middle'
  });

  // B案カード (推奨)
  const bx = 6.75, by = 2.1, bw = 5.95, bh = 4.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: bx, y: by, w: bw, h: bh,
    fill: { color: C.navy }, line: { color: C.navy },
    shadow: sh(0.18, 14, 6)
  });
  // 推奨バッジ
  s.addShape(pres.shapes.RECTANGLE, {
    x: bx + bw - 1.6, y: by - 0.2, w: 1.4, h: 0.45,
    fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText('★ 推奨', {
    x: bx + bw - 1.6, y: by - 0.2, w: 1.4, h: 0.45,
    fontFace: F.sans, fontSize: 12, color: C.navy, bold: true,
    align: 'center', valign: 'middle', margin: 0
  });
  s.addText('B 案 ', {
    x: bx + 0.35, y: by + 0.3, w: 1.5, h: 0.45,
    fontFace: F.num, fontSize: 28, color: C.gold, bold: true, margin: 0
  });
  s.addText('受注の入口として再設計', {
    x: bx + 0.35, y: by + 0.85, w: bw - 0.7, h: 0.4,
    fontFace: F.serif, fontSize: 16, color: C.white, margin: 0
  });
  s.addText([
    { text: '○ ', options: { color: C.gold, bold: true } }, { text: 'オンライン予約 + 決済 (Stripe) 標準搭載', options: { color: C.white, breakLine: true } },
    { text: '○ ', options: { color: C.gold, bold: true } }, { text: '日 / 英 / 簡体字を「同じ構造」で運用', options: { color: C.white, breakLine: true } },
    { text: '○ ', options: { color: C.gold, bold: true } }, { text: 'CMS で車両・料金・空き状況を自社更新', options: { color: C.white, breakLine: true } },
    { text: '○ ', options: { color: C.gold, bold: true } }, { text: 'Lighthouse 90+ / SEO スコア大幅改善', options: { color: C.white, breakLine: true } },
    { text: '△ ', options: { color: C.gold, bold: true } }, { text: '初期費用は A 案の 2.5 倍 / 期間は +6 週', options: { color: 'CADCFC' } },
  ], {
    x: bx + 0.35, y: by + 1.4, w: bw - 0.7, h: 3.0,
    fontFace: F.sans, fontSize: 12.5, margin: 0,
    paraSpaceAfter: 6
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: bx, y: by + bh - 0.55, w: bw, h: 0.55,
    fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText('結論: 3年間の運用で見ると、B案の方が ROI が高い。', {
    x: bx + 0.35, y: by + bh - 0.55, w: bw - 0.7, h: 0.55,
    fontFace: F.sans, fontSize: 12, color: C.navy, bold: true, margin: 0, valign: 'middle'
  });
}

// =========================================================
// Slide 6 :: リニューアル方針 (3 つのコンセプト)
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 4, 'リニューアル 3 つの方針');

  s.addText('高級ハイヤーに、ふさわしい一枚を。', {
    x: 0.6, y: 1.0, w: 12, h: 0.5,
    fontFace: F.serif, fontSize: 22, color: C.navy, bold: true, margin: 0
  });

  // 3つの方針 - 縦長カード横並び
  const concepts = [
    {
      no: '01',
      en: 'Trust',
      jp: '信頼',
      tag: '一目で「高級ハイヤー」と分かる',
      pts: [
        'ダーク基調 + ゴールドの世界観',
        '実車両・実乗務員の写真起用',
        'お客様事例を匿名でも数字で見せる',
      ],
    },
    {
      no: '02',
      en: 'Convert',
      jp: '受注',
      tag: '深夜でも、海外からでも、予約が入る',
      pts: [
        'オンライン予約 + Stripe 決済',
        'LINE 予約 / 電話 / フォーム の3導線',
        '料金シミュレータ (空港→ホテル)',
      ],
    },
    {
      no: '03',
      en: 'Global',
      jp: '多言語',
      tag: 'インバウンドに、母国語で届ける',
      pts: [
        '日 / 英 / 簡体字 / 繁体字 4 言語',
        '言語別 hreflang ・ 構造化データ',
        '微信・小紅書 シェア OG 画像',
      ],
    },
  ];
  concepts.forEach((c, i) => {
    const x = 0.6 + i * 4.15;
    const y = 1.7;
    const w = 3.95, h = 5.0;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.white }, line: { color: C.grayLine, width: 0.5 },
      shadow: sh(0.08, 10, 3)
    });
    // 上部navyヘッダー
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 1.4,
      fill: { color: C.navy }, line: { color: C.navy }
    });
    // No
    s.addText(c.no, {
      x: x + 0.3, y: y + 0.2, w: 1.0, h: 0.4,
      fontFace: F.num, fontSize: 18, color: C.gold, bold: true, margin: 0
    });
    // EN
    s.addText(c.en, {
      x: x + 0.3, y: y + 0.55, w: w - 0.6, h: 0.5,
      fontFace: F.serif, fontSize: 26, color: C.white, italic: true, margin: 0
    });
    // JP
    s.addText(c.jp, {
      x: x + 0.3, y: y + 0.95, w: w - 0.6, h: 0.4,
      fontFace: F.sans, fontSize: 13, color: 'CADCFC', margin: 0
    });
    // タグライン
    s.addText(c.tag, {
      x: x + 0.3, y: y + 1.55, w: w - 0.6, h: 0.7,
      fontFace: F.serif, fontSize: 14, color: C.navy, bold: true, margin: 0
    });
    // ポイント
    s.addText(
      c.pts.map((p, k) => ({
        text: p,
        options: { bullet: { code: '25A0' }, color: C.ink, breakLine: k < c.pts.length - 1 }
      })),
      {
        x: x + 0.3, y: y + 2.4, w: w - 0.6, h: 2.4,
        fontFace: F.sans, fontSize: 12, margin: 0,
        paraSpaceAfter: 6
      }
    );
  });
}

// =========================================================
// Slide 7 :: 新サイトマップ案
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 5, '新サイトマップ案');

  s.addText('全 17 ページ / 4 言語 = 68 ページを CMS で 1 元管理', {
    x: 0.6, y: 1.0, w: 12, h: 0.4,
    fontFace: F.sans, fontSize: 12, color: C.gray, margin: 0
  });

  // 中央のトップノード
  const cx = W / 2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx - 1.2, y: 1.6, w: 2.4, h: 0.7,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  s.addText('TOP', {
    x: cx - 1.2, y: 1.6, w: 2.4, h: 0.7,
    fontFace: F.num, fontSize: 16, color: C.white, bold: true,
    align: 'center', valign: 'middle', margin: 0
  });

  // 第二階層 (5本)
  const sections = [
    { name: 'サービス', pages: ['空港送迎', 'ゴルフ送迎', '観光ハイヤー', 'スポット利用', '冠婚葬祭'] },
    { name: '車両',     pages: ['Alphard', 'Granace', 'Hiace', '車両比較'] },
    { name: '予約',     pages: ['オンライン予約', '料金シミュレータ', 'よくあるご質問'] },
    { name: '会社',     pages: ['会社概要', '乗務員紹介', 'アクセス'] },
    { name: '採用',     pages: ['募集要項', 'エントリー'] },
  ];

  const sectionW = 2.35;
  const sectionGap = 0.2;
  const totalW = sectionW * 5 + sectionGap * 4;
  const startX = (W - totalW) / 2;
  const secY = 3.0;

  sections.forEach((sec, i) => {
    const sx = startX + i * (sectionW + sectionGap);
    // 接続線 (TOP -> セクション) - 常に左上→右下になるよう x,y を調整
    const tx = cx, ty = 2.3;
    const ex = sx + sectionW / 2, ey = secY;
    const lx = Math.min(tx, ex), ly = Math.min(ty, ey);
    const lw = Math.abs(ex - tx), lh = Math.abs(ey - ty);
    s.addShape(pres.shapes.LINE, {
      x: lx, y: ly, w: lw, h: lh,
      flipH: ex < tx,
      line: { color: C.grayLine, width: 1 }
    });
    // セクション見出し
    s.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: secY, w: sectionW, h: 0.55,
      fill: { color: C.gold }, line: { color: C.gold }
    });
    s.addText(sec.name, {
      x: sx, y: secY, w: sectionW, h: 0.55,
      fontFace: F.serif, fontSize: 14, color: C.navy, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
    // ページ一覧
    sec.pages.forEach((p, j) => {
      const py = secY + 0.7 + j * 0.45;
      s.addShape(pres.shapes.RECTANGLE, {
        x: sx + 0.1, y: py, w: sectionW - 0.2, h: 0.38,
        fill: { color: C.white }, line: { color: C.grayLine, width: 0.5 }
      });
      s.addText(p, {
        x: sx + 0.2, y: py, w: sectionW - 0.4, h: 0.38,
        fontFace: F.sans, fontSize: 11, color: C.ink,
        valign: 'middle', margin: 0
      });
    });
  });

  // 言語切替バー (下部)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 6.4, w: 12.15, h: 0.5,
    fill: { color: C.cream }, line: { color: C.gold, width: 0.5 }
  });
  s.addText([
    { text: '言語切替  /  ', options: { color: C.gray, fontSize: 11 } },
    { text: '日本語 (ja)  ·  English (en)  ·  简体中文 (zh-Hans)  ·  繁體中文 (zh-Hant)', options: { color: C.navy, fontSize: 12, bold: true } },
    { text: '   ※全 17 ページ × 4 言語 = 68 ページを CMS から 1 元管理', options: { color: C.gray, fontSize: 10 } },
  ], {
    x: 0.85, y: 6.4, w: 11.65, h: 0.5,
    fontFace: F.sans, margin: 0, valign: 'middle'
  });
}

// =========================================================
// Slide 8 :: 主要機能一覧
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 6, '主要機能一覧');

  s.addText('「受注の入口」を支える 8 つの機能', {
    x: 0.6, y: 1.0, w: 12, h: 0.4,
    fontFace: F.serif, fontSize: 18, color: C.navy, margin: 0
  });

  const features = [
    { ico: FA.FaCalendarCheck, name: 'オンライン予約',     desc: '車種・人数・荷物数から空き照会 → 予約確定', new: true },
    { ico: FA.FaCreditCard,    name: 'Stripe 決済',          desc: 'クレジット / Apple Pay / Alipay / WeChat Pay', new: true },
    { ico: FA.FaLine,          name: 'LINE 公式アカウント連携', desc: '予約完了通知・前日リマインド・乗務員連絡', new: false },
    { ico: FA.FaGlobe,         name: '4 言語切替',           desc: 'hreflang / OG / sitemap を言語別に出力', new: true },
    { ico: FA.FaCar,           name: '車両比較ツール',       desc: '定員 / 荷物 / 価格を横並び比較', new: true },
    { ico: FA.FaMapMarkedAlt,  name: '料金シミュレータ',     desc: '羽田・成田 → 都内ホテル の見積もり概算', new: true },
    { ico: FA.FaCommentDots,   name: 'お客様の声 CMS',       desc: '星評価 + 利用シーン別フィルタ', new: false },
    { ico: FA.FaShieldAlt,     name: '管理画面 (CMS)',       desc: '車両 / 料金 / お知らせ / 空き枠 を自社更新', new: true },
  ];

  const iconCache = {};
  for (const f of features) {
    iconCache[f.name] = await ico(f.ico, '#' + C.gold, 256);
  }

  for (let i = 0; i < features.length; i++) {
    const f = features[i];
    const col = i % 4;
    const row = Math.floor(i / 4);
    const w = 3.0, h = 2.4;
    const xStart = 0.6 + col * 3.12;
    const yStart = 1.6 + row * 2.55;

    s.addShape(pres.shapes.RECTANGLE, {
      x: xStart, y: yStart, w, h,
      fill: { color: C.white }, line: { color: C.grayLine, width: 0.5 },
      shadow: sh(0.06, 6, 2)
    });
    // アイコン円
    s.addShape(pres.shapes.OVAL, {
      x: xStart + 0.3, y: yStart + 0.3, w: 0.7, h: 0.7,
      fill: { color: C.navy }, line: { color: C.navy }
    });
    s.addImage({
      data: iconCache[f.name],
      x: xStart + 0.42, y: yStart + 0.42, w: 0.46, h: 0.46
    });
    // NEW バッジ
    if (f.new) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: xStart + w - 0.7, y: yStart + 0.25, w: 0.5, h: 0.28,
        fill: { color: C.gold }, line: { color: C.gold }
      });
      s.addText('NEW', {
        x: xStart + w - 0.7, y: yStart + 0.25, w: 0.5, h: 0.28,
        fontFace: F.num, fontSize: 9, color: C.navy, bold: true,
        align: 'center', valign: 'middle', margin: 0
      });
    }
    s.addText(f.name, {
      x: xStart + 0.3, y: yStart + 1.15, w: w - 0.6, h: 0.45,
      fontFace: F.serif, fontSize: 14, color: C.navy, bold: true, margin: 0
    });
    s.addText(f.desc, {
      x: xStart + 0.3, y: yStart + 1.6, w: w - 0.6, h: 0.7,
      fontFace: F.sans, fontSize: 10.5, color: C.ink, margin: 0
    });
  }
}

// =========================================================
// Slide 9 :: デザイン方向性 (ポンチ絵風)
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 7, 'デザイン方向性');

  s.addText('カラーパレット & タイポグラフィ', {
    x: 0.6, y: 1.0, w: 12, h: 0.4,
    fontFace: F.serif, fontSize: 18, color: C.navy, margin: 0
  });

  // カラーパレット (5色)
  const palette = [
    { hex: C.navy,    name: 'Deep Navy',      use: '基調色 / 70%' },
    { hex: C.gold,    name: 'Champagne Gold', use: 'アクセント / 8%' },
    { hex: C.cream,   name: 'Warm Cream',     use: '背景 / 18%' },
    { hex: C.ink,     name: 'Ink',            use: '本文' },
    { hex: C.white,   name: 'White',          use: 'カード地' },
  ];
  palette.forEach((p, i) => {
    const x = 0.6 + i * 1.45;
    const y = 1.6;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 1.3, h: 1.6,
      fill: { color: p.hex }, line: { color: C.grayLine, width: 0.5 }
    });
    s.addText('#' + p.hex.toUpperCase(), {
      x, y: y + 1.65, w: 1.3, h: 0.25,
      fontFace: F.num, fontSize: 9, color: C.ink, align: 'center', margin: 0
    });
    s.addText(p.name, {
      x, y: y + 1.9, w: 1.3, h: 0.25,
      fontFace: F.sans, fontSize: 10, color: C.navy, bold: true, align: 'center', margin: 0
    });
    s.addText(p.use, {
      x, y: y + 2.15, w: 1.3, h: 0.25,
      fontFace: F.sans, fontSize: 9, color: C.gray, align: 'center', margin: 0
    });
  });

  // タイポグラフィ見本
  s.addText('タイポグラフィ', {
    x: 8.4, y: 1.6, w: 4.4, h: 0.35,
    fontFace: F.sans, fontSize: 11, color: C.gray, charSpacing: 3, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.4, y: 2.0, w: 4.4, h: 1.9,
    fill: { color: C.white }, line: { color: C.grayLine, width: 0.5 }
  });
  s.addText('Z&GLOBAL', {
    x: 8.55, y: 2.05, w: 4.2, h: 0.6,
    fontFace: F.serif, fontSize: 28, color: C.navy, bold: true, margin: 0
  });
  s.addText('Yu Mincho — 見出し / 数字', {
    x: 8.55, y: 2.7, w: 4.2, h: 0.3,
    fontFace: F.num, fontSize: 10, color: C.gold, italic: true, margin: 0
  });
  s.addText('世界に誇れる最高のホスピタリティ。', {
    x: 8.55, y: 3.05, w: 4.2, h: 0.4,
    fontFace: F.sans, fontSize: 14, color: C.ink, margin: 0
  });
  s.addText('Yu Gothic UI — 本文 / UI', {
    x: 8.55, y: 3.5, w: 4.2, h: 0.3,
    fontFace: F.num, fontSize: 10, color: C.gold, italic: true, margin: 0
  });

  // ポンチ絵風ワイヤーフレーム
  s.addText('TOP ページ ワイヤーフレーム  (ラフ案)', {
    x: 0.6, y: 4.15, w: 12, h: 0.3,
    fontFace: F.sans, fontSize: 11, color: C.gray, charSpacing: 3, margin: 0
  });
  // フレーム
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.55, w: 12.15, h: 2.35,
    fill: { color: C.white }, line: { color: C.grayLine, width: 1 }
  });
  // ヘッダー帯
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.55, w: 12.15, h: 0.3,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  s.addText('Z&GLOBAL    SERVICE  FLEET  BOOK  COMPANY    JP / EN / 中', {
    x: 0.8, y: 4.55, w: 11.8, h: 0.3,
    fontFace: F.num, fontSize: 8, color: C.gold, valign: 'middle', margin: 0
  });
  // ヒーロー
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.85, w: 7.5, h: 1.6,
    fill: { color: '2A3957' }, line: { color: '2A3957' }
  });
  s.addText('実車両ヒーロー画像\n+ コピー「— 高級ハイヤーに、ふさわしい一枚を。」', {
    x: 0.8, y: 4.95, w: 7.1, h: 1.4,
    fontFace: F.sans, fontSize: 11, color: C.gold, italic: true, valign: 'middle', margin: 0
  });
  // 右の予約パネル
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.2, y: 4.85, w: 4.55, h: 1.6,
    fill: { color: C.cream }, line: { color: C.gold, width: 1 }
  });
  s.addText('クイック予約パネル\n出発地 / 目的地 / 日時 / 人数\n[ 空き照会 ]', {
    x: 8.35, y: 4.95, w: 4.3, h: 1.4,
    fontFace: F.sans, fontSize: 11, color: C.navy, valign: 'middle', margin: 0
  });
  // 下部 3 カード
  ['空港送迎', 'ゴルフ送迎', '観光ハイヤー'].forEach((t, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6 + i * 4.05 + (i > 0 ? 0.1 * i : 0), y: 6.5, w: 3.95, h: 0.38,
      fill: { color: 'F0EDE5' }, line: { color: C.grayLine, width: 0.5 }
    });
    s.addText(t, {
      x: 0.6 + i * 4.05 + (i > 0 ? 0.1 * i : 0), y: 6.5, w: 3.95, h: 0.38,
      fontFace: F.sans, fontSize: 10, color: C.navy,
      align: 'center', valign: 'middle', margin: 0
    });
  });

  // 付箋風コメント
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.8, y: 3.95, w: 2.95, h: 0.5,
    fill: { color: 'FFF5CC' }, line: { color: 'E5C957', width: 0.5 }
  });
  s.addText('※ 実画像撮影は7月予定', {
    x: 9.8, y: 3.95, w: 2.95, h: 0.5,
    fontFace: F.sans, fontSize: 9, color: 'A87900',
    align: 'center', valign: 'middle', margin: 0
  });
}

// =========================================================
// Slide 10 :: 導入効果 (KPI 予測)
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 8, '導入効果 (KPI 予測)');

  s.addText('リニューアル後 6 ヶ月の到達目安', {
    x: 0.6, y: 1.0, w: 12, h: 0.4,
    fontFace: F.sans, fontSize: 12, color: C.gray, margin: 0
  });

  // ビフォーアフター比較 (4 KPI 横並び)
  const kpis = [
    { label: 'オンライン予約数 / 月', before: '0',   after: '30',  unit: '件', delta: '+30 件' },
    { label: '海外 (中・英) 流入比率',   before: '8',   after: '35',  unit: '%',  delta: '+27 pt' },
    { label: 'Lighthouse Performance', before: '52',  after: '92',  unit: '点', delta: '+40 点' },
    { label: '電話の取りこぼし時間帯',   before: '夜・休', after: '0',    unit: '',  delta: '解消' },
  ];

  kpis.forEach((k, i) => {
    const x = 0.6 + i * 3.12;
    const y = 1.6;
    const w = 3.0, h = 3.0;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.white }, line: { color: C.grayLine, width: 0.5 },
      shadow: sh(0.08, 8, 3)
    });
    s.addText(k.label, {
      x: x + 0.25, y: y + 0.25, w: w - 0.5, h: 0.4,
      fontFace: F.sans, fontSize: 11, color: C.gray, margin: 0
    });
    // Before
    s.addText('× 現在', {
      x: x + 0.25, y: y + 0.75, w: w - 0.5, h: 0.3,
      fontFace: F.sans, fontSize: 10, color: C.red, margin: 0
    });
    s.addText([
      { text: k.before, options: { fontFace: F.num, fontSize: 24, color: C.gray, bold: true } },
      { text: ' ' + k.unit, options: { fontFace: F.sans, fontSize: 11, color: C.gray } },
    ], {
      x: x + 0.25, y: y + 1.0, w: w - 0.5, h: 0.5, margin: 0
    });
    // After
    s.addText('○ 6 ヶ月後', {
      x: x + 0.25, y: y + 1.65, w: w - 0.5, h: 0.3,
      fontFace: F.sans, fontSize: 10, color: C.green, margin: 0
    });
    s.addText([
      { text: k.after, options: { fontFace: F.num, fontSize: 32, color: C.navy, bold: true } },
      { text: ' ' + k.unit, options: { fontFace: F.sans, fontSize: 13, color: C.navy } },
    ], {
      x: x + 0.25, y: y + 1.9, w: w - 0.5, h: 0.7, margin: 0
    });
    // Delta bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + h - 0.45, w, h: 0.45,
      fill: { color: C.gold }, line: { color: C.gold }
    });
    s.addText(k.delta, {
      x, y: y + h - 0.45, w, h: 0.45,
      fontFace: F.sans, fontSize: 12, color: C.navy, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
  });

  // 売上インパクト試算
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 5.05, w: 12.15, h: 1.85,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  s.addText('売上インパクト試算', {
    x: 0.95, y: 5.2, w: 8, h: 0.4,
    fontFace: F.sans, fontSize: 11, color: C.gold, charSpacing: 3, margin: 0
  });
  s.addText([
    { text: '月 30 件 × 平均単価 25,000 円 = ', options: { color: C.white, fontSize: 16 } },
    { text: '月 +75 万円', options: { color: C.gold, fontSize: 22, bold: true } },
    { text: '  ', options: {} },
    { text: '/ 年 +900 万円', options: { color: 'CADCFC', fontSize: 16, breakLine: true } },
    { text: '初期投資 198 万円は ', options: { color: C.white, fontSize: 13 } },
    { text: '約 2.6 ヶ月で回収', options: { color: C.gold, fontSize: 14, bold: true } },
    { text: ' の見込み (粗利は別途試算)', options: { color: 'A8B3D0', fontSize: 13 } },
  ], {
    x: 0.95, y: 5.6, w: 11.4, h: 1.2,
    fontFace: F.sans, margin: 0, paraSpaceAfter: 6
  });
}

// =========================================================
// Slide 11 :: ご質問タイム
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.cream };
  pageHeader(s, 9, 'ここで一度、ご質問は?');

  // 中央に大きく問いかけ
  s.addText('?', {
    x: 0, y: 1.3, w: W, h: 3.2,
    fontFace: F.serif, fontSize: 170, color: C.gold, bold: true,
    align: 'center', valign: 'middle', margin: 0
  });
  s.addText('ここまでで気になる点はありますか?', {
    x: 0, y: 4.2, w: W, h: 0.6,
    fontFace: F.serif, fontSize: 26, color: C.navy, bold: true,
    align: 'center', margin: 0
  });
  s.addText('— 次のスライドからは「スケジュール・お見積もり・体制」に入ります。', {
    x: 0, y: 4.9, w: W, h: 0.4,
    fontFace: F.sans, fontSize: 13, color: C.gray,
    align: 'center', margin: 0
  });

  // よくある質問プレビュー (薄く)
  const faqs = [
    'Q. 既存の WordPress 記事は引き継げますか?',
    'Q. 公開後の運用は誰が担当しますか?',
    'Q. 多言語の翻訳精度はどう担保しますか?',
  ];
  faqs.forEach((q, i) => {
    s.addText(q, {
      x: 2, y: 5.6 + i * 0.4, w: 10, h: 0.35,
      fontFace: F.sans, fontSize: 12, color: C.gray, margin: 0
    });
  });
}

// =========================================================
// Slide 12 :: スケジュール
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 10, 'スケジュール');

  s.addText('2026 年 6 月 着手 → 9 月 公開', {
    x: 0.6, y: 1.0, w: 12, h: 0.45,
    fontFace: F.serif, fontSize: 18, color: C.navy, margin: 0
  });
  s.addText('全 13 週間 (バッファ 2 週間込み)', {
    x: 0.6, y: 1.45, w: 12, h: 0.3,
    fontFace: F.sans, fontSize: 11, color: C.gray, margin: 0
  });

  // ガントチャート風
  const phases = [
    { name: '01. 要件定義',           start: 0,  len: 2, color: C.navy },
    { name: '02. デザイン',           start: 2,  len: 3, color: C.navy },
    { name: '03. 多言語 ライティング', start: 3,  len: 4, color: C.gold },
    { name: '04. 実装 (フロント)',    start: 4,  len: 4, color: C.navy },
    { name: '05. 実装 (CMS / 予約)',  start: 5,  len: 4, color: C.navy },
    { name: '06. テスト・QA',         start: 9,  len: 2, color: C.gold },
    { name: '07. 公開・運用引継ぎ',   start: 11, len: 2, color: C.navy },
  ];
  const ganttX = 3.7;
  const ganttY = 2.0;
  const ganttW = 9.0;
  const cellW = ganttW / 13;
  const rowH = 0.45;

  // 週ヘッダー
  s.addText('週', {
    x: 0.6, y: ganttY, w: 3.0, h: rowH,
    fontFace: F.sans, fontSize: 10, color: C.gray, bold: true,
    valign: 'middle', margin: 0
  });
  for (let w = 0; w < 13; w++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: ganttX + w * cellW, y: ganttY, w: cellW, h: rowH,
      fill: { color: w % 4 === 0 ? C.cream : C.paper },
      line: { color: C.grayLine, width: 0.3 }
    });
    s.addText('W' + (w + 1), {
      x: ganttX + w * cellW, y: ganttY, w: cellW, h: rowH,
      fontFace: F.num, fontSize: 8, color: C.gray,
      align: 'center', valign: 'middle', margin: 0
    });
  }

  // フェーズ行
  phases.forEach((p, i) => {
    const ry = ganttY + (i + 1) * rowH;
    // ラベル
    s.addText(p.name, {
      x: 0.6, y: ry, w: 3.0, h: rowH,
      fontFace: F.sans, fontSize: 11, color: C.ink,
      valign: 'middle', margin: 0
    });
    // グリッド背景
    for (let w = 0; w < 13; w++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: ganttX + w * cellW, y: ry, w: cellW, h: rowH,
        fill: { color: w % 4 === 0 ? 'F5F5F0' : C.white },
        line: { color: C.grayLine, width: 0.3 }
      });
    }
    // バー
    s.addShape(pres.shapes.RECTANGLE, {
      x: ganttX + p.start * cellW + 0.04, y: ry + 0.08,
      w: p.len * cellW - 0.08, h: rowH - 0.16,
      fill: { color: p.color }, line: { color: p.color }
    });
  });

  // マイルストーン
  const msY = ganttY + (phases.length + 1) * rowH + 0.3;
  s.addText('マイルストーン', {
    x: 0.6, y: msY, w: 4, h: 0.3,
    fontFace: F.sans, fontSize: 11, color: C.gold, charSpacing: 3, bold: true, margin: 0
  });
  const ms = [
    { w: 'W2',  t: '要件確定' },
    { w: 'W5',  t: 'デザイン確定' },
    { w: 'W9',  t: 'β版確認' },
    { w: 'W13', t: '本番公開' },
  ];
  ms.forEach((m, i) => {
    const mx = 0.6 + i * 3.1;
    s.addShape(pres.shapes.OVAL, {
      x: mx, y: msY + 0.45, w: 0.35, h: 0.35,
      fill: { color: C.gold }, line: { color: C.gold }
    });
    s.addText(m.w, {
      x: mx, y: msY + 0.45, w: 0.35, h: 0.35,
      fontFace: F.num, fontSize: 9, color: C.navy, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
    s.addText(m.t, {
      x: mx + 0.45, y: msY + 0.45, w: 2.5, h: 0.35,
      fontFace: F.sans, fontSize: 12, color: C.navy, bold: true,
      valign: 'middle', margin: 0
    });
  });
}

// =========================================================
// Slide 13 :: お見積もり
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 11, 'お見積もり (概算)');

  s.addText('基本パッケージ 198 万円 / 追加機能はメニュー方式', {
    x: 0.6, y: 1.0, w: 12, h: 0.4,
    fontFace: F.sans, fontSize: 12, color: C.gray, margin: 0
  });

  // 基本パッケージ表
  const rows = [
    ['項目',                                       '内容',                                     '金額 (税抜)'],
    ['1. 要件定義・情報設計',                       '現状分析 / サイトマップ / WF',              '¥ 350,000'],
    ['2. デザイン (TOP + 下層 4 種)',                '中文 / 英語 翻訳カンプ含む',                '¥ 480,000'],
    ['3. フロントエンド実装',                       'Next.js / モバイル対応 / アクセシビリティ', '¥ 520,000'],
    ['4. CMS (Headless) 構築',                      '車両 / 料金 / お知らせ管理',                '¥ 280,000'],
    ['5. オンライン予約 + Stripe 決済',             '予約管理画面 / メール通知',                  '¥ 280,000'],
    ['6. 多言語 (日 / 英 / 簡 / 繁) 構築',           'hreflang / sitemap 含む',                   '¥ 180,000'],
    ['7. QA・SEO 対策・公開作業',                   'Lighthouse 90+ 保証',                       '¥ 120,000'],
    ['8. ディレクション・PM (3 ヶ月)',              '隔週定例・チャット随時',                    '¥ 220,000'],
    ['基本パッケージ 計 (税抜)',                    '',                                          '¥ 2,430,000'],
    ['特別ディスカウント',                          '初年度ご契約特典',                          '▲ ¥ 630,000'],
    ['合計 (税抜)',                                 '',                                          '¥ 1,800,000'],
    ['合計 (税込 10%)',                             '',                                          '¥ 1,980,000'],
  ];

  // 表 (手動描画でデザイン制御)
  // 行高を 0.4→0.33 に縮小し、下部の注釈を確保
  const tx = 0.6, ty = 1.5;
  const cw = [5.5, 4.4, 2.25];
  const rh = 0.33;

  rows.forEach((r, i) => {
    const ry = ty + i * rh;
    const isHeader = i === 0;
    const isSubtotal = i === 9;
    const isDiscount = i === 10;
    const isSubTotal2 = i === 11;
    const isTotal = i === 12;

    let bg = C.white;
    let fg = C.ink;
    let bold = false;
    if (isHeader) { bg = C.navy; fg = C.white; bold = true; }
    else if (isSubtotal) { bg = C.cream; fg = C.navy; bold = true; }
    else if (isDiscount) { bg = 'FFF5CC'; fg = C.goldDk; }
    else if (isSubTotal2) { bg = C.cream; fg = C.navy; bold = true; }
    else if (isTotal) { bg = C.gold; fg = C.navy; bold = true; }

    let xCursor = tx;
    r.forEach((cell, j) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: xCursor, y: ry, w: cw[j], h: rh,
        fill: { color: bg }, line: { color: C.grayLine, width: 0.3 }
      });
      s.addText(cell, {
        x: xCursor + 0.15, y: ry, w: cw[j] - 0.3, h: rh,
        fontFace: j === 2 ? F.num : F.sans,
        fontSize: isHeader ? 11 : (isTotal ? 13 : 10.5),
        color: fg, bold, valign: 'middle', margin: 0,
        align: j === 2 ? 'right' : 'left'
      });
      xCursor += cw[j];
    });
  });

  // 補足 (表は y=5.79 で終わるので 6.05 から開始 = 0.26" のマージン)
  s.addText([
    { text: '※ ', options: { color: C.gold, bold: true } },
    { text: '上記は基本パッケージのみ。多言語の翻訳実費 (1 言語 50 円 / 文字)、ストック画像/撮影費は別途。', options: { breakLine: true } },
    { text: '※ ', options: { color: C.gold, bold: true } },
    { text: '公開後の保守 (月額 38,000 円〜) を別途ご提案します。', options: { breakLine: true } },
    { text: '※ ', options: { color: C.gold, bold: true } },
    { text: '本見積は 2026/06/30 までのご発注を前提とした金額です。', options: {} },
  ], {
    x: 0.6, y: 6.05, w: 12.15, h: 0.9,
    fontFace: F.sans, fontSize: 10, color: C.gray, margin: 0, paraSpaceAfter: 3
  });
}

// =========================================================
// Slide 14 :: 体制
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.paper };
  pageHeader(s, 12, '体制');

  s.addText('4 名 + Z&GLOBAL 様 1 名 = 5 名チーム', {
    x: 0.6, y: 1.0, w: 12, h: 0.45,
    fontFace: F.serif, fontSize: 18, color: C.navy, margin: 0
  });

  const members = [
    { role: 'プロジェクトマネージャー',           name: '院 光雄', initial: '院', desc: 'ハイヤー運営会社様向け\n業務システム導入を統括',     primary: true },
    { role: 'UI / UX & フロントエンド',           name: '康 杰',   initial: '康', desc: 'Next.js / 多言語対応\nWebサイト構築 経験豊富',         primary: false },
    { role: 'バックエンド / 予約システム',         name: '侯 迪',   initial: '侯', desc: 'Stripe決済 / 予約管理\nシステムの設計・実装',           primary: false },
    { role: '多言語 QA (中・英)',                 name: '李 瑩',   initial: '李', desc: 'ネイティブ校正\n簡体字 / 繁體字 / English',           primary: false },
  ];

  members.forEach((m, i) => {
    const x = 0.55 + i * 3.1;
    const y = 1.8;
    const w = 2.95, h = 3.2;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: m.primary ? C.navy : C.white },
      line: { color: m.primary ? C.navy : C.grayLine, width: 0.5 },
      shadow: sh(0.08, 8, 3)
    });
    // 円形イニシャル
    s.addShape(pres.shapes.OVAL, {
      x: x + (w - 1.1) / 2, y: y + 0.4, w: 1.1, h: 1.1,
      fill: { color: m.primary ? C.gold : C.navy },
      line: { color: m.primary ? C.gold : C.navy }
    });
    s.addText(m.initial, {
      x: x + (w - 1.1) / 2, y: y + 0.4, w: 1.1, h: 1.1,
      fontFace: F.serif, fontSize: 36, color: m.primary ? C.navy : C.white, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
    s.addText(m.role, {
      x: x + 0.15, y: y + 1.65, w: w - 0.3, h: 0.5,
      fontFace: F.sans, fontSize: 11, color: m.primary ? C.gold : C.gray,
      align: 'center', margin: 0
    });
    s.addText(m.name, {
      x: x + 0.15, y: y + 2.1, w: w - 0.3, h: 0.4,
      fontFace: F.serif, fontSize: 16, color: m.primary ? C.white : C.navy, bold: true,
      align: 'center', margin: 0
    });
    s.addText(m.desc, {
      x: x + 0.15, y: y + 2.55, w: w - 0.3, h: 0.55,
      fontFace: F.sans, fontSize: 10, color: m.primary ? 'CADCFC' : C.ink,
      align: 'center', margin: 0
    });
  });

  // Z&GLOBAL 側の窓口役
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 5.25, w: 12.15, h: 1.6,
    fill: { color: C.cream }, line: { color: C.gold, width: 0.5 }
  });
  s.addText('Z&GLOBAL 様にご担当いただきたい役割', {
    x: 0.85, y: 5.4, w: 11, h: 0.4,
    fontFace: F.sans, fontSize: 11, color: C.gold, charSpacing: 3, bold: true, margin: 0
  });
  s.addText([
    { text: '① ', options: { color: C.navy, bold: true } }, { text: '隔週定例の意思決定者 (1 名)', options: { color: C.ink } },
    { text: '    ② ', options: { color: C.navy, bold: true } }, { text: '実車両・乗務員の撮影立会', options: { color: C.ink } },
    { text: '    ③ ', options: { color: C.navy, bold: true } }, { text: '中文・英語の最終ニュアンス確認', options: { color: C.ink, breakLine: true } },
    { text: '※ 上記の負荷感: ', options: { color: C.gray, fontSize: 11 } },
    { text: '合計 月 8 時間程度', options: { color: C.navy, fontSize: 12, bold: true } },
    { text: ' を想定しています。', options: { color: C.gray, fontSize: 11 } },
  ], {
    x: 0.85, y: 5.85, w: 11.5, h: 0.95,
    fontFace: F.sans, fontSize: 13, margin: 0
  });
}

// =========================================================
// Slide 15 :: 次のアクション・お問い合わせ
// =========================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };

  // 装飾ライン
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.2, w: 0.6, h: 0.04, fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText('NEXT STEP', {
    x: 0.6, y: 1.3, w: 6, h: 0.4,
    fontFace: F.num, fontSize: 12, color: C.gold, charSpacing: 4, bold: true, margin: 0
  });
  s.addText('次のアクション', {
    x: 0.6, y: 1.85, w: 12, h: 0.8,
    fontFace: F.serif, fontSize: 38, color: C.white, bold: true, margin: 0
  });

  // 3 ステップ
  const steps = [
    { no: '01', when: '〜 2026/05/30', t: '本提案へのご質問・お見積り内容のフィードバック' },
    { no: '02', when: '2026/06/05',    t: 'お打ち合わせ (オンライン 60 分) / スコープ確定' },
    { no: '03', when: '2026/06/12',    t: '契約締結 → 6/15 キックオフ' },
  ];
  steps.forEach((st, i) => {
    const x = 0.6, y = 3.0 + i * 0.95, w = 7.5, h = 0.8;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.7, h, fill: { color: C.gold }, line: { color: C.gold }
    });
    s.addText(st.no, {
      x, y, w: 0.7, h,
      fontFace: F.num, fontSize: 18, color: C.navy, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
    s.addText(st.when, {
      x: x + 0.85, y: y + 0.05, w: w - 1, h: 0.3,
      fontFace: F.num, fontSize: 11, color: C.gold, italic: true, margin: 0
    });
    s.addText(st.t, {
      x: x + 0.85, y: y + 0.32, w: w - 1, h: 0.45,
      fontFace: F.sans, fontSize: 14, color: C.white, margin: 0
    });
  });

  // 右側: 連絡先カード
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.6, y: 3.0, w: 4.15, h: 3.4,
    fill: { color: C.white }, line: { color: C.gold, width: 1 }
  });
  s.addText('お問い合わせ', {
    x: 8.85, y: 3.15, w: 3.7, h: 0.4,
    fontFace: F.sans, fontSize: 11, color: C.gold, charSpacing: 3, bold: true, margin: 0
  });
  s.addText('FLY 株式会社', {
    x: 8.85, y: 3.55, w: 3.7, h: 0.5,
    fontFace: F.serif, fontSize: 20, color: C.navy, bold: true, margin: 0
  });
  s.addText('Your Vision, Our Wings.', {
    x: 8.85, y: 4.05, w: 3.7, h: 0.3,
    fontFace: F.num, fontSize: 10, color: C.gold, italic: true, margin: 0
  });
  // 区切り線
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.85, y: 4.45, w: 0.3, h: 0.02,
    fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText([
    { text: '担当 ', options: { color: C.gray, fontSize: 10 } },
    { text: '院 光雄', options: { color: C.ink, fontSize: 13, bold: true, breakLine: true } },
    { text: 'TEL ', options: { color: C.gray, fontSize: 10 } },
    { text: '03-6674-2802', options: { color: C.ink, fontSize: 13, breakLine: true } },
    { text: 'MAIL ', options: { color: C.gray, fontSize: 10 } },
    { text: 'eigyo@fly-japan.jp', options: { color: C.ink, fontSize: 12, breakLine: true } },
    { text: 'WEB ', options: { color: C.gray, fontSize: 10 } },
    { text: 'www.fly-japan.jp', options: { color: C.ink, fontSize: 12, breakLine: true } },
    { text: '本社 ', options: { color: C.gray, fontSize: 10 } },
    { text: '〒178-0061 東京都練馬区大泉学園町3-5-23', options: { color: C.ink, fontSize: 10 } },
  ], {
    x: 8.85, y: 4.6, w: 3.7, h: 2.25,
    fontFace: F.sans, margin: 0, paraSpaceAfter: 3
  });

  // 締めの一言
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 6.55, w: 12.15, h: 0.04,
    fill: { color: C.gold, transparency: 50 }, line: { color: C.gold, transparency: 50 }
  });
  s.addText('— 御社の事業成長を、ウェブの側からご一緒できれば幸いです。', {
    x: 0.6, y: 6.7, w: 12.15, h: 0.4,
    fontFace: F.serif, fontSize: 14, color: 'CADCFC', italic: true, margin: 0
  });
  s.addText('v1.0 / 2026-05-20', {
    x: W - 2.5, y: 7.15, w: 1.9, h: 0.3,
    fontFace: F.num, fontSize: 9, color: 'A8B3D0', align: 'right', margin: 0
  });
}

// ---------- 書き出し ----------
const outPath = 'C:\\work\\workspace\\ZGlobalHP\\ZGlobal_HP_Renewal_Proposal.pptx';
await pres.writeFile({ fileName: outPath });
console.log('SAVED:', outPath);

})().catch(e => { console.error(e); process.exit(1); });
