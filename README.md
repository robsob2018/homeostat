# CyberOrganizm: Misja Homeostat

Edukacyjna gra webowa o podstawowych pojęciach cybernetyki Mazura i Kosseckiego, pokazująca organizm człowieka jako układ autonomiczny.

## Uruchomienie

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
```

## Deploy

Publiczny deploy GitHub Pages jest przygotowany przez workflow:

```txt
.github/workflows/pages.yml
```

Po pushu na `main` aplikacja powinna być publikowana pod:

```txt
https://robsob2018.github.io/homeostat/
```

Jeśli pierwszy deploy zgłosi, że Pages nie jest włączone, ustaw w GitHub:
`Settings → Pages → Build and deployment → Source: GitHub Actions`.

## Struktura

```txt
src/
  components/      UI gry i panel modelu ciała
  data/            misje, akcje, słownik i awarie
  logic/           silnik gry i stabilność homeostatyczna
  types/           typy domenowe
docs/              architektura, wersjonowanie, pipeline modeli
public/models/     docelowe miejsce na zoptymalizowane GLB
.github/workflows/ CI dla builda
```

## Modele anatomiczne

Aktualny prototyp używa publicznych modeli Z-Anatomy osadzanych przez Sketchfab. Docelowy wariant offline powinien korzystać z uproszczonych plików GLB przygotowanych w Blenderze. Szczegóły: [docs/MODEL_PIPELINE.md](docs/MODEL_PIPELINE.md).

## Powrót do poprzedniej wersji

Aktualna działająca wersja z integracją Z-Anatomy została oznaczona tagiem:

```bash
git checkout v0.1-z-anatomy-baseline
```

Więcej: [docs/VERSIONING.md](docs/VERSIONING.md).
