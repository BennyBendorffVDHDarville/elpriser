# Elpris Planlægger - Personlig PWA

App til planlægning af elbil-opladning i Næstved.
Tilpasset Cerius nettarif, NRGi Time elaftale og DK2 spotpris.

## Hvad er det?

En lille webapp (PWA) der:
- Henter dagens og morgendagens spotpriser fra elprisenligenu.dk
- Lægger Cerius-tariffer (lav/høj/spids), elafgift, NRGi tillæg og moms ovenpå
- Viser priserne som farvede søjler: grøn = billigt, orange = mellem, rød = dyrt
- Beregner det bedste sammenhængende ladevindue til Kona (60 kWh, 6t) eller EX60 (117 kWh, 12t)
- Læser status op på dansk - god til bilen

## Installation på din telefon

### Trin 1: Hosting på GitHub Pages (5 min)
1. Opret konto på github.com hvis du ikke har en
2. Lav et nyt "public" repository, fx kaldet `elpris`
3. Upload filerne `index.html`, `manifest.json`, `sw.js`
4. Gå til Settings → Pages → Source: "Deploy from branch", branch: `main`, folder: `/ (root)`
5. Vent 1-2 min - du får en URL: `https://[dit-brugernavn].github.io/elpris/`

### Trin 2: Installer på OnePlus 12R (og Nord 3 til din kone)
1. Åbn URL'en i Chrome
2. Tryk på de tre prikker øverst til højre
3. Vælg "Føj til startskærm" eller "Installér app"
4. Ikonet ⚡ kommer på din hjemmeskærm
5. Tryk på det → starter fuld skærm uden browser-bjælker

## Tilpasning

Alle priser ligger samlet øverst i `index.html` under `CONFIG`:

```javascript
const CONFIG = {
  region: 'DK2',                    // DK1=Vest, DK2=Øst
  cerius: {
    winter: { lavlast: 0.1325, hojlast: 0.3975, spidslast: 1.1925 },
    summer: { lavlast: 0.1325, hojlast: 0.1988, spidslast: 0.1988 }
  },
  energinet: 0.0875,                // System+transmissionstarif
  elafgift: 0.01,                   // 2026 nedsat
  nrgi_tillaeg: 0.09,               // NRGi Time tillæg
  charger_kw: 10                    // Din hjemmelader
};
```

Når Cerius justerer tariffer (skifter typisk 1. april og 1. oktober) eller NRGi ændrer tillæg,
opdater bare værdierne her.

## Tekniske noter

- Spotpriser kommer fra det åbne API på elprisenligenu.dk (ekskl. moms, ekskl. afgifter)
- Morgendagens priser tilgængelige fra ca. kl. 13
- Cerius vinter-spidslast (kl. 17-21, kun okt-mar) er den dyreste tid - undgå opladning her
- Cerius sommer-priser har INGEN spidslast, kun lav (0-6) og høj (resten)
- Beregningen tager højde for vinter/sommer-skifte automatisk baseret på datoen

## Hvad er IKKE inkluderet (med vilje)

- Faste abonnementer (NRGi ~29 kr/md, Cerius netabonnement) - de er faste uanset hvornår du lader
- Reduceret elafgift for elvarme - ikke relevant for elbil-ladning
- Detaljeret kvarters-priser - DK overgik til kvarters-afregning 1. okt 2025, men API'et leverer stadig timepriser
