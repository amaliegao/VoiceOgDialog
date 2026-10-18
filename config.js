/*
  Voice & Dialog: oplysninger, der vises på hjemmesiden.
  Tomme felter ('') bliver automatisk skjult på siden.
*/
window.SITE_CONFIG = {
  // Stripe Payment Links (https://buy.stripe.com/...). Lad stå tomme, indtil de er oprettet.
  stripeMembershipLink: '',
  stripeConsultationLink: '',

  contactEmail: 'kontakt@voiceogdialog.dk',
  contactPhone: '+45 28 28 87 58',
  address: 'Richard Mortensens Vej 148, 2300 København S',
  cvr: '42307610',

  // Statistik (fx Plausible eller Google Analytics). Scriptet indlæses først efter samtykke.
  // Så længe feltet er tomt, viser cookiebanneret kun information og en OK-knap.
  analyticsScript: ''
};
