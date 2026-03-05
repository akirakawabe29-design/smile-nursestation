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
        color: #F97316;
        text-decoration: none;
        font-family: "M PLUS Rounded 1c", sans-serif;
        font-weight: 700;
        font-size: 1.05rem;
        white-space: nowrap;
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
      .sn-link:hover, .sn-link.sn-active { color: #F97316; }
      .sn-dropdown { position: relative; }
      .sn-dropdown-trigger {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .sn-caret { width: 14px; height: 14px; color: #9ca3af; transition: color .2s ease, transform .2s ease; }
      .sn-dropdown:hover .sn-caret { color: #F97316; }
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
      .sn-dropdown-panel a:hover, .sn-dropdown-panel a.sn-active { background: #FFF7ED; color: #F97316; }
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
      .sn-btn-users { border: 1px solid #fecdd3; background: #fff1f2; color: #e11d48; }
      .sn-btn-users:hover { background: #ffe4e6; }
      .sn-btn-recruit { border: 1px solid #fed7aa; background: #fff7ed; color: #F97316; }
      .sn-btn-recruit:hover { background: #ffedd5; }
      .sn-btn-medical { border: 1px solid rgba(20,184,166,.25); background: #f0fdfa; color: #0f766e; }
      .sn-btn-medical:hover { background: #ccfbf1; }
      .sn-btn-contact { background: #F97316; color: #fff; }
      .sn-btn-contact:hover { background: #ea580c; }

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
      .sn-mobile-links a:hover, .sn-mobile-sub a:hover { background: #f8fafc; }
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

      .sn-shared-footer {
        background: #1f2937;
        color: #fff;
        padding: 56px 0 56px;
        font-family: "Noto Sans JP", sans-serif;
      }
      .sn-shared-footer .sn-grid { display: grid; gap: 32px; }
      .sn-footer-top {
        display: grid;
        gap: 32px;
        align-items: start;
      }
      @media (min-width: 768px) {
        .sn-footer-top { grid-template-columns: 340px 1fr; gap: 40px; }
      }
      @media (min-width: 1024px) {
        .sn-footer-top { gap: 64px; }
      }
      .sn-footer-brand {
        display: inline-flex;
        align-items: center;
        gap: 0;
        color: #F97316;
        text-decoration: none;
        font-weight: 700;
        font-family: "M PLUS Rounded 1c", sans-serif;
        font-size: 1.05rem;
        margin-bottom: 12px;
      }
      .sn-footer-brand:hover { color: #fb923c; }
      @media (min-width: 768px) { .sn-footer-brand { font-size: 1.35rem; } }
      .sn-footer-desc { color: #d1d5db; line-height: 1.7; margin-bottom: 14px; }
      .sn-footer-company { color: #d1d5db; margin: 4px 0 8px; }
      .sn-footer-address { color: #9ca3af; line-height: 1.7; }
      .sn-contact-box {
        margin-top: 12px;
        border: 1px solid rgba(251,191,36,.2);
        background: rgba(55,65,81,.42);
        border-radius: 16px;
        padding: 14px;
      }
      .sn-contact-box .sn-label { color: #fed7aa; font-size: 12px; font-weight: 700; margin-bottom: 4px; }
      .sn-contact-box .sn-phone {
        color: #fff;
        font-weight: 700;
        font-size: 1.25rem;
        letter-spacing: .04em;
        text-decoration: none;
      }
      .sn-contact-box .sn-phone:hover { color: #fed7aa; }
      .sn-contact-box .sn-meta { color: #9ca3af; font-size: 12px; margin-top: 4px; line-height: 1.6; }
      .sn-footer-right { text-align: left; }
      @media (min-width: 768px) { .sn-footer-right { text-align: right; } }
      .sn-footer-menu {
        display: flex;
        flex-wrap: wrap;
        gap: 14px 20px;
        color: #9ca3af;
        margin: 0 0 24px;
        padding: 0;
        list-style: none;
      }
      @media (min-width: 768px) { .sn-footer-menu { justify-content: flex-end; gap: 22px 34px; } }
      .sn-footer-menu a { color: inherit; text-decoration: none; }
      .sn-footer-menu a:hover { color: #fff; }
      .sn-footer-actions {
        display: flex;
        flex-direction: column;
        gap: 18px;
        align-items: stretch;
      }
      @media (min-width: 768px) {
        .sn-footer-actions {
          align-items: stretch;
          width: max-content;
          margin-left: auto;
        }
      }
      .sn-footer-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 18px;
        width: 100%;
        max-width: 560px;
      }
      @media (min-width: 768px) { .sn-footer-buttons { justify-content: flex-start; width: max-content; } }
      .sn-footer-buttons .sn-btn {
        border-radius: 12px;
        padding: 10px 16px;
      }
      .sn-footer-contact {
        min-width: 0;
        width: 100%;
        justify-content: center;
        padding: 20px 34px;
        font-size: 18px;
        font-weight: 700;
        border-radius: 14px;
        background: transparent;
        color: #fff;
        border: 1px solid rgba(255,255,255,.35);
        box-shadow: 0 8px 20px rgba(15,23,42,.18);
      }
      .sn-footer-contact:hover {
        background: #F97316;
        color: #fff;
        transform: translateY(-2px);
        border-color: #F97316;
        box-shadow: 0 16px 34px rgba(249,115,22,.34);
      }
      .sn-footer-bottom {
        border-top: 1px solid #374151;
        padding-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      @media (min-width: 768px) {
        .sn-footer-bottom {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }
      .sn-footer-bottom .sn-copy { color: #6b7280; font-size: 12px; }

      .sn-body-offset { padding-top: 72px !important; }
    `;
    document.head.appendChild(style);
  }

  function iconMark() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>';
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
            <a href="index.html" class="sn-logo">smile訪問看護ステーション</a>
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
            <a href="index.html" class="sn-logo">smile訪問看護ステーション</a>
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
    return `
      <footer class="sn-shared-footer" data-sn-shared-footer>
        <div class="sn-shared-wrap sn-grid">
          <div class="sn-footer-top">
            <div>
              <a href="index.html" class="sn-footer-brand">smile訪問看護ステーション</a>
              <p class="sn-footer-desc">ご利用者様・ご家族の方の「やりたい」に寄り添う訪問看護を目指しています。</p>
              <p class="sn-footer-company">株式会社smile</p>
              <p class="sn-footer-address">〒661-0012<br>兵庫県尼崎市南塚口8丁目41-7<br>南塚口ハイツ101号</p>
              <div class="sn-contact-box">
                <div class="sn-label">お電話でのご相談</div>
                <a class="sn-phone" href="tel:0649506402">06-4950-6402</a>
                <div class="sn-meta">9:00〜18:00（土日祝除く）<br>FAX：06-4950-6403</div>
              </div>
            </div>
            <div class="sn-footer-right">
              <ul class="sn-footer-menu">
                <li><a href="about.html">about us</a></li>
                <li><a href="diary.html">smileダイアリー</a></li>
                <li><a href="service.html">サービス内容</a></li>
                <li><a href="flow.html">ご利用のながれ</a></li>
                <li><a href="faq.html">よくあるご質問</a></li>
                <li><a href="user-feedback.html">ご利用者様の声</a></li>
              </ul>
              <div class="sn-footer-actions">
                <div class="sn-footer-buttons" role="group" aria-label="主要導線">
                  <a href="users.html" class="sn-btn sn-btn-users">ご利用者の方</a>
                  <a href="medical-institutions.html" class="sn-btn sn-btn-medical">医療機関の方</a>
                  <a href="${recruitHref}" class="sn-btn sn-btn-recruit">採用情報</a>
                </div>
                <a href="contact.html" class="sn-btn sn-btn-contact sn-footer-contact">お問い合わせ</a>
              </div>
            </div>
          </div>
          <div class="sn-footer-bottom">
            <p class="sn-copy">&copy; 2026 smile訪問看護ステーション</p>
          </div>
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
