# Udgiv med GitHub Pages

Repositoriet `amaliegao/VoiceOgDialog` er offentligt, så GitHub Pages er gratis.

## Slå GitHub Pages til (én gang)

1. Gå til https://github.com/amaliegao/VoiceOgDialog/settings/pages
2. Under **Build and deployment** vælges **Source: Deploy from a branch**.
3. Vælg branch `main` og mappen `/ (root)`, og tryk **Save**.
4. Efter et minut eller to er siden live på https://amaliegao.github.io/VoiceOgDialog/

Herefter opdateres siden automatisk, hver gang `main` ændres. Filen `.nojekyll` sørger for, at GitHub viser filerne præcis som de er.

## Eget domæne (senere)

1. Køb domænet, fx `voiceogdialog.dk`, hos en dansk udbyder (fx Simply, One.com eller DanDomain).
2. Indtast domænet under **Custom domain** på siden ovenfor, og sæt DNS op som GitHub viser.
3. Slå **Enforce HTTPS** til.
4. Opdatér adressen i `og:url` og `og:image` i HTML-filerne.

## Stripe Payment Links

1. Opret en Stripe-konto på https://dashboard.stripe.com/register med virksomhedens CVR og bankkonto.
2. Opret et produkt "Årligt medlemskab" til 1.000 kr. som abonnement, der fornyes årligt.
3. Opret et Payment Link til produktet, og kopiér linket (`https://buy.stripe.com/...`).
4. Indsæt linket i `stripeMembershipLink` i `config.js`.
5. Lav en testbetaling i Stripes testtilstand, før det rigtige link sættes ind.

Payment Links er offentlige og må gerne ligge i repositoriet.
