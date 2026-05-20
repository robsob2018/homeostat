# Źródła assetów 3D dla świata CyberMiasto

## Rekomendowane źródła

### 1. Kenney City Kit
- Paczki: City Kit Roads, City Kit Commercial, City Kit Industrial, City Kit Suburban
- Licencja: CC0
- Zastosowanie: drogi, budynki, infrastruktura, elementy miasta
- Folder docelowy: `public/assets/city/kenney/`
- Link: https://kenney.nl/assets/city-kit-roads

### 2. KayKit City Builder Bits
- Licencja: CC0
- Formaty: OBJ, FBX, GLTF
- Zastosowanie: kolorowe low-poly miasto edukacyjne
- Folder docelowy: `public/assets/city/kaykit/`
- Link: https://kaylousberg.itch.io/city-builder-bits

### 3. Quaternius
- Paczki: Ultimate Buildings Pack, Buildings Pack, Modular Streets Pack
- Licencja: CC0
- Formaty: FBX, OBJ, Blend
- Zastosowanie: uzupełniające budynki, drogi, pojazdy
- Folder docelowy: `public/assets/city/quaternius/`
- Link: https://quaternius.com/

### 4. OSM2World, opcjonalnie
- Źródło: OpenStreetMap
- Eksport: glTF, GLB, OBJ
- Zastosowanie: realne miasto, np. Poznań lub kampus UAM
- Uwaga: wymaga uproszczenia i stylizacji modeli
- Link: https://www.osm2world.org/

## Checklista importu

- [ ] Pobierz assety.
- [ ] Sprawdź licencję.
- [ ] Skopiuj modele do `public/assets/city/`.
- [ ] Jeżeli format nie jest GLB/GLTF, skonwertuj w Blenderze.
- [ ] Uprość geometrię, jeśli model jest za ciężki.
- [ ] Nadaj kolory zgodne z funkcją cybernetyczną.
- [ ] Zaktualizuj mapowanie w `src/worlds/city/cityAssets.ts`.

## Mapowanie cybernetyczne

- Receptory: anteny, czujniki, stacje pomiarowe, kamery.
- Korelator: ratusz, centrum danych, sztab kryzysowy.
- Homeostat: panel stabilności, procedury, progi alarmowe.
- Alimentator: elektrownie, wodociągi, transport, farmy i dostawy.
- Akumulator: magazyny, baterie, zbiorniki wody, rezerwy budżetowe.
- Efektory: pojazdy, ekipy techniczne, służby miejskie i kanały komunikacji.
