# Voice & Dialog

Statisk hjemmeside (HTML, CSS og JavaScript) på dansk. Den kræver ingen build: åbn `index.html` lokalt, eller kør `python3 -m http.server` i mappen og gå til http://localhost:8000.

Sitet udgives med GitHub Pages fra `main`-grenen. Se `GITHUB-PUBLISH.md`.

## Indhold og opsætning

Alle oplysninger, der kan ændre sig, ligger i `config.js`:

| Felt | Betydning |
| --- | --- |
| `stripeMembershipLink` | Stripe Payment Link til årligt medlemskab (1.000 kr.) |
| `stripeConsultationLink` | Stripe Payment Link til rådgivning (500 kr.), bruges ikke endnu |
| `contactEmail`, `contactPhone`, `address`, `cvr` | Vises i kontaktfelter, footer og vilkår. Tomme felter skjules automatisk |
| `analyticsScript` | URL til et statistikscript. Indlæses først efter samtykke i cookiebanneret |

Så længe et Stripe-link er tomt, viser "Bliv medlem"-knappen en besked om, at online betaling åbner snart.

## Filer

- `index.html`, `hvem-er-vi.html`, `hvad-kan-vi-goere.html`, `priser.html`, `bliv-medlem.html`, `betingelser.html`, `privatliv.html`, `404.html`
- `styles.css`: alt layout og design, se `DESIGNMANUAL.md`
- `app.js`: menu, kontaktfelter, betalingsknap og cookiebanner
- `assets/`: logoer (mørk, lys og symbol), favicon, portræt og billeder

Header og footer er ens på alle sider. Ændres menuen, skal den rettes i alle HTML-filer.

## Før lancering

1. Opret Stripe Payment Link til medlemskab og indsæt det i `config.js`. Indsæt aldrig en Stripe secret key (`sk_...`) i repositoriet.
2. Udfyld telefon og adresse i `config.js`, hvis de skal vises.
3. Få handelsbetingelser og privatlivspolitik gennemlæst og godkendt.
4. Opsæt e-mailen `kontakt@voiceogdialog.dk` og eventuelt eget domæne.
