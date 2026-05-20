import type { GlossaryEntry } from "../types/game";

export const glossary: GlossaryEntry[] = [
  {
    term: "Receptor",
    cyberneticPart: "receptor",
    definition:
      "Część systemu odbierająca bodźce. W organizmie są to m.in. receptory temperatury, bólu, rozciągania, osmolalności, glukozy i tlenu.",
    example: "Termoreceptory skóry sygnalizują zimno, a osmoreceptory pomagają uruchomić pragnienie.",
  },
  {
    term: "Korelator",
    cyberneticPart: "correlator",
    definition:
      "Część systemu kojarząca sygnały z możliwymi reakcjami. W organizmie odpowiada temu głównie ośrodkowy układ nerwowy, wspierany przez układ autonomiczny i hormonalny.",
    example: "Mózg i podwzgórze rozpoznają, czy potrzebne jest drżenie, pocenie, pragnienie czy zmiana zachowania.",
  },
  {
    term: "Homeostat",
    cyberneticPart: "homeostat",
    definition:
      "Mechanizm utrzymujący zmienne organizmu w zakresie zgodnym z funkcjonowaniem. Nie jest jednym narządem, lecz siecią sprzężeń nerwowych, hormonalnych i zachowaniowych.",
    example: "Termoregulacja łączy podwzgórze, skórę, naczynia, mięśnie i gruczoły potowe.",
  },
  {
    term: "Alimentator",
    cyberneticPart: "alimentator",
    definition:
      "W języku cybernetycznym: część dostarczająca systemowi energii i zasobów. W biologii odpowiadają temu m.in. układ pokarmowy, oddechowy, krążenie, płyny i sen.",
    example: "Oddychanie dostarcza tlenu, a picie uzupełnia wodę potrzebną m.in. do chłodzenia przez pot.",
  },
  {
    term: "Akumulator",
    cyberneticPart: "accumulator",
    definition:
      "Część przechowująca zasoby. W organizmie są to np. glikogen w wątrobie i mięśniach, tłuszcz, zapasy płynów oraz rezerwa psychofizyczna.",
    example: "Glikogen może szybko zasilić wysiłek lub drżenie mięśni, ale jego ilość jest ograniczona.",
  },
  {
    term: "Efektor",
    cyberneticPart: "effector",
    definition:
      "Część wykonująca reakcję. W organizmie są to m.in. mięśnie szkieletowe, mięśnie gładkie naczyń, gruczoły potowe, serce, płuca i zachowania człowieka.",
    example: "Pocenie, zwężenie naczyń, przyspieszenie serca, drżenie mięśni albo odpoczynek to efektory.",
  },
  {
    term: "Bodziec",
    definition: "Informacja lub zmiana warunków, która trafia do systemu i może wywołać odpowiedź.",
    example: "Zimno, hałas, presja grupy albo wzrost glukozy mogą być bodźcami.",
  },
  {
    term: "Zakłócenie",
    definition: "Zmiana, która odsuwa parametry systemu od zakresu względnej równowagi.",
    example: "Upał i odwodnienie naruszają temperaturę oraz zasoby wody.",
  },
  {
    term: "Sprzężenie zwrotne",
    definition:
      "Informacja o skutkach działania wracająca do systemu. Ujemne sprzężenie zwrotne zwykle zmniejsza odchylenie od normy.",
    example: "Po poceniu temperatura spada, ale nawodnienie też spada. To feedback dla kolejnej decyzji.",
  },
  {
    term: "Równowaga dynamiczna",
    definition:
      "Stabilność utrzymywana przez ciągłe korekty i rozsądne zużycie zasobów, a nie przez bezruch albo jedną maksymalną decyzję.",
    example: "Najlepszy wynik oznacza rozsądne zużycie zasobów przy powrocie parametrów do normy.",
  },
  {
    term: "Sterowanie społeczne / psychofizyczne",
    definition:
      "W duchu Kosseckiego system reaguje także na informacje społeczne: normy, presję, zaufanie, motywację i przeciążenie bodźcami.",
    example: "Przed egzaminem rozmowa, plan i ograniczenie bodźców mogą stabilizować układ lepiej niż chaotyczny wysiłek.",
  },
];
