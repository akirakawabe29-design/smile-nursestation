# Codex 引き継ぎドキュメント — index.html リデザイン

## 概要

`index.html` を「Lavender POP」デザインシステム v3 でリデザイン中。
Tailwind CSS (CDN) + Vanilla JS + GSAP 3.12.5 + ScrollTrigger で構築。
`shared-layout.js` はヘッダー/フッターを動的に注入するファイルで **編集禁止**（CSS overrideのみ可）。

---

## 完了済みの作業

### 1. デザインシステム v3 (Lavender POP)
- カラーパレット: `brand: #CB6CE6`, `brand-dark: #9B4DCA`, `accent: #F4DF2C` 等
- フォント: M PLUS Rounded 1c (見出し) / Noto Sans JP (本文) / Zen Kurenaido (手書きアクセント)
- パターン背景: `.bg-dots-lavender`, `.bg-stripe-lavender`, `.bg-dots-dense`, `.bg-crosshatch`
- shared-layout.js の CSS override (ヘッダー/フッター → ラベンダーカラーに統一)

### 2. フッターリデザイン
- ネイビー系 → ラベンダーグラデーション (`#8B5FBF → #4A2D7A`) + ハーフトーンドット
- 全てCSSの `!important` overrideで実装（shared-layout.js 未編集）

### 3. ヒーローセクション
- 有機的blob形状のSVGマスクで写真を「フレーミング」する構造を実装
- デスクトップ用 (`desktop-blob`) とモバイル用 (`mobile-blob`) を分離
- 自動スライド写真切り替え (5秒間隔、`hero1.jpeg` / `hero2.jpeg`)
- GSAP timeline でテキスト入場アニメーション (left → bottom → scale → right)
- smile wave の GSAP yoyo フロートアニメーション

### 4. GSAP ScrollTrigger アニメーション (9個登録済み)
- Brand Statement: 下からフェードイン
- Service Cards: 左からスタガー
- Guide Cards: 交互に左右から
- Values Circles: スケールイン (back ease)
- Instagram Photos: 右からスライド
- Diary Cards: 下からスライド
- Recruit: タイトルフェードイン + ボタンスケールイン

### 5. セクション構成
Hero → Brand Statement → News → Services (3枚カード) → Guide (2枚) → Values (4つ) → About/Message → Flow/FAQ → Instagram → Diary → Recruit → Mobile Fixed Footer

---

## 🔴 修正必要箇所 (優先度順)

### BUG-1: ヒーローセクション — テキストと写真の重なり問題 (★最優先)

**現象**: デスクトップ(1280px)で、h1テキスト（left:315, right:964）がSVGのblob cutout内（写真が見える領域）と完全に重なり、テキストが写真の上に乗って読みにくい。

**原因**: `hero-text-area` が `text-align:center` で全幅配置され、blob cutout も中央に大きく開いているため、両方が同じ空間を占有。

**修正案**:
- **案A (推奨)**: genki-zaitaku.jp のように左右分割レイアウトに変更。テキストを左側に寄せ（`text-align:left`, `max-width:50%`）、blob cutout を右側に配置。
- **案B**: blob cutout を左上～中央の小さい領域に制限し、テキストを下半分に配置。テキスト背景に半透明ラベンダーの backdrop を追加。
- **案C**: テキスト領域に `backdrop-filter: blur(8px)` + 半透明背景色を設定し、写真の上でも読めるようにする。

**対象ファイル**: `index.html` 行 253-350 (ヒーローセクション)

**関連CSS**: 行 68-103 (hero-gallery, hero-text-area, hero-blob-mask)

**関連SVG**: デスクトップ blob（evenodd fill-rule パス）の座標を調整するか、テキスト配置を変更。

```
現在のSVGカットアウト (1440x900 viewBox):
M360,100 ... → 中央に大きな有機的窓を開けている
→ テキストを左寄せにする場合、カットアウトを右半分(x:600~1400)に移動
```

---

### BUG-2: モバイル(375px) — GUIDEセクションの水平オーバーフロー

**現象**: Guide セクションのカード（FOR USERS / FOR PARTNERS）の `scrollWidth` が435pxで、375pxビューポートを超える。`html, body { overflow-x: hidden }` で横スクロールは防止済みだが、コンテンツが視覚的にはみ出す。

**原因**: カード内の `flex flex-col md:flex-row` レイアウトでモバイル時にカード自体が親コンテナを超える。`border-2` + `rounded-2xl` のボックスモデルが `box-sizing` の影響で幅超過。

**修正方法**:
```css
/* Guide カード幅制限 */
.space-y-4 > a { max-width: 100%; box-sizing: border-box; }
```
または親コンテナの `.section-container` に `overflow: hidden` を追加。

**対象**: `index.html` 行 543-590

---

### BUG-3: GSAP smile wave アニメーション — モバイルSVGと非整合

**現象**: `.js-smile-wave` の GSAP アニメーション(行884)がデスクトップ用の `1440x900` viewBox のパスデータをターゲットにしているが、モバイル用 SVG (`mobile-blob`, viewBox `375x812`) にも同じクラスが付いており、モバイルでは不正なパスアニメーションになる。

**修正方法**:
```javascript
// モバイル用は別のパスデータでアニメーション、またはモバイルの .js-smile-wave を別クラスに変更
if (window.innerWidth >= 768) {
  gsap.to('.desktop-blob .js-smile-wave', { ... });
} else {
  gsap.to('.mobile-blob .js-smile-wave', {
    attr: { d: 'M0,680 C80,640 180,720 280,670 ...' }, // モバイル用パス
    ...
  });
}
```

**対象**: `index.html` 行 883-886

---

### BUG-4: ヘッダーのモバイルはみ出し

**現象**: `shared-layout.js` が生成するヘッダーが404pxで375pxを超える。

**現在の対策**: `max-width:100vw; overflow-x:hidden` を `.sn-shared-header` に適用済み（行196付近）。

**追加修正**: ヘッダー内のナビボタン群がモバイルで幅を取りすぎている可能性。`shared-layout.js` は編集不可なので、CSSで対応:
```css
@media (max-width: 767px) {
  .sn-shared-header nav { max-width: 100%; overflow: hidden; }
  .sn-shared-header .sn-nav-buttons { display: none; } /* モバイルではハンバーガーメニューに集約 */
}
```

---

### IMPROVE-1: ヒーロー写真の `background-position` モバイル調整

**現象**: モバイルでのblob cutoutから見える写真の構図が人物の端部分になりやすい。

**修正**: モバイル用の `background-position` をCSS変数やメディアクエリで調整:
```css
@media (max-width: 767px) {
  .hero-photo-slide { background-position: 60% center; }
}
```

---

### IMPROVE-2: デスクトップ ナビリンク消失

**現象**: スクロール位置0でヘッダーに `sn-hero-transparent` クラスが付与され、背景が透明になる。ナビリンクテキストも白系の場合、写真の上で見えなくなる。

**修正**: ヒーロー上でのヘッダーテキスト色を暗色に維持する:
```css
.sn-shared-header.sn-hero-transparent .sn-link { color: #2D2D3A !important; }
.sn-shared-header.sn-hero-transparent .sn-logo { color: #CB6CE6 !important; }
```

---

### IMPROVE-3: サービスセクション GSAP — `#services` セレクタが存在しない

**現象**: 行897の `gsap.from('#services article', {...})` だが、HTMLに `id="services"` を持つセクションがない場合、アニメーションが発火しない。

**修正**: サービスセクションの`<section>`に `id="services"` を追加するか、セレクタを正しいものに変更。

---

## ファイル構成

```
smile_nursing/
├── index.html          ← 【編集対象】メインファイル (940行)
├── index-new.html      ← 旧バージョン（使用しない）
├── shared-layout.js    ← ★編集禁止★ ヘッダー/フッター注入
├── .claude/
│   └── server.js       ← プレビューサーバー (port 8080, index.html配信)
└── assets/img/
    ├── hero1.jpeg
    ├── hero2.jpeg
    ├── instagram2.jpeg
    ├── instagram4.jpeg
    ├── studysession.jpeg
    ├── new colleague.jpeg
    └── smile訪問看護ステーション_logo.png
```

## 技術スタック

| 技術 | バージョン/CDN |
|------|---------------|
| Tailwind CSS | CDN (`cdn.tailwindcss.com`) |
| GSAP | 3.12.5 (CDN) |
| ScrollTrigger | GSAP 3.12.5 plugin (CDN) |
| Google Fonts | M PLUS Rounded 1c, Noto Sans JP, Zen Kurenaido |

## デザイン参考

- [genki-zaitaku.jp](https://genki-zaitaku.jp/) — ヒーロー画像の有機的グラフィック形状マスク参考
- テイスト: 女性が好むPOPなイラスト風、アメコミ風ドット柄・斜めライン、手書きフォントアクセント

---

## 作業の進め方

1. **BUG-1 (ヒーロー テキスト×写真 重なり)** を最優先で修正 — デスクトップで左右分割レイアウトにするのが最も効果的
2. **BUG-2 (GUIDE オーバーフロー)** — カードの `box-sizing` と幅制約を修正
3. **BUG-3 (wave アニメーション)** — モバイル/デスクトップで分岐
4. 残りのIMPROVEは余力があれば対応
