(function () {
  const config = window.SITE_CONFIG || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const footer = $('.site-footer');
  if (footer && !footer.querySelector('.footer-grid')) {
    footer.innerHTML = `
      <div class="shell footer-grid">
        <div class="brand footer-brand"><svg class="brand-mark" viewBox="0 0 74 56" aria-hidden="true"><path d="M37 4C21 4 8 14 8 28c0 8 4 15 11 20l-2 6 8-3c4 2 8 3 12 3 16 0 29-11 29-25S53 4 37 4Z" fill="#1f6d63"/><path d="M40 4c15 0 27 10 27 24 0 8-4 15-11 20l2 6-8-3c-4 2-8 3-12 3-15 0-28-11-28-25S24 4 40 4Z" fill="#b6ca67" opacity=".95"/><path d="M31 19v17M37 14v27M43 19v17M49 23v9M25 23v9" stroke="#fff" stroke-linecap="round" stroke-width="3"/></svg><span><strong>Voice <i>&</i> Dialog</strong><small>Din stemme. Vores støtte.</small></span></div>
        <p>Faglig rådgivning og støtte til udenlandske fagpersoner i sundhedsvæsenet.</p>
        <div class="footer-links"><strong>Navigation</strong><a href="hvem-er-vi.html">Hvem er vi?</a><a href="hvad-kan-vi-goere.html">Vores ekspertise</a><a href="priser.html">Priser</a><a href="bliv-medlem.html">Bliv medlem</a></div>
        <div class="footer-links"><strong>Information</strong><a href="betingelser.html">Betingelser</a><a href="privatliv.html">Privatliv og cookies</a><a href="index.html#kontakt">Kontakt</a><button type="button" class="cookie-settings">Cookieindstillinger</button></div>
      </div>
      <div class="shell footer-bottom"><span>© <span id="year"></span> Voice & Dialog</span><span class="cvr-text">CVR: 42307610</span><span>Danmark</span></div>`;
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  $$('.contact-email-text').forEach((element) => { element.textContent = config.contactEmail || element.textContent; });
  $$('.contact-phone-text').forEach((element) => { element.textContent = config.contactPhone || element.textContent; });
  const cvr = $('.cvr-text');
  if (cvr) cvr.textContent = config.cvr || cvr.textContent;
  const contactEmail = $('.contact-email');
  if (config.contactEmail && contactEmail) contactEmail.href = `mailto:${config.contactEmail}`;

  const menuToggle = $('.menu-toggle');
  const nav = $('#site-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
    });
    $$('#site-nav a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const paymentDialog = $('#payment-dialog');
  const usablePaymentLink = (link) => /^https:\/\/buy\.stripe\.com\//.test(link || '') && !link.includes('REPLACE_');
  $$('.payment-button, .inline-payment').forEach((button) => {
    button.addEventListener('click', () => {
      const link = button.dataset.payment === 'membership' ? config.stripeMembershipLink : config.stripeConsultationLink;
      if (usablePaymentLink(link)) window.location.assign(link);
      else if (paymentDialog) paymentDialog.showModal();
    });
  });
  if (paymentDialog) {
    $('.dialog-close', paymentDialog).addEventListener('click', () => paymentDialog.close());
    paymentDialog.addEventListener('click', (event) => { if (event.target === paymentDialog) paymentDialog.close(); });
  }

  let cookieBanner = $('#cookie-banner');
  if (!cookieBanner) {
    document.body.insertAdjacentHTML('beforeend', `
      <section class="cookie-banner" id="cookie-banner" aria-label="Cookievalg" hidden>
        <div><h2>Cookies</h2><p>Vi bruger kun nødvendige cookies, indtil du giver tilladelse til statistik. Du kan ændre dit valg når som helst.</p><a href="privatliv.html">Læs om cookies</a></div>
        <div class="cookie-actions"><button class="button button-quiet" type="button" data-cookie-choice="necessary">Kun nødvendige</button><button class="button button-primary" type="button" data-cookie-choice="all">Acceptér statistik</button></div>
      </section>`);
    cookieBanner = $('#cookie-banner');
  }
  const cookieKey = 'voice-dialog-cookie-choice';
  function showCookieBanner() { if (cookieBanner) cookieBanner.hidden = false; }
  if (cookieBanner && !localStorage.getItem(cookieKey)) showCookieBanner();
  $$('[data-cookie-choice]').forEach((button) => button.addEventListener('click', () => {
    localStorage.setItem(cookieKey, button.dataset.cookieChoice);
    if (cookieBanner) cookieBanner.hidden = true;
  }));
  $$('.cookie-settings').forEach((button) => button.addEventListener('click', showCookieBanner));
})();
