(function () {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const pageKey = (() => {
    if (path === '' || path === 'index.html') return 'home';
    if (path === 'about.html') return 'about';
    if (path === 'diary.html') return 'diary';
    if (path === 'users.html') return 'users';
    if (path === 'user-feedback.html') return 'voices';
    if (path === 'service.html') return 'service';
    if (path === 'flow.html') return 'flow';
    if (path === 'faq.html') return 'faq';
    if (path === 'recruit.html') return 'recruit';
    if (path === 'medical-institutions.html') return 'medical';
    if (path === 'contact.html') return 'contact';
    return 'other';
  })();

  const needsBodyOffset = new Set(['about', 'voices', 'entry']).has(pageKey) || path === 'entry.html';

  function injectStyles() {
    if (!document.querySelector('link[data-sn-shared-fonts]')) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.dataset.snSharedFonts = '1';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap';
      document.head.appendChild(fontLink);
    }
    if (document.getElementById('sn-shared-layout-style')) return;
    const style = document.createElement('style');
    style.id = 'sn-shared-layout-style';
    style.textContent = `
      .sn-shared-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background: rgba(255,255,255,.94);
        backdrop-filter: blur(10px);
        box-shadow: 0 1px 10px rgba(15,23,42,.08);
        border-bottom: 1px solid rgba(226,232,240,.8);
        font-family: "Noto Sans JP", sans-serif;
        max-width: 100vw;
        overflow: visible;
        box-sizing: border-box;
      }
      .sn-shared-wrap {
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 16px;
      }
      .sn-shared-header .sn-row {
        min-height: 68px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .sn-logo {
        color: #CB6CE6;
        text-decoration: none;
        font-family: "M PLUS Rounded 1c", sans-serif;
        font-weight: 700;
        font-size: 1.05rem;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .sn-logo-mark {
        width: 32px;
        height: 32px;
        border-radius: 999px;
        flex: 0 0 32px;
      }
      .sn-brand-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        white-space: nowrap;
      }
      .sn-logo-text {
        display: inline-block;
        min-width: 0;
        line-height: 1.2;
      }
      @media (min-width: 768px) { .sn-logo { font-size: 1.35rem; } }
      .sn-shared-header .sn-desktop-row { display: none; }
      .sn-desktop-nav { display: none; }
      .sn-mobile-toggle { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff; color: #374151; }
      @media (min-width: 1280px) {
        .sn-shared-header .sn-mobile { display: none; }
        .sn-mobile-toggle { display: none; }
        .sn-shared-header .sn-desktop-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .sn-desktop-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }
      }
      .sn-link {
        color: #374151;
        text-decoration: none;
        white-space: nowrap;
        transition: color .2s ease;
      }
      .sn-link:hover, .sn-link.sn-active { color: #CB6CE6; }
      .sn-dropdown { position: relative; }
      .sn-dropdown-trigger {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .sn-caret { width: 14px; height: 14px; color: #9ca3af; transition: color .2s ease, transform .2s ease; }
      .sn-dropdown:hover .sn-caret { color: #CB6CE6; }
      .sn-dropdown-menu {
        position: absolute;
        left: 0;
        top: 100%;
        padding-top: 10px;
        min-width: 220px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-4px);
        transition: opacity .18s ease, transform .18s ease, visibility .18s ease;
        z-index: 1001;
      }
      .sn-dropdown:hover .sn-dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
      .sn-dropdown-panel {
        background: #fff;
        border: 1px solid #f1f5f9;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(15,23,42,.12);
        padding: 8px;
      }
      .sn-dropdown-panel a {
        display: block;
        padding: 9px 12px;
        border-radius: 12px;
        color: #374151;
        text-decoration: none;
        transition: background .2s ease, color .2s ease;
      }
      .sn-dropdown-panel a:hover, .sn-dropdown-panel a.sn-active { background: #F3E8F9; color: #CB6CE6; }
      .sn-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 12px;
        font-weight: 700;
        text-decoration: none;
        white-space: nowrap;
        transition: all .2s ease;
      }
      .sn-btn-users { border: 1px solid #DA9BEA; background: #F3E8F9; color: #CB6CE6; }
      .sn-btn-users:hover { background: #E8D4F5; }
      .sn-btn-recruit { border: 1px solid #F4DF2C; background: #FBF6D0; color: #7a6200; }
      .sn-btn-recruit:hover { background: #F4DF2C; color: #2D2D3A; }
      .sn-btn-medical { border: 1px solid #DA9BEA; background: #F8F0FC; color: #9B4DCA; }
      .sn-btn-medical:hover { background: #F3E8F9; }
      .sn-btn-contact { background: #CB6CE6; color: #fff; }
      .sn-btn-contact:hover { background: #b855d4; }

      .sn-mobile-panel {
        display: none;
        border-top: 1px solid #f1f5f9;
        background: rgba(255,255,255,.98);
      }
      .sn-mobile.is-open + .sn-mobile-panel { display: block; }
      .sn-mobile-content { padding: 12px 0 14px; }
      .sn-mobile-links, .sn-mobile-sub { display: grid; gap: 6px; }
      .sn-mobile-links a, .sn-mobile-sub a {
        color: #374151;
        text-decoration: none;
        padding: 10px 12px;
        border-radius: 10px;
      }
      .sn-mobile-links a:hover, .sn-mobile-sub a:hover { background: #F3E8F9; }
      .sn-mobile-group {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 8px;
        margin-bottom: 8px;
        background: #fff;
      }
      .sn-mobile-group > div {
        font-weight: 700;
        color: #374151;
        padding: 6px 8px 8px;
        font-size: 13px;
      }
      .sn-mobile-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
      .sn-mobile-btns .sn-btn { padding: 10px 12px; font-size: 13px; }

      /* ── Footer ── */
      .sn-shared-footer {
        background: linear-gradient(170deg, #E8D5F5 0%, #D4B8ED 30%, #C09DE5 60%, #9B4DCA 100%);
        color: #fff;
        padding: 0;
        font-family: "Noto Sans JP", sans-serif;
        position: relative;
        overflow: hidden;
      }
      .sn-shared-footer::before {
        content: '';
        position: absolute;
        top: -80px; right: -60px;
        width: 360px; height: 360px;
        background: radial-gradient(circle, rgba(244,223,44,.1) 0%, transparent 70%);
        pointer-events: none;
      }
      .sn-shared-footer::after {
        content: '';
        position: absolute;
        bottom: -60px; left: -40px;
        width: 300px; height: 300px;
        background: radial-gradient(circle, rgba(255,255,255,.06) 0%, transparent 70%);
        pointer-events: none;
      }

      /* Bold CTA below right nav */
      .sn-footer-cta-compact {
        margin-top: 36px;
        grid-column: 1 / -1;
      }
      .sn-footer-cta-msg {
        color: #fff;
        font-family: "M PLUS Rounded 1c", sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 16px;
        text-shadow: 0 1px 6px rgba(100,30,140,.15);
      }
      .sn-footer-cta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        align-items: center;
      }
      .sn-footer-cta-phone {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(255,255,255,.18);
        border: 2px solid rgba(255,255,255,.4);
        border-radius: 999px;
        padding: 14px 30px;
        color: #fff;
        text-decoration: none;
        font-weight: 800;
        font-size: 1.2rem;
        letter-spacing: .04em;
        transition: all .3s;
      }
      .sn-footer-cta-phone:hover {
        background: rgba(255,255,255,.3);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,.15);
      }
      .sn-footer-cta-phone svg { width: 22px; height: 22px; flex: 0 0 22px; }
      .sn-footer-cta-hours {
        font-size: 11px; font-weight: 400; opacity: .65; margin-left: 4px;
      }
      .sn-footer-cta-mail {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: #F4DF2C;
        color: #2D2D3A;
        border-radius: 999px;
        padding: 14px 30px;
        font-weight: 800;
        font-size: 1.2rem;
        text-decoration: none;
        letter-spacing: .04em;
        box-shadow: 0 4px 16px rgba(244,223,44,.35);
        transition: all .3s;
      }
      .sn-footer-cta-mail:hover {
        background: #fff;
        color: #9B4DCA;
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(0,0,0,.2);
      }
      .sn-footer-cta-mail svg { width: 22px; height: 22px; flex: 0 0 22px; }

      /* Footer Main */
      .sn-footer-main {
        display: grid;
        gap: 40px;
        padding: 56px 0 48px;
        position: relative;
        z-index: 1;
      }
      @media (min-width: 768px) {
        .sn-footer-main { grid-template-columns: 280px 1fr; gap: 56px; }
      }
      @media (min-width: 1024px) {
        .sn-footer-main { grid-template-columns: 300px 1fr; gap: 80px; }
      }
      .sn-footer-brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: #fff;
        text-decoration: none;
        font-weight: 700;
        font-family: "M PLUS Rounded 1c", sans-serif;
        font-size: 1.1rem;
        margin-bottom: 16px;
        transition: opacity .3s;
      }
      .sn-footer-brand .sn-logo-mark {
        width: 36px; height: 36px;
        border-radius: 999px;
        flex: 0 0 36px;
      }
      .sn-footer-brand:hover { opacity: .8; }
      @media (min-width: 768px) { .sn-footer-brand { font-size: 1.25rem; } }
      .sn-footer-desc { color: rgba(255,255,255,.7); line-height: 1.8; margin-bottom: 28px; font-size: 13px; }
      .sn-footer-info-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        color: rgba(255,255,255,.7);
        font-size: 13px;
        line-height: 1.7;
        margin-bottom: 18px;
      }
      .sn-footer-info-item svg {
        width: 16px; height: 16px;
        flex: 0 0 16px;
        color: #F4DF2C;
        margin-top: 3px;
      }
      .sn-footer-right {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      @media (min-width: 768px) { .sn-footer-right { gap: 32px; } }
      @media (min-width: 1024px) { .sn-footer-right { gap: 40px; } }
      .sn-footer-nav-heading {
        display: block;
        color: #F4DF2C;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .1em;
        margin-bottom: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(244,223,44,.25);
        font-family: "M PLUS Rounded 1c", sans-serif;
      }
      .sn-footer-nav-list {
        list-style: none;
        margin: 0; padding: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .sn-footer-nav-list a {
        color: rgba(255,255,255,.75);
        text-decoration: none;
        font-size: 13px;
        transition: color .25s, padding-left .25s;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .sn-footer-nav-list a::before {
        content: '';
        display: inline-block;
        width: 4px; height: 4px;
        border-radius: 50%;
        background: #F4DF2C;
        opacity: 0;
        transition: opacity .25s;
        flex: 0 0 4px;
      }
      .sn-footer-nav-list a:hover {
        color: #fff;
        padding-left: 2px;
      }
      .sn-footer-nav-list a:hover::before { opacity: 1; }

      /* Footer Bottom */
      .sn-footer-bottom {
        border-top: 1px solid rgba(255,255,255,.15);
        padding: 20px 0;
        text-align: center;
        position: relative;
        z-index: 1;
      }
      .sn-footer-bottom .sn-copy { color: rgba(255,255,255,.45); font-size: 12px; letter-spacing: .03em; }

      @media (max-width: 767px) {
        .sn-shared-header {
          overflow-x: hidden;
          overflow-y: visible;
        }
        .sn-shared-wrap {
          max-width: 100vw;
          padding: 0 10px;
        }
        .sn-logo {
          max-width: calc(100vw - 80px);
          overflow: hidden;
          font-size: .95rem;
        }
        .sn-logo-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .sn-body-offset { padding-top: 72px !important; }
    `;
    document.head.appendChild(style);
  }

  function brandLabel(className) {
    return `<span class="${className}"><img class="sn-logo-mark" src="assets/img/smile訪問看護ステーション_logo.png" alt="" aria-hidden="true"><span class="sn-logo-text">smile訪問看護ステーション</span></span>`;
  }

  function caretIcon() {
    return '<svg class="sn-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>';
  }

  function isCurrent(href) {
    const clean = href.replace(/^\//, '').toLowerCase();
    return clean === path || (clean === 'index.html' && pageKey === 'home');
  }

  function submenuActive(paths) {
    return paths.some((p) => isCurrent(p));
  }

  function headerHtml() {
    const aboutGroupActive = submenuActive(['about.html', 'diary.html']);
    const usersGroupActive = submenuActive(['users.html', 'flow.html', 'faq.html']);
    const btnUsersActive = pageKey === 'users' || pageKey === 'voices';
    const btnRecruitActive = pageKey === 'recruit';
    const btnMedicalActive = pageKey === 'medical';
    const btnContactActive = pageKey === 'contact';

    return `
      <header class="sn-shared-header" data-sn-shared-header>
        <div class="sn-shared-wrap">
          <div class="sn-row sn-mobile">
            <a href="index.html" class="sn-logo">${brandLabel('sn-brand-label')}</a>
            <button class="sn-mobile-toggle" type="button" aria-expanded="false" aria-label="メニューを開く" data-sn-toggle>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
          <div class="sn-mobile-panel" data-sn-mobile-panel>
            <div class="sn-mobile-content">
              <div class="sn-mobile-links">
                <div class="sn-mobile-group"><div>私たちについて</div><div class="sn-mobile-sub"><a href="about.html">about us</a><a href="diary.html">smileダイアリー</a></div></div>
                <a href="service.html">サービス内容</a>
                <div class="sn-mobile-group"><div>ご利用者の方へ</div><div class="sn-mobile-sub"><a href="users.html">初めての方</a><a href="flow.html">ご利用のながれ</a><a href="faq.html">よくあるご質問</a><a href="user-feedback.html">ご利用者様の声</a></div></div>
              </div>
              <div class="sn-mobile-btns">
                <a class="sn-btn sn-btn-recruit" href="recruit.html">採用情報</a>
                <a class="sn-btn sn-btn-medical" href="medical-institutions.html">医療機関の方</a>
                <a class="sn-btn sn-btn-users" href="users.html">ご利用者の方</a>
                <a class="sn-btn sn-btn-contact" href="contact.html">お問い合わせ</a>
              </div>
            </div>
          </div>
          <div class="sn-row sn-desktop-row">
            <a href="index.html" class="sn-logo">${brandLabel('sn-brand-label')}</a>
            <nav class="sn-desktop-nav" aria-label="グローバルメニュー">
              <div class="sn-dropdown">
                <a href="about.html" class="sn-link sn-dropdown-trigger ${aboutGroupActive ? 'sn-active' : ''}">私たちについて ${caretIcon()}</a>
                <div class="sn-dropdown-menu"><div class="sn-dropdown-panel">
                  <a href="about.html" class="${isCurrent('about.html') ? 'sn-active' : ''}">about us</a>
                  <a href="diary.html" class="${isCurrent('diary.html') ? 'sn-active' : ''}">smileダイアリー</a>
                </div></div>
              </div>
              <a href="service.html" class="sn-link ${isCurrent('service.html') ? 'sn-active' : ''}">サービス内容</a>
              <div class="sn-dropdown">
                <a href="users.html" class="sn-link sn-dropdown-trigger ${usersGroupActive ? 'sn-active' : ''}">ご利用者の方へ ${caretIcon()}</a>
                <div class="sn-dropdown-menu"><div class="sn-dropdown-panel">
                  <a href="users.html" class="${isCurrent('users.html') ? 'sn-active' : ''}">初めての方</a>
                  <a href="flow.html" class="${isCurrent('flow.html') ? 'sn-active' : ''}">ご利用のながれ</a>
                  <a href="faq.html" class="${isCurrent('faq.html') ? 'sn-active' : ''}">よくあるご質問</a>
                </div></div>
              </div>
              <a href="recruit.html" class="sn-btn sn-btn-recruit ${btnRecruitActive ? 'sn-active' : ''}">採用情報</a>
              <a href="medical-institutions.html" class="sn-btn sn-btn-medical ${btnMedicalActive ? 'sn-active' : ''}">医療機関の方</a>
              <a href="contact.html" class="sn-btn sn-btn-contact ${btnContactActive ? 'sn-active' : ''}">お問い合わせ</a>
            </nav>
          </div>
        </div>
      </header>
    `;
  }

  function footerHtml() {
    const recruitHref = pageKey === 'home' ? '#recruit' : 'recruit.html';
    const hasOwnCta = new Set(['about', 'users', 'recruit', 'contact']).has(pageKey);

    const ctaCompact = hasOwnCta ? '' : `
              <div class="sn-footer-cta-compact">
                <p class="sn-footer-cta-msg">まずはお気軽にご相談ください</p>
                <div class="sn-footer-cta-row">
                  <a href="tel:0649506402" class="sn-footer-cta-phone">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    06-4950-6402
                    <span class="sn-footer-cta-hours">（9:00〜18:00）</span>
                  </a>
                  <a href="contact.html" class="sn-footer-cta-mail">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    お問い合わせフォーム
                  </a>
                </div>
              </div>`;

    return `
      <footer class="sn-shared-footer">
        <div class="sn-shared-wrap">
          <div class="sn-footer-main">
            <div>
              <a href="index.html" class="sn-footer-brand">${brandLabel('sn-brand-label')}</a>
              <p class="sn-footer-desc">ご利用者様・ご家族の方の「やりたい」に寄り添う訪問看護を目指しています。</p>
              <div class="sn-footer-info-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>〒661-0012<br>兵庫県尼崎市南塚口8丁目41-7<br>南塚口ハイツ101号</span>
              </div>
              <div class="sn-footer-info-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>9:00〜18:00（土日祝除く）</span>
              </div>
              <div class="sn-footer-info-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>TEL：06-4950-6402<br>FAX：06-4950-6403</span>
              </div>
            </div>

            <div class="sn-footer-right">
              <div>
                <span class="sn-footer-nav-heading">私たちについて</span>
                <ul class="sn-footer-nav-list">
                  <li><a href="about.html">about us</a></li>
                  <li><a href="diary.html">smileダイアリー</a></li>
                  <li><a href="${recruitHref}">採用情報</a></li>
                </ul>
              </div>
              <div>
                <span class="sn-footer-nav-heading">サービス</span>
                <ul class="sn-footer-nav-list">
                  <li><a href="service.html">サービス内容</a></li>
                  <li><a href="flow.html">ご利用のながれ</a></li>
                  <li><a href="faq.html">よくあるご質問</a></li>
                  <li><a href="user-feedback.html">ご利用者様の声</a></li>
                </ul>
              </div>
              <div>
                <span class="sn-footer-nav-heading">ご利用者様向け</span>
                <ul class="sn-footer-nav-list">
                  <li><a href="users.html">初めての方へ</a></li>
                  <li><a href="medical-institutions.html">医療機関の方へ</a></li>
                  <li><a href="contact.html">お問い合わせ</a></li>
                </ul>
              </div>
              ${ctaCompact}
            </div>
          </div>
        </div>

        <div class="sn-footer-bottom">
          <p class="sn-copy">&copy; 2026 smile訪問看護ステーション</p>
        </div>
      </footer>
    `;
  }

  function replaceHeader() {
    const header = Array.from(document.body.children).find((el) => el.tagName === 'HEADER');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = headerHtml().trim();
    const shared = wrapper.firstElementChild;
    if (header) {
      header.replaceWith(shared);
    } else {
      document.body.insertBefore(shared, document.body.firstChild);
    }
  }

  function replaceFooter() {
    const children = Array.from(document.body.children);
    const footer = [...children].reverse().find((el) => el.tagName === 'FOOTER');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = footerHtml().trim();
    const shared = wrapper.firstElementChild;
    if (pageKey === 'home') shared.id = 'contact';
    if (footer) {
      footer.replaceWith(shared);
    } else {
      document.body.appendChild(shared);
    }
  }

  function initMobileMenu() {
    const btn = document.querySelector('[data-sn-toggle]');
    const root = document.querySelector('.sn-mobile');
    if (!btn || !root) return;
    btn.addEventListener('click', function () {
      const open = root.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  function init() {
    injectStyles();
    replaceHeader();
    replaceFooter();
    if (needsBodyOffset) document.body.classList.add('sn-body-offset');
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
