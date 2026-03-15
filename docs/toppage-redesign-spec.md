# smile訪問看護ステーション トップページ リデザイン仕様書 v2

---

## ★ Codex への作業指示

この仕様書に従って `index-new.html` を全面書き直してください。

### 作業前に必ず読むファイル（優先順）

1. **この仕様書自体** — `docs/toppage-redesign-spec.md`（デザイン・配色・レイアウト・コピーのすべてを定義）
2. **現行の実装** — `index-new.html`（書き換え対象。現在の HTML 構造・Tailwind config・CSS・JS を把握するために読む）
3. **共通ヘッダー/フッター** — `shared-layout.js`（このファイルは **変更しない**。ヘッダー/フッターを動的に注入する仕組みを理解し、CSS オーバーライドで対応する）

### 画像アセット（既存ファイル。パスはそのまま使用）

- `assets/img/smile訪問看護ステーション_logo.png` — ロゴ（丸型パープルバッジ）
- `assets/img/hero1.jpeg` — ヒーロー写真
- `assets/img/hero2.jpeg` — 透析ケア写真
- `assets/img/instagram2.jpeg` — 小児ケア写真（代用）
- `assets/img/instagram4.jpeg` — 精神科ケア写真（代用）
- `assets/img/studysession.jpeg` — 採用セクション写真
- `assets/img/new colleague.jpeg` — ダイアリー写真

### 成果物

- `index-new.html` を **1ファイルで完結する形** で書き直す（外部CSSファイルは作らない）
- `shared-layout.js` は変更しない
- 他のHTMLファイル（about.html, recruit.html 等）は変更しない

---

> **技術スタック:** HTML5 + Tailwind CSS（CDN） + Vanilla JavaScript
> **共通レイアウト:** `shared-layout.js` によるヘッダー/フッターの注入（既存の仕組みを継続利用。**ファイル自体は変更しない**）
> **レスポンシブ:** スマホファースト設計（ブレイクポイント: md=768px, lg=1024px）
> **ロゴ画像:** `assets/img/smile訪問看護ステーション_logo.png`（丸型パープルバッジ）

---

## 0. 重要な制約事項

1. **カード型UI禁止**: 情報を四角い枠に並べるカード型レイアウトは使用しない。情報の区分は背景色・余白・丸形色面で表現。
2. **オレンジをメインカラーにしない**: shared-layout.js がオレンジ配色だが、index-new.html 内の CSS オーバーライドでパープルに変更する。
3. **すべてをアシンメトリーにしない**: 対称（中央揃え）と非対称セクションを交互に配置し、メリハリをつける。
4. **可愛くておしゃれ**: PDF資料のハーフトーンドット柄、丸形要素、温かみのあるトーンを再現。ポップすぎず上品さも保つ。

---

## 1. デザインコンセプト

**コンセプト名：「笑顔の連鎖（Chain of Smiles）」**

PDF資料から読み取れる企業カルチャー ── 「自分らしさ」「笑顔」「成長」──を、鮮やかなパープルとイエローで彩り、丸みのある可愛らしいシェイプとハーフトーンドットのテクスチャで表現する。医療サイトの堅さではなく、フェミニン・モダン・アプローチャブルなトーンを目指す。

---

## 2. デザイントークン

### 2-1. カラーパレット（PDF資料準拠で全面更新）

```javascript
// Tailwind config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'brand':          '#CB6CE6',   // メインパープル（ロゴ・PDF準拠）
        'brand-light':    '#DA9BEA',   // ソフトパープル（背景・ホバー）
        'brand-bg':       '#F3E8F9',   // セクション背景の薄い紫
        'brand-pale':     '#F8F0FC',   // 最も薄いパープル背景
        'accent':         '#F4DF2C',   // イエロー/ゴールド（CTA・ハイライト。PDF準拠）
        'accent-light':   '#FBF6D0',   // イエロー薄背景
        'coral':          '#FF9A76',   // 温かみのポイント使い
        'charcoal':       '#2D2D3A',   // 本文テキスト
        'charcoal-light': '#6B6B7B',   // 補助テキスト
        'warm-white':     '#F4F4ED',   // 基本背景（PDF準拠）
        'dark-navy':      '#1E1E2E',   // フッター背景
      },
      fontFamily: {
        serif:   ['"Noto Serif JP"', 'serif'],
        sans:    ['"Noto Sans JP"', 'sans-serif'],
        rounded: ['"M PLUS Rounded 1c"', 'sans-serif'],
        accent:  ['"Josefin Sans"', 'sans-serif'],
      }
    }
  }
}
```

**配色ルール:**
- メインカラーは `#CB6CE6`（パープル）。ボタン・リンク・アイコン・装飾に使用。
- アクセントは `#F4DF2C`（イエロー）。CTA ボタン・ハイライト・バッジに使用。
- ベース背景は `#F4F4ED`（温かみのある白）。
- オレンジは使わない（shared-layout.js のオーバーライドで排除）。

### 2-2. タイポグラフィ（変更なし）

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@400;500;700&family=Josefin+Sans:wght@300;400&display=swap" rel="stylesheet">
```

| 用途 | フォント | Weight | サイズ（モバイル / PC） |
|---|---|---|---|
| ヒーローコピー | Noto Serif JP | 500 | 28px / 48px |
| セクション大見出し | Noto Serif JP | 500 | 22-24px / 36px |
| サブ見出し | **M PLUS Rounded 1c** | 700 | 16-18px / 20-24px |
| 本文 | Noto Sans JP | 400 | 15px / 16px |
| 英字アクセント | Josefin Sans | 300 | 14px / 18-20px |

※ **M PLUS Rounded 1c を多めに使用**して「可愛さ」を演出。Noto Serif JP で「上品さ」とのバランスを取る。

### 2-3. 余白の基準

- セクション間の上下余白: モバイル `80px` / PC `120px`
- セクション内のコンテンツ間: モバイル `32-40px` / PC `48-64px`
- コンテンツの最大幅: `1200px`（中央寄せ）
- 左右パディング: モバイル `20px` / PC `48px`

---

## 3. shared-layout.js のオレンジ → パープル化

**shared-layout.js 自体は変更しない。** index-new.html の `<style>` ブロックに以下の CSS オーバーライドを追加する。shared-layout.js の `<style>` は `<head>` に動的に挿入されるが、index-new.html の `<style>` がソース順で後に来るため、同じ詳細度であれば自然にオーバーライドされる。

```css
/* ── shared-layout.js オーバーライド（パープル化） ── */

/* ロゴ */
.sn-logo,
.sn-footer-brand { color: #CB6CE6 !important; }
.sn-footer-brand:hover { color: #DA9BEA !important; }

/* ナビリンク */
.sn-link:hover,
.sn-link.sn-active { color: #CB6CE6 !important; }

/* ドロップダウン */
.sn-dropdown:hover .sn-caret { color: #CB6CE6 !important; }
.sn-dropdown-panel a:hover,
.sn-dropdown-panel a.sn-active { background: #F3E8F9 !important; color: #CB6CE6 !important; }

/* CTAボタン */
.sn-btn-contact { background: #CB6CE6 !important; color: #fff !important; }
.sn-btn-contact:hover { background: #b855d4 !important; }
.sn-btn-recruit { border-color: #F4DF2C !important; background: #FBF6D0 !important; color: #7a6200 !important; }
.sn-btn-recruit:hover { background: #F4DF2C !important; color: #2D2D3A !important; }
.sn-btn-users { border-color: #DA9BEA !important; background: #F3E8F9 !important; color: #CB6CE6 !important; }
.sn-btn-users:hover { background: #E8D4F5 !important; }
.sn-btn-medical { border-color: #DA9BEA !important; background: #F8F0FC !important; color: #9B4DCA !important; }
.sn-btn-medical:hover { background: #F3E8F9 !important; }

/* フッター */
.sn-shared-footer { background: #1E1E2E !important; }
.sn-contact-box { border-color: rgba(203,108,230,0.3) !important; }
.sn-contact-box .sn-label { color: #DA9BEA !important; }
.sn-contact-box .sn-phone:hover { color: #DA9BEA !important; }
.sn-footer-contact:hover {
  background: #CB6CE6 !important;
  border-color: #CB6CE6 !important;
  box-shadow: 0 16px 34px rgba(203,108,230,0.34) !important;
}

/* モバイルメニュー */
.sn-mobile-links a:hover,
.sn-mobile-sub a:hover { background: #F3E8F9 !important; }
```

さらに、以下の JavaScript を `shared-layout.js` の読み込み後に配置し、ヘッダーとフッターにロゴ画像を注入する：

```javascript
// ロゴ画像の注入（shared-layout.js の実行後に実行）
document.addEventListener('DOMContentLoaded', () => {
  const logoImg = '<img src="assets/img/smile訪問看護ステーション_logo.png" alt="" style="height:32px;width:32px;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:8px;">';
  document.querySelectorAll('.sn-logo, .sn-footer-brand').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = logoImg + '<span>' + text + '</span>';
  });
});
```

---

## 4. グローバル装飾要素

### 4-1. ハーフトーンドットパターン（PDF準拠のシグネチャー装飾）

PDF資料で全ページの右上角に使われているパープルのハーフトーンドット柄を再現。SVGパターンで実装。

```html
<!-- ハーフトーンドット装飾（再利用コンポーネント） -->
<svg class="absolute pointer-events-none" width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
  <defs>
    <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="7" cy="7" r="3" fill="#CB6CE6"/>
    </pattern>
  </defs>
  <circle cx="100" cy="100" r="95" fill="url(#dots)" opacity="0.08"/>
</svg>
```

**配置箇所:**
- ヒーロー: 右上（`top-0 right-0`, opacity 0.08）
- 透析ケア: 左下（opacity 0.06）
- 採用セクション: 右下（opacity 0.07）
- お問い合わせCTA: 左側（opacity 0.06）

### 4-2. Blob型マスク（継続使用）

```css
.blob-mask   { border-radius: 60% 40% 55% 45% / 55% 60% 40% 45%; }
.blob-mask-2 { border-radius: 45% 55% 40% 60% / 60% 45% 55% 40%; }
.blob-mask-3 { border-radius: 50% 60% 45% 55% / 40% 55% 60% 50%; }
```

### 4-3. Wave型セクション境界線（色を更新）

各Wave SVG の fill 色を新パレットに合わせる：
- → warm-white セクション: `fill="#F4F4ED"`
- → brand-bg セクション: `fill="#F3E8F9"`
- → accent-light セクション: `fill="#FBF6D0"`

### 4-4. 手書き風アクセント（色を更新）

```html
<svg width="200" height="12" viewBox="0 0 200 12" aria-hidden="true">
  <path d="M2,8 Q50,2 100,8 Q150,12 198,6" stroke="#F4DF2C" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>
```

### 4-5. スパークル/キラキラ SVG

見出しの近くに配置する小さなイエローのスパークル装飾。

```html
<svg width="16" height="16" viewBox="0 0 16 16" fill="#F4DF2C" aria-hidden="true">
  <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/>
</svg>
```

### 4-6. スクロールアニメーション

```css
.anim { opacity:0; transform:translateY(30px); transition: opacity .8s ease, transform .8s ease; }
.anim.is-visible { opacity:1; transform:translateY(0); }
.anim-delay-1 { transition-delay:.15s; }
.anim-delay-2 { transition-delay:.3s; }
.anim-delay-3 { transition-delay:.45s; }
```

ヒーロー内の `.anim` 要素は初期表示時に即座に `is-visible` を付与する：
```javascript
document.querySelectorAll('#hero .anim').forEach(el => el.classList.add('is-visible'));
```

---

## 5. セクション別 実装仕様

---

### Section 1: ヒーロー ★非対称

**背景:** `linear-gradient(135deg, #F3E8F9 0%, #F4F4ED 60%, #FBF6D0 100%)`
**装飾:** 右上にハーフトーンドットパターン、左上と右下に薄いパープルの円形色面

```
┌──────────────────────────────────────────────────────┐
│  ⣿⣿（ハーフトーンドット、右上）                         │
│                                                      │
│  [ロゴバッジ 80-100px]                                │
│                                                      │
│  あなたの        ┌─────────────────────┐             │
│  「やりたい」を、 │  [Blob型マスク写真]   │             │
│  確かな医療で     │  hero1.jpeg          │             │
│  支える。        │  ※右端が画面外に     │             │
│                  │   はみ出す            │             │
│  Design Life,    └─────────────────────┘             │
│  Empower Choice                                      │
│                                                      │
│  [ご利用を検討中の方] [お問い合わせ]                     │
│                                                      │
│          〰️ スクロール誘導                              │
└──────────────────────────────────────────────────────┘
```

**実装詳細:**

- **ロゴバッジ:**
  - `<img src="assets/img/smile訪問看護ステーション_logo.png">`
  - モバイル: `w-20 h-20 mx-auto mb-6`（80px、中央揃え）
  - PC: `w-24 h-24 lg:w-28 lg:h-28 lg:mx-0 mb-6`（96-112px、左揃え）
  - `drop-shadow-md rounded-full`
- **メインコピー:**
  - `font-serif font-medium`
  - モバイル: `text-[28px]`, PC: `text-[40px] lg:text-[48px]`
  - `tracking-[0.06em] leading-[1.45] text-charcoal`
- **サブコピー "Design Life, Empower Choice":**
  - `font-accent font-light text-[16px] md:text-[20px] text-charcoal-light`
- **CTAボタン:**
  - 「ご利用を検討中の方」: `bg-brand text-white rounded-full px-8 py-4 font-bold`
  - 「お問い合わせ」: `bg-accent text-charcoal rounded-full px-8 py-4 font-bold`
  - hover: `hover:scale-[1.03] hover:shadow-lg transition-all`
- **右側写真（PC）:**
  - `blob-mask` 適用
  - `lg:w-[55%] lg:-mr-[5vw]`（右端はみ出し）
  - `aspect-[4/3] object-cover`
- **モバイル:** ロゴ中央→見出し中央→ボタン中央→写真下（blob-mask, `w-[90vw]`）
- **スクロール誘導:** 画面最下部中央、パープルの波線SVG、`animation: gentle-bounce 2s ease infinite`

---

### Section 2: ブランドステートメント ★対称（中央揃え）

**背景:** `warm-white`（`#F4F4ED`）。上端はWave SVGで接続（fill: `#F4F4ED`）。

```
┌──────────────────────────────────────────────────────┐
│  ～～～Wave～～～                                      │
│                                                      │
│     ○（薄い紫の円、左上）                              │
│                                                      │
│           自分らしく生きる力を支え、                    │
│           共に幸せを紡ぎ続ける。                       │
│           ─── ✦ ───（手書き下線 + スパークル）          │
│                                                      │
│     尼崎を拠点に、2024年4月に開設。                    │
│     透析ケアに強みを持つ訪問看護ステーションです。       │
│                                                      │
│             ○（薄い紫の円、右下）                      │
└──────────────────────────────────────────────────────┘
```

**実装詳細:**
- ステートメント: `font-serif font-medium text-[22px] md:text-[36px] text-charcoal text-center`
- 装飾円: `absolute bg-brand-light opacity-[0.08] rounded-full w-[250px] h-[250px]`
- 手書き下線: `stroke="#F4DF2C"`、下線の横にスパークルSVG（`fill="#F4DF2C"`）
- 説明文: `font-sans text-[14px] md:text-[15px] text-charcoal-light text-center`

---

### Section 3-A: 透析ケア ★非対称（左テキスト＋右写真）

**背景:** `brand-bg`（`#F3E8F9`）
**装飾:** 左下にハーフトーンドット（opacity 0.06）

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  SPECIALTY 01                                        │
│                                                      │
│  透析に、強い。      ┌──────────┐                    │
│                     │ [Blob写真] │                    │
│  シャント管理、       │ hero2.jpeg│                    │
│  食事・水分管理、     └──────────┘                    │
│  バイタル変化の                                       │
│  予測的ケア。                                         │
│                                                      │
│  ╭・・・・・・╮                                       │
│  ┊尼崎でも希少な┊                                     │
│  ┊透析特化型   ┊                                     │
│  ╰・・・・・・╯                                       │
│                                                      │
│  サービス内容を詳しく見る →                             │
│                                                      │
│  ⣿ ハーフトーン（左下）                                │
└──────────────────────────────────────────────────────┘
```

**実装詳細:**
- ラベル `SPECIALTY 01`: `font-accent font-light text-[14px] tracking-[0.14em] text-brand`
- 見出し「透析に、強い。」: `font-serif font-bold text-[28px] md:text-[44px] text-charcoal`
- バッジ: `border: 2px dashed #CB6CE6; border-radius: 9999px; padding: 8px 16px`。中テキストは `font-rounded font-bold text-[14px] text-brand`
- リンク: `text-brand hover:text-accent`
- PC: 左テキスト55% + 右Blob写真45%
- モバイル: テキスト上、写真下（縦積み）

---

### Section 3-B: 小児・育児ケア ★非対称（反転: 左写真＋右テキスト）

**背景:** `rgba(255,154,118,0.06)`（コーラルの薄いティント）

- PC: 左にBlob写真 + 右にテキスト（3-Aの逆）
- ラベル `SPECIALTY 02`: `text-coral`
- 見出し「子どもと、家族と。」: `font-serif font-medium text-[24px] md:text-[36px]`
- 見出し横にスパークルSVG（`fill="#F4DF2C"`）
- リンク: `text-brand hover:text-accent`

---

### Section 3-C: 精神科ケア ★対称（中央揃え）

**背景:** `warm-white`（`#F4F4ED`）

- テキスト中央揃え → 写真中央（blob-mask-3）
- ラベル `SPECIALTY 03`: `text-brand`
- 見出し「対話を、大切に。」: `font-serif font-medium text-[24px] md:text-[36px] text-center`
- 余白を他セクションより多めにとる（静かなトーン）
- リンク: `text-brand hover:text-accent`

---

### Section 4: 4つの価値観（NEW） ★対称

**背景:** `brand-bg`（`#F3E8F9`）。上端はWave接続。

PDF資料の「Values」（主体性、共感と協働、成長と探求、笑顔の連鎖）を4つの丸形アイコンで表現する。

```
┌──────────────────────────────────────────────────────┐
│  ～～～Wave～～～                                      │
│                                                      │
│         smileが大切にしていること                       │
│                                                      │
│     ○         ○         ○         ○                │
│   主体性    共感と協働  成長と探求  笑顔の連鎖           │
│                                                      │
│  ※ モバイルでは 2×2 グリッド                           │
└──────────────────────────────────────────────────────┘
```

**実装詳細:**
- 見出し: `font-rounded font-bold text-[20px] md:text-[24px] text-charcoal text-center`
- 4つのアイコン: `display: flex; justify-content: center; gap: 32px`（モバイル: `grid grid-cols-2 gap-6`）
- 各アイコン:
  - 外枠: `w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-white shadow-md flex items-center justify-center`
  - 内部SVGアイコン: `w-10 h-10 text-brand`（シンプルな線画アイコン）
  - ラベル: `font-rounded font-bold text-[13px] md:text-[14px] text-charcoal mt-3 text-center`
- hover: `hover:scale-105 hover:-translate-y-1 transition-all`

**SVGアイコン例:**
1. 主体性 → 人＋星（自分で選ぶ）
2. 共感と協働 → ハート＋握手
3. 成長と探求 → 芽＋上矢印
4. 笑顔の連鎖 → スマイル＋リンク

---

### Section 5: 利用者の声 ★横スクロール

**背景:** `warm-white`。左半分にパープルの大きなBlob型色面（`bg-brand opacity-[0.05]`）

**構造は現行を継続。配色のみ更新:**
- 大引用符: `text-accent opacity-40`（`#F4DF2C`）
- 装飾円: `bg-brand-light opacity-[0.06]`
- リンク: `text-brand hover:text-accent`

---

### Section 6: 採用セクション「smileで働く」 ★非対称

**背景:** `linear-gradient(180deg, #FBF6D0 0%, #F4F4ED 100%)`。上端はWave接続（fill: `#FBF6D0`）。
**装飾:** 右下にハーフトーンドット（opacity 0.07）

**構造は現行を継続（左にタイムライン＋テキスト、右にBlob写真）。配色のみ更新:**

- タイムラインのドット/ライン: `bg-brand` / `bg-brand/40`
- 見出し: `font-serif font-medium text-charcoal`
- CTAボタン:
  - 「採用情報を見る」: `bg-accent text-charcoal rounded-full font-bold`
  - 「エントリーフォーム」: `bg-brand text-white rounded-full font-bold`

---

### Section 7: 利用の流れ ★対称（中央揃え）

**背景:** `warm-white`。上端Wave接続。

**構造は現行を継続。配色のみ更新:**
- 円形ノード: `bg-brand-pale border-2 border-brand-light`
- 接続線/パス: `stroke: #DA9BEA`
- リンク: `text-brand hover:text-accent`

---

### Section 8: お知らせ＋スタッフダイアリー ★2カラム

**背景:** `brand-bg`（`#F3E8F9`）。上端Wave接続。

**構造は現行を継続。配色のみ更新:**
- お知らせ項目の区切り線: `border-bottom: 1px solid rgba(203,108,230,0.15)`
- リンク: `text-brand hover:text-accent`

---

### Section 9: お問い合わせ CTA ★対称（中央揃え）

**背景:** `linear-gradient(180deg, #E0C8F0 0%, #D0B0E8 100%)`（より鮮やかなパープルグラデーション）
**装飾:** 左側にハーフトーンドット（opacity 0.06）

```
┌──────────────────────────────────────────────────────┐
│ ⣿（ハーフトーン左）                                    │
│                                                      │
│           まずは、小さな気がかりから。                   │
│                                                      │
│   ┌─────────────┐    ┌──────────────────┐           │
│   │☎ 06-4950-6402│    │お問い合わせフォーム │           │
│   │ 平日9:00-18:00│    │ [イエローボタン]   │           │
│   └─────────────┘    └──────────────────┘           │
│                                                      │
│   〒661-0012 兵庫県尼崎市南塚口町8丁目41-7              │
└──────────────────────────────────────────────────────┘
```

- 電話ブロック: `bg-white/60 rounded-[20px]`
- フォームボタン: `bg-accent text-charcoal rounded-full font-bold text-[16px] md:text-[18px]`

---

### Section 10: モバイル固定フッターバー

```html
<div class="md:hidden fixed bottom-0 left-0 w-full z-50 flex"
     style="background:rgba(255,255,255,0.95); backdrop-filter:blur(8px); border-top:1px solid rgba(203,108,230,0.15);">
  <a href="tel:0649506402" class="... text-brand">電話</a>
  <a href="contact.html" class="... bg-brand text-white">お問い合わせ</a>
</div>
```

---

## 6. ページ全体の HTML アウトライン

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>smile訪問看護ステーション | あなたの「やりたい」を確かな医療で支える</title>
  <meta name="description" content="尼崎の訪問看護ステーション。透析・小児・精神科ケアに強み。自分らしく生きる力を支えます。">
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config = { /* 上記パレット */ }</script>
  <style>
    /* shared-layout.js オーバーライド CSS（上記セクション3のコード） */
    /* Blob masks */
    /* Animation classes */
    /* Wave dividers */
    /* Scroll container */
    /* Keyframes */
  </style>
</head>
<body class="bg-warm-white text-charcoal font-sans antialiased">

  <main>
    <section id="hero"><!-- ヒーロー ★非対称 --></section>
    <div class="wave-divider" aria-hidden="true"><!-- SVG --></div>

    <section id="brand-statement"><!-- ブランドステートメント ★対称 --></section>

    <section id="specialty-dialysis"><!-- 透析ケア ★非対称 --></section>
    <section id="specialty-pediatric"><!-- 小児ケア ★非対称（反転） --></section>
    <section id="specialty-psychiatric"><!-- 精神科ケア ★対称 --></section>

    <div class="wave-divider" aria-hidden="true"><!-- SVG --></div>
    <section id="values"><!-- 4つの価値観 ★対称（NEW） --></section>

    <div class="wave-divider" aria-hidden="true"><!-- SVG --></div>
    <section id="testimonials"><!-- 利用者の声 横スクロール --></section>

    <div class="wave-divider" aria-hidden="true"><!-- SVG --></div>
    <section id="recruit"><!-- 採用セクション ★非対称 --></section>

    <div class="wave-divider" aria-hidden="true"><!-- SVG --></div>
    <section id="flow-overview"><!-- 利用の流れ ★対称 --></section>

    <div class="wave-divider" aria-hidden="true"><!-- SVG --></div>
    <section id="news-diary"><!-- お知らせ＋ダイアリー --></section>

    <section id="contact-cta"><!-- お問い合わせCTA ★対称 --></section>
  </main>

  <!-- モバイル固定フッターバー -->
  <div class="md:hidden fixed bottom-0 ...">...</div>

  <script src="shared-layout.js"></script>
  <script>
    // ロゴ画像注入
    // Intersection Observer（スクロールアニメーション）
    // ヒーロー即時表示
  </script>
</body>
</html>
```

---

## 7. 画像素材

| セクション | ファイル | 備考 |
|---|---|---|
| ヒーロー | `assets/img/hero1.jpeg` | スタッフと利用者が笑顔で会話 |
| ロゴ | `assets/img/smile訪問看護ステーション_logo.png` | 丸型パープルバッジ |
| 透析ケア | `assets/img/hero2.jpeg` | ケアの様子 |
| 小児ケア | `assets/img/instagram2.jpeg` | 代用 |
| 精神科ケア | `assets/img/instagram4.jpeg` | 代用 |
| 採用 | `assets/img/studysession.jpeg` | スタッフの様子 |
| ダイアリー1 | `assets/img/new colleague.jpeg` | 新スタッフ |
| ダイアリー2 | `assets/img/studysession.jpeg` | 勉強会 |
| ダイアリー3 | `assets/img/instagram4.jpeg` | 日常 |

---

## 8. コピーライティング（各セクションの原稿）

以下のテキストをそのまま実装に使用すること。信頼性・温かみ・専門性のバランスを意識したコピー。

### Section 1: ヒーロー

- **メインコピー（h1）:**
  ```
  あなたの「やりたい」を、
  確かな医療で支える。
  ```
- **サブコピー（英字）:**
  ```
  Design Life, Empower Choice
  ```
- **リード文:**
  ```
  尼崎市を拠点に、透析・小児・精神科ケアの専門知識と
  家族のような温かな対話で、在宅での安心をお届けします。
  ```
- **CTAボタン:** 「ご利用を検討中の方」「お問い合わせ」

### Section 2: ブランドステートメント

- **ステートメント（h2）:**
  ```
  自分らしく生きる力を支え、
  共に幸せを紡ぎ続ける。
  ```
- **説明文:**
  ```
  2024年4月、尼崎に開設。
  透析ケアに強みを持つ訪問看護ステーションとして、
  地域の皆さまの「その人らしい暮らし」に寄り添っています。
  ```

### Section 3-A: 透析ケア

- **ラベル:** `SPECIALTY 01`
- **見出し（h3）:** `透析に、強い。`
- **本文:**
  ```
  シャント管理、食事・水分管理、バイタル変化の予測的ケア。
  透析クリニックでの豊富な経験を持つスタッフが、
  通院と在宅療養の両立を安全にサポートします。
  ```
- **バッジ:** `尼崎でも希少な透析特化型`
- **リンク:** `サービス内容を詳しく見る →`

### Section 3-B: 小児・育児ケア

- **ラベル:** `SPECIALTY 02`
- **見出し（h3）:** `子どもと、家族と。`
- **本文:**
  ```
  医療的ケアが必要なお子様の健康観察から、
  ご家族のレスパイト、育児への不安に寄り添うサポートまで。
  NICU経験のある助産師を含む専門スタッフが、
  ご家庭に安心をお届けします。
  ```
- **リンク:** `サービス内容を詳しく見る →`

### Section 3-C: 精神科ケア

- **ラベル:** `SPECIALTY 03`
- **見出し（h3）:** `対話を、大切に。`
- **本文:**
  ```
  心の不調を抱える方が、住み慣れた地域で安心して暮らせるように。
  じっくりとした対話を通じて、服薬管理や生活リズムの
  立て直しを一緒に考えます。
  ```
- **リンク:** `サービス内容を詳しく見る →`

### Section 4: 4つの価値観

- **見出し（h2）:** `smileが大切にしていること`
- **4つの値:**
  1. **主体性** — 自分で選び、自分で動く力を信じる
  2. **共感と協働** — 異なる価値観を尊重し、共に歩む
  3. **成長と探求** — 学び続け、より良いケアを追求する
  4. **笑顔の連鎖** — 一つの笑顔が、次の笑顔を生む

### Section 5: 利用者の声

- **見出し（h2）:** `あなたの声が、私たちの力。`
- **引用1:**
  ```
  ちょっとした不安を相談できる場所があるだけで、
  毎日が安心に変わりました。
  ```
  — Y.T さん（48歳）透析治療中
- **引用2:**
  ```
  一人暮らしでも、定期的に来てもらえるだけで
  生活が明るくなりました。
  ```
  — H.K さん（64歳）一人暮らし
- **引用3:**
  ```
  医師に聞きにくい小さな疑問も、
  看護師さんに気軽に相談できてとても助かっています。
  ```
  — M.S さん（52歳）ご家族
- **リンク:** `ご利用者様の声をもっと見る →`

### Section 6: 採用セクション

- **見出し（h2）:** `"自分らしく働く"という選択肢。`
- **サブコピー:** `Design Life, Empower Choice — for our staff, too.`
- **タイムライン項目:**
  1. **直行直帰OK・ITフル活用**
     ```
     iPad・専用ソフト・LINEワークスを活用した効率的な働き方。
     無駄な移動を減らし、ケアに集中できる環境です。
     ```
  2. **透析・小児・精神科の専門性を磨ける**
     ```
     勉強会や症例検討を通じて、確かなスキルアップが可能。
     成長と探求を応援する風土があります。
     ```
  3. **子育て中、ダブルワーク、フリーランス。多様な仲間がいる。**
     ```
     お弁当持ち寄りの日もあるアットホームな雰囲気。
     一人ひとりの「自分らしい働き方」を尊重します。
     ```
- **CTAボタン:** 「採用情報を見る」「エントリーフォーム」

### Section 7: 利用の流れ

- **見出し:** `はじめての方へ`
- **サブ:** `── ご利用の流れ ──`
- **ステップ:** お問い合わせ → 主治医確認 → 面談 → 契約 → ケア開始
- **リンク:** `詳しい流れを見る →`

### Section 8: お知らせ＋スタッフダイアリー

- **お知らせ見出し:** `お知らせ`
- **ダイアリー見出し:** `スタッフダイアリー`
- **お知らせ項目:**
  - 2024.04.01 — 兵庫県尼崎市にオープンいたしました
  - 2024.04.10 — smileダイアリーを更新しました
  - 2024.04.15 — Instagramを開設しました
- **リンク:** 「一覧を見る →」「Instagramもチェック ↗」

### Section 9: お問い合わせCTA

- **見出し（h2）:** `まずは、小さな気がかりから。`
- **電話番号:** `06-4950-6402`
- **受付時間:** `平日 9:00〜18:00`
- **CTAボタン:** `お問い合わせフォーム`
- **住所:**
  ```
  〒661-0012 兵庫県尼崎市南塚口町8丁目41-7 南塚口ハイツ101号
  受付時間：平日 9:00〜18:00（土日祝除く）
  ```

---

## 9. 実装時の注意事項

1. **スマホファースト**: ベーススタイルをすべてモバイル向けに記述し、`md:` `lg:` でスケールアップ。
2. **カード型UI禁止**: 四角い枠で囲むカードは使わない。背景色・余白・丸形色面で区分。
3. **shared-layout.js は変更しない**: CSS オーバーライド + JS によるロゴ画像注入で対応。
4. **タッチターゲット**: すべてのインタラクティブ要素は最小 44×44px のタップ領域を確保。
5. **画像**: `loading="lazy"`（ヒーロー以外）、`aspect-ratio` で CLS 防止。
6. **アクセシビリティ**: WCAG AA コントラスト準拠。装飾SVGには `aria-hidden="true"`。Wave SVG には `aria-hidden="true"`。
7. **段階的実装**: HTML構造 → Tailwind基本レイアウト → 装飾（ハーフトーン/Blob/Wave） → アニメーション の順。
