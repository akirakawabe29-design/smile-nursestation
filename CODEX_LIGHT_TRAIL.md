# 🌟 先導する儚い光エフェクト — Codex実装指示書

## 概要

ページ全体を縦に貫くSVGパスに沿って、**スクロールの少し先を走る1つの儚い光**が次のコンテンツへ誘導する。

- 軌跡ライン（trail）は**無し** — 光の本体だけのシンプル実装
- 光量は**強め** — はっきり存在感がありつつ、輪郭は滲んで儚い
- スクロールより**常に少し先**にいて、次のセクションを照らす

### イメージ

```
  ユーザーが見ているエリア
  ─────────────────────────
  BRAND STATEMENT
  ─────────────────────────

      .::*✧*::.     ← 光はここ（画面の少し先）
         ╲               次の NEWS セクションを誘導
  NEWS    ╲
           ╲
```

### 光の見た目

```
  ❌ 固い丸: ●
  ❌ 弱すぎ: .  .  .

  ✅ 目指す表現:

        . · * · .
      . · * ✧ * · .    ← 中心が明るく、周囲がふわっと滲む
        . · * · .        はっきり見えるが輪郭がない
                         「光」であり「物体」ではない
```

---

## 技術スタック

| 項目 | 状態 |
|------|------|
| GSAP 3.12.5 | ✅ 導入済み |
| ScrollTrigger | ✅ 導入済み |
| MotionPathPlugin | 🆕 追加 |

### CDN追加（既存GSAPの後に）

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"></script>
```

```javascript
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
```

---

## 前提: 既存HTMLの掃除

`<div class="light-trail-section">` ブロック（以前の実装残り）を削除し、元のシンプルな波に戻す:

```html
<svg class="wave-divider" viewBox="0 0 1440 60" preserveAspectRatio="none" style="margin-top:-2px; display:block;">
  <path d="M0,30 C240,55 480,5 720,35 C960,65 1200,15 1440,40 L1440,60 L0,60Z" fill="#FDFBFF"/>
</svg>
```

CSSの `.light-trail-section` ルールもあれば削除。

---

## Step 1: HTML

`<section id="greeting">` の **直前** に追加:

```html
<!-- ═══ Leading Ethereal Light ═══ -->
<div id="light-trail-container" aria-hidden="true" style="
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 50;
  overflow: visible;
">
  <svg id="light-trail-svg" style="
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    overflow: visible;
  ">
    <defs>
      <!-- ★ 儚い光フィルター — 3段階ぼかし（光量強め） -->
      <filter id="ethereal-glow" x="-300%" y="-300%" width="700%" height="700%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="outerBlur"/>
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="midBlur"/>
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="coreBlur"/>
        <feMerge>
          <feMergeNode in="outerBlur"/>
          <feMergeNode in="outerBlur"/>  <!-- ★ 外層2回重ね = 光量UP -->
          <feMergeNode in="midBlur"/>
          <feMergeNode in="midBlur"/>    <!-- ★ 中間層も2回 -->
          <feMergeNode in="coreBlur"/>
        </feMerge>
      </filter>
    </defs>

    <!-- 移動パス（JSで動的セット / 非表示） -->
    <path id="light-path" fill="none" stroke="none"/>

    <!--
      ★ 儚い光の本体 — 多層ellipseで輪郭のない光
      光量強め: opacity値を高く、feMergeNodeを重複で増幅
    -->
    <g id="light-spirit">
      <!-- 最外層: 広いオーラ（紫）— 存在感を出す -->
      <ellipse rx="50" ry="35"
               fill="#DA9BEA" opacity=".18"
               filter="url(#ethereal-glow)"/>
      <!-- 中間層: 暖かい光（黄）— メインの光 -->
      <ellipse rx="20" ry="14"
               fill="#F4DF2C" opacity=".4"
               filter="url(#ethereal-glow)"/>
      <!-- 中心: 白い芯 — 目を引くコア -->
      <ellipse rx="5" ry="4"
               fill="#FFFFFF" opacity=".7"
               filter="url(#ethereal-glow)"/>
    </g>
  </svg>
</div>
```

---

## Step 2: CSS

```css
/* ── Leading Ethereal Light ── */
body { position: relative; }

#light-trail-container {
  height: 0;               /* JSでページ全高にセット */
  mix-blend-mode: screen;  /* ★ 背景と光が溶け合う */
}

#light-spirit {
  will-change: transform, opacity;
}

/* モバイル: 少し小さめ（でも見える光量は維持） */
@media (max-width: 767px) {
  #light-spirit ellipse:nth-child(1) { rx: 35; ry: 25; }
  #light-spirit ellipse:nth-child(2) { rx: 14; ry: 10; }
  #light-spirit ellipse:nth-child(3) { rx: 4;  ry: 3;  }
}

/* アクセシビリティ */
@media (prefers-reduced-motion: reduce) {
  #light-trail-container { display: none !important; }
}
```

---

## Step 3: JavaScript

GSAP セクション末尾に追加:

```javascript
/* ══════ Leading Ethereal Light ══════ */
(function initLeadingLight() {
  if (prefersRM) return;

  var container = document.getElementById('light-trail-container');
  var svgEl     = document.getElementById('light-trail-svg');
  var pathEl    = document.getElementById('light-path');
  var spirit    = document.getElementById('light-spirit');
  if (!container || !pathEl || !spirit) return;

  /* ── パス生成 ── */
  function buildPath() {
    var pageH    = document.documentElement.scrollHeight;
    var pageW    = window.innerWidth;
    var isMobile = pageW < 768;

    container.style.height = pageH + 'px';
    svgEl.setAttribute('viewBox', '0 0 ' + pageW + ' ' + pageH);
    svgEl.style.height = pageH + 'px';

    /* Hero波なぞり（導入） */
    var heroEl = document.getElementById('greeting');
    if (!heroEl) return null;
    var heroBottom = heroEl.getBoundingClientRect().top + window.scrollY + heroEl.offsetHeight;
    var waveY = heroBottom - 30;
    var waveAmp = isMobile ? 15 : 25;
    var waveStartX = isMobile ? -10 : -20;
    var waveEndX   = isMobile ? pageW * 0.7 : pageW * 0.55;
    var waveSteps  = 6;
    var waveSegW   = (waveEndX - waveStartX) / waveSteps;

    var d = 'M' + waveStartX + ',' + waveY;
    for (var i = 0; i < waveSteps; i++) {
      var qx = waveStartX + waveSegW * i + waveSegW * 0.5;
      var qx2 = waveStartX + waveSegW * (i + 1);
      var yOff = (i % 2 === 0) ? -waveAmp : waveAmp;
      d += ' Q' + qx + ',' + (waveY + yOff) + ' ' + qx2 + ',' + waveY;
    }

    /* 波→縦パス遷移 */
    var transX = waveEndX;
    var transY = waveY + 80;
    d += ' Q' + transX + ',' + (waveY + 40) + ' ' + transX + ',' + transY;

    /* 各セクションを縫うS字 */
    var sels = ['#brand-statement', '#services', '#values', '#voices', '#recruit'];
    var amplitude = isMobile ? pageW * 0.2 : pageW * 0.28;
    var centerX = pageW / 2;
    var prevX = transX, prevY = transY;

    sels.forEach(function(sel, idx) {
      var el = document.querySelector(sel);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var secMid = rect.top + window.scrollY + rect.height * 0.5;
      var targetX = centerX + ((idx % 2 === 0) ? amplitude : -amplitude);
      var cpY = prevY + (secMid - prevY) * 0.5;
      d += ' C' + prevX + ',' + cpY + ' ' + targetX + ',' + cpY + ' ' + targetX + ',' + secMid;
      prevX = targetX;
      prevY = secMid;
    });

    /* フィニッシュ */
    var endY = pageH - 150;
    var cpEndY = prevY + (endY - prevY) * 0.5;
    d += ' C' + prevX + ',' + cpEndY + ' ' + centerX + ',' + cpEndY + ' ' + centerX + ',' + endY;

    pathEl.setAttribute('d', d);
    return d;
  }

  /* ── アニメーション ── */
  function setupAnimation() {
    var pathLength = pathEl.getTotalLength();
    if (!pathLength) return;

    ScrollTrigger.getAll().forEach(function(st) {
      if (st.vars && st.vars.id === 'leadingLight') st.kill();
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        id: 'leadingLight',
        trigger: document.documentElement,
        start: 'top top',
        end: '92% bottom',   // ★ 8%先導（scroll92%で光がゴール到達）
        scrub: 0.3            // ★ ほぼリアルタイム追従（遅延なし）
      }
    });

    /* 光をパスに沿って移動 */
    tl.to(spirit, {
      motionPath: {
        path: pathEl,
        align: pathEl,
        alignOrigin: [0.5, 0.5],
        autoRotate: false
      },
      ease: 'none',
      duration: 1
    }, 0);

    /* フェードイン（ふわっと現れる） */
    tl.fromTo(spirit,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.05, ease: 'power2.out' },
    0);

    /* フェードアウト（溶けるように消える） */
    tl.to(spirit, {
      opacity: 0,
      scale: 1.8,     // 広がりながら消える = 儚い
      duration: 0.08,
      ease: 'power1.in'
    }, 0.92);

    /* ★ 呼吸アニメーション（光量の揺らぎ = 生きてる感＋儚さ） */
    var outerEllipse = spirit.querySelector('ellipse:first-child');
    if (outerEllipse) {
      gsap.to(outerEllipse, {
        attr: { rx: 60, ry: 45 },
        opacity: 0.12,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    var midEllipse = spirit.querySelectorAll('ellipse')[1];
    if (midEllipse) {
      gsap.to(midEllipse, {
        opacity: 0.5,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });
    }
  }

  /* ── 初期化 ── */
  function init() {
    var pathData = buildPath();
    if (pathData) setupAnimation();
  }

  setTimeout(init, 1000);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function() { setTimeout(init, 300); });
  }

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      init();
      ScrollTrigger.refresh();
    }, 400);
  });
})();
```

---

## 先導ロジック図解

```
  scroll:  0%      25%      50%      75%      92%    100%
           |--------|--------|--------|--------|-------|
  光:      8%      33%      58%      83%     100%   (消滅)
           |--------|--------|--------|--------|

  → 常にスクロールの8%先を走る
  → scrub:0.3 でほぼ遅延なく即座に位置更新
```

### 先導度の調整
```
end: '92% bottom'  → 8%先導（推奨・自然）
end: '85% bottom'  → 15%先導（かなり先）
end: '95% bottom'  → 5%先導（わずかに先）
```

---

## 光量の調整ガイド

### 現在の設定（強め）

| 層 | サイズ | opacity | blur | 役割 |
|----|--------|---------|------|------|
| 最外層 | rx=50 ry=35 | `.18` | 20 | 広い紫のオーラ |
| 中間層 | rx=20 ry=14 | `.4` | 8 | 黄の主光源 |
| 中心 | rx=5 ry=4 | `.7` | 3 | 白い芯 |
| feMerge | — | — | — | 外層・中間層を2回重ね=増幅 |

### もっと強くしたい場合
- feMergeNode の重複を3回に（`<feMergeNode in="outerBlur"/>` を3つ）
- 中間層 opacity `.4` → `.55`
- 中心 opacity `.7` → `.85`
- `mix-blend-mode: screen` → `normal` に変えると白背景でも消えない

### 弱めたい場合
- feMergeNode の重複を1回に
- 各層の opacity を半分に

---

## 注意事項

### 1. shared-layout.js — 絶対に変更しない

### 2. パフォーマンス
- feGaussianBlur stdDeviation=20 は GPU 負荷あり
- モバイルで重い場合: stdDeviation を 20→14 に縮小
- `will-change: transform` で GPU レイヤー化済み

### 3. mix-blend-mode: screen
- 白背景: 光は柔らかく溶け込む
- 暗い背景: 光が映えて美しい
- 完全に白い箇所では光が薄くなりすぎる場合 → `normal` に変更

### 4. body position
```css
body { position: relative; }
```

---

## ファイル変更箇所

```
index.html
├── <style>
│   ├── body { position: relative; }
│   ├── #light-trail-container（mix-blend-mode: screen）
│   ├── #light-spirit（will-change）
│   ├── @media モバイルサイズ調整
│   ├── @media prefers-reduced-motion
│   └── .light-trail-section 削除
│
├── <body>
│   ├── #greeting 直前に #light-trail-container 追加
│   └── 旧 .light-trail-section → 元の wave-divider に差し戻し
│
└── <script>
    ├── MotionPathPlugin CDN
    ├── gsap.registerPlugin 更新
    └── initLeadingLight() 追加
```

---

## テスト項目

- [ ] 光がスクロール位置の少し先を走っている
- [ ] スクロールを止めると光は少し先で留まる
- [ ] 上にスクロールすると光も戻る
- [ ] 光に固い輪郭がない（ふわっと滲んでいる）
- [ ] 光量が十分で、はっきり存在が分かる
- [ ] 光が呼吸するように微かに脈動している
- [ ] 波なぞり（導入）→ S字（本編）の遷移が自然
- [ ] デスクトップ: オーラが広く美しい
- [ ] モバイル: 少し小さいが存在感あり、横はみ出しなし
- [ ] `prefers-reduced-motion` で非表示
- [ ] リンク・ボタンのクリックを妨げない
- [ ] リサイズでパス再構築
- [ ] 既存GSAPと干渉しない
- [ ] 60fps 維持
