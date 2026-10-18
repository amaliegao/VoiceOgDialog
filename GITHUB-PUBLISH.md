# Udgiv med GitHub Pages

## Visning til familie

1. Opret et **offentligt** repository på GitHub, fx `VoiceOgDialog`.
2. Fra projektmappen køres:

```bash
git commit -m "Første version af Voice & Dialog"
git remote add origin https://github.com/DIT-BRUGERNAVN/VoiceOgDialog.git
git push -u origin main
```

3. På GitHub: `Settings` → `Pages` → vælg **Deploy from a branch** → `main` og `/ (root)` → `Save`.
4. Siden bliver tilgængelig på `https://DIT-BRUGERNAVN.github.io/VoiceOgDialog/`.

Et gratis GitHub Pages-site fra et GitHub Free-repository er offentligt. Brug det til visning og enkel statisk hosting. Køb et eget domæne senere, hvis det skal være den endelige organisationsside.

## Stripe Payment Links

Lad pladsholderne stå i `config.js`, mens siden kun vises til familie. Betalingsknapperne tager så ikke imod betaling.

Når I er klar til betaling:

1. Opret i Stripe et årligt abonnement for medlemskab og en engangsbetaling for rådgivning.
2. Opret et Payment Link for hver.
3. Indsæt kun de færdige `https://buy.stripe.com/...`-links i `config.js`.
4. Test betalingen i Stripe, og opdatér GitHub Pages.

Stripe Payment Links er offentlige og må gerne ligge i denne fil. Indsæt aldrig en Stripe secret key (`sk_...`) eller webhook-hemmelighed i et GitHub-repository.
