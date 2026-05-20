# Wersjonowanie i powrót do wersji

Repozytorium używa zwykłych commitów Git i tagów.

## Punkty powrotu

Aktualna działająca wersja przed dalszym porządkowaniem struktury:

```bash
git checkout v0.1-z-anatomy-baseline
```

Powrót na główną gałąź:

```bash
git checkout main
```

## Zalecana praca

Nowe funkcje rób na branchach:

```bash
git checkout -b feature/nazwa-zmiany
```

Po stabilnym etapie dodaj tag:

```bash
git tag v0.2-opis-etapu
```

## Podpięcie GitHub

Gdy istnieje puste repo na GitHubie:

```bash
git remote add origin git@github.com:OWNER/REPO.git
git push -u origin main --tags
```

Jeśli używasz HTTPS:

```bash
git remote add origin https://github.com/OWNER/REPO.git
git push -u origin main --tags
```
