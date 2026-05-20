import type { GlossaryEntry } from "../../types/game";

export const cityGlossary: GlossaryEntry[] = [
  {
    term: "Receptor",
    cyberneticPart: "receptor",
    definition:
      "Element miasta odbierający bodźce i informacje z otoczenia. W mieście są to np. czujniki, kamery, media, zgłoszenia mieszkańców, stacje pogodowe i pomiary infrastruktury.",
    example: "Czujniki sieci wykrywają spadek napięcia, a mieszkańcy zgłaszają przerwy w dostawach.",
  },
  {
    term: "Korelator",
    cyberneticPart: "correlator",
    definition:
      "Część systemu, która kojarzy sygnały z możliwymi reakcjami. W mieście odpowiadają jej centrum danych, ratusz, sztab kryzysowy, procedury analityczne i instytucje decyzyjne.",
    example: "Sztab kryzysowy łączy dane z czujników, zgłoszeń i map przepływów.",
  },
  {
    term: "Homeostat",
    cyberneticPart: "homeostat",
    definition:
      "Mechanizm utrzymujący równowagę miasta. Nie jest pojedynczym urzędnikiem, lecz układem korekt: norm, procedur, progów alarmowych, regulacji i sprzężeń zwrotnych.",
    example: "Procedury ograniczania zużycia wody stabilizują system podczas suszy.",
  },
  {
    term: "Alimentator",
    cyberneticPart: "alimentator",
    definition:
      "Część dostarczająca zasobów potrzebnych do działania miasta: energii, wody, żywności, transportu, paliwa, personelu i infrastruktury.",
    example: "Elektrownia, wodociągi i transport dostarczają zasoby dla działania miasta.",
  },
  {
    term: "Akumulator",
    cyberneticPart: "accumulator",
    definition:
      "Część przechowująca rezerwy: magazyny, budżet, zapasy paliwa, baterie, zbiorniki wody, nadwyżki mocy, zaufanie społeczne jako rezerwa działania.",
    example: "Rezerwy energii pomagają podczas awarii, ale ich zużycie zmniejsza odporność na kolejne zdarzenia.",
  },
  {
    term: "Efektor",
    cyberneticPart: "effector",
    definition:
      "Część wykonująca reakcję systemu: służby miejskie, ekipy techniczne, transport, komunikaty, instytucje, pojazdy, roboty i procedury wykonawcze.",
    example: "Ekipy techniczne naprawiają sieć, a komunikaty kierują zachowaniem mieszkańców.",
  },
  {
    term: "Sprzężenie zwrotne",
    definition:
      "Informacja o skutkach działania wracająca do systemu. Miasto sprawdza, czy naprawa, komunikat albo regulacja rzeczywiście poprawiły sytuację.",
    example: "Po przekierowaniu ruchu czujniki pokazują, czy korek realnie maleje.",
  },
  {
    term: "Sterowanie społeczne",
    definition:
      "Wpływanie na zachowanie ludzi przez informacje, normy, zaufanie, motywacje, procedury i warunki działania. W duchu Kosseckiego społeczeństwo można analizować jako system sterowania.",
    example: "Sprostowanie plotki działa tylko wtedy, gdy jest wiarygodne i zgodne z realnymi pomiarami.",
  },
];
