# Pipeline modeli anatomicznych

## Obecny prototyp

Model ciała jest osadzany z publicznych modeli Z-Anatomy na Sketchfab:

- Neurology: mózg, rdzeń i nerwy.
- Splanchnology: narządy trzewne, płuca i przewód pokarmowy.
- Angiology: serce i naczynia.
- Myology: mięśnie.

## Docelowa wersja offline

1. Pobierz źródła Z-Anatomy z GitHub/Sketchfab zgodnie z licencją.
2. Otwórz modele w Blenderze.
3. Usuń struktury niepotrzebne w grze.
4. Uprość geometrię przez decymację.
5. Połącz drobne obiekty w grupy cybernetyczne:
   - `receptors`
   - `correlator`
   - `homeostat`
   - `alimentator`
   - `accumulator`
   - `effectors`
6. Nadaj materiały kolorystyczne zgodne z UI.
7. Eksportuj jako `GLB`.
8. Umieść pliki w `public/models/`.
9. W kolejnym kroku podmień iframe Sketchfab na renderer Three.js.

## Licencja

Z-Anatomy bazuje na modelach edukacyjnych udostępnianych jako open source / CC BY-SA. Przy użyciu lokalnych plików trzeba zachować atrybucję i zgodność licencji dla pochodnych assetów.
