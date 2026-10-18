# Voice & Dialog

Statisk første version af hjemmesiden. Åbn `index.html` lokalt eller brug en simpel webserver under udvikling.

## Ejerens oplysninger før lancering

1. Opret Stripe-konto og to sikre Payment Links: et årligt medlemskab på 1.000 kr. og en rådgivning på 500 kr.
2. Indsæt de to Stripe-links i `config.js`. Betalingsknapperne åbner derefter Stripe Checkout; kortdata kommer aldrig gennem hjemmesiden.
3. Indsæt korrekt e-mail, telefon og virksomhedsadresse i `config.js`, footer og `privatliv.html`. CVR er sat til `42307610`.
4. Gennemgå medlemsvilkår, betalings-/opsigelsesvilkår og refundering. Link dem fra footer før betaling aktiveres.
5. Færdiggør privatlivspolitikken: dataansvarlig, formål, behandlingsgrundlag, opbevaring, databehandlere, rettigheder og klagevejledning.
6. Brug en sikker kanal til følsomme sagsoplysninger. En almindelig e-mailformular må ikke være den primære kanal til CPR-numre eller journalmateriale.
7. Hvis analytics, Meta Pixel eller lignende tilføjes, må scriptet først indlæses efter et aktivt cookie-samtykke. Cookiebanneret er klar til valget, men der er bevidst ingen tracking-kode.
8. Erstat `assets/hongmei-duan-placeholder.svg` med et godkendt portrætbillede af Hongmei Duan. Behold filnavnet, eller opdatér billedreferencerne i `index.html` og `hvem-er-vi.html`.

## Betaling

`config.js` starter med sikre pladsholdere. Indtil Stripe-links er indsat, viser knapperne en besked i stedet for at forsøge at tage imod betaling. Dette gør sitet klar til betaling uden at offentliggøre en Stripe-hemmelighed.

## Drift

Host sitet på fx Vercel, Netlify eller et almindeligt webhotel. Et eget domæne, HTTPS og en professionel e-mailadresse bør være klar inden lancering.
