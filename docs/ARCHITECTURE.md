# Architektura

## Cel

Aplikacja jest prototypem dydaktycznym, nie symulatorem medycznym. Logika biologiczna jest uproszczona do skali 0-100, aby pokazać sprzężenie zwrotne, korekcję odchyleń i koszt zasobów.

## Warstwy

- `src/data/` przechowuje treść gry: misje, akcje, awarie i słownik.
- `src/logic/` zawiera obliczenia stanu organizmu i stabilności.
- `src/components/` składa interfejs: model ciała, parametry, akcje, feedback, słownik i diagnostykę.
- `src/types/` definiuje kontrakty danych.

## Przepływ decyzji

1. Gracz wybiera akcję w `ActionPanel`.
2. `App.tsx` przekazuje akcję do `applyAction`.
3. `gameEngine.ts` aktualizuje `BodyState`.
4. `stability.ts` liczy stabilność homeostatyczną.
5. UI pokazuje feedback, wynik i podświetlenie części cybernetycznej.

## Integracja modeli

`BodyMap.tsx` używa obecnie publicznego viewer-a Sketchfab dla modeli Z-Anatomy. Jest to dobre dla prototypu, ale zależy od internetu i zewnętrznego serwisu. Produkcyjna ścieżka powinna użyć lokalnych plików GLB w `public/models/`.
