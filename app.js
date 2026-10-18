(function () {
  const config = window.SITE_CONFIG || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  /* Kontaktoplysninger fra config.js. Tomme felter skjules. */
  const fields = {
    email: config.contactEmail,
    phone: config.contactPhone,
    address: config.address,
    cvr: config.cvr ? `CVR ${config.cvr}` : ''
  };
  $$('[data-field]').forEach((element) => {
    const value = fields[element.dataset.field];
    const wrapper = element.closest('[data-field-wrap]') || element;
    if (!value) { wrapper.hidden = true; return; }
    element.textContent = value;
    if (element.tagName === 'A' && element.dataset.field === 'email') element.href = `mailto:${value}`;
    if (element.tagName === 'A' && element.dataset.field === 'phone') element.href = `tel:${value.replace(/[^\d+]/g, '')}`;
  });
  $$('a[data-mailto]').forEach((link) => { if (config.contactEmail) link.href = `mailto:${config.contactEmail}`; });
  $$('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

  /* Mobilmenu */
  const menuToggle = $('.menu-toggle');
  const nav = $('#site-nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
  }
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $$('a', nav).forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
  }

  /* Betaling: kun knapper med data-payment åbner Stripe. */
  const paymentLinks = { membership: config.stripeMembershipLink, consultation: config.stripeConsultationLink };
  const paymentDialog = $('#payment-dialog');
  const isStripeLink = (link) => /^https:\/\/buy\.stripe\.com\/\S+$/.test(link || '');
  $$('[data-payment]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const link = paymentLinks[button.dataset.payment];
      if (isStripeLink(link)) { window.location.assign(link); return; }
      event.preventDefault();
      if (paymentDialog) paymentDialog.showModal();
    });
  });
  if (paymentDialog) {
    $('.dialog-close', paymentDialog).addEventListener('click', () => paymentDialog.close());
    paymentDialog.addEventListener('click', (event) => { if (event.target === paymentDialog) paymentDialog.close(); });
  }

  /* Cookies. Valget gemmes i 12 måneder og kan ændres via "Cookieindstillinger". */
  const cookieKey = 'vd-cookie-consent';
  const consentVersion = 1;
  const maxAge = 365 * 24 * 60 * 60 * 1000;
  const hasAnalytics = Boolean(config.analyticsScript);

  function readConsent() {
    try {
      const saved = JSON.parse(localStorage.getItem(cookieKey));
      if (saved && saved.version === consentVersion && Date.now() - saved.time < maxAge) return saved;
    } catch (error) { /* ugyldigt eller blokeret lager */ }
    return null;
  }
  function saveConsent(statistics) {
    try { localStorage.setItem(cookieKey, JSON.stringify({ version: consentVersion, statistics, time: Date.now() })); } catch (error) { /* ignoreres */ }
  }
  function loadAnalytics() {
    if (!hasAnalytics || $('script[data-analytics]')) return;
    const script = document.createElement('script');
    script.src = config.analyticsScript;
    script.defer = true;
    script.dataset.analytics = '';
    document.head.appendChild(script);
  }

  const text = hasAnalytics
    ? 'Vi bruger nødvendige cookies, så siden virker. Med dit samtykke bruger vi også statistikcookies til at forbedre siden. Du kan altid ændre dit valg.'
    : 'Vi bruger ingen statistik- eller marketingcookies. Siden gemmer kun dit cookievalg i din browser.';
  const actions = hasAnalytics
    ? '<button class="button button-outline" type="button" data-consent="false">Kun nødvendige</button><button class="button button-primary" type="button" data-consent="true">Acceptér alle</button>'
    : '<button class="button button-primary" type="button" data-consent="false">OK, forstået</button>';
  document.body.insertAdjacentHTML('beforeend', `
    <section class="cookie-banner" id="cookie-banner" role="region" aria-labelledby="cookie-title" hidden>
      <h2 id="cookie-title">Cookies</h2>
      <p>${text} <a href="privatliv.html#cookies">Læs mere</a></p>
      <div class="cookie-actions">${actions}</div>
    </section>`);
  const banner = $('#cookie-banner');
  const consent = readConsent();
  if (consent && consent.statistics) loadAnalytics();
  if (!consent) banner.hidden = false;

  $$('[data-consent]', banner).forEach((button) => button.addEventListener('click', () => {
    const statistics = button.dataset.consent === 'true';
    saveConsent(statistics);
    banner.hidden = true;
    if (statistics) loadAnalytics();
    else if ($('script[data-analytics]')) window.location.reload();
  }));
  $$('.cookie-settings').forEach((button) => button.addEventListener('click', () => {
    banner.hidden = false;
    $('button', banner).focus();
  }));
})();
