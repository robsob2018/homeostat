import type { FailureCase } from "../../types/game";

export const cityFailures: FailureCase[] = [
  {
    id: "city-receptors-down",
    title: "Miasto nie wykrywa zakłóceń",
    damagedPart: "receptor",
    scenario: "Czujniki są niesprawne, a zgłoszenia mieszkańców nie trafiają do systemu.",
    symptom: "Informacja jest niska, decyzje są opóźnione, stres społeczny rośnie.",
    explanation: "To awaria receptorów: miasto nie ma wiarygodnych danych wejściowych.",
  },
  {
    id: "city-wrong-correlation",
    title: "Dane są źle interpretowane",
    damagedPart: "correlator",
    scenario: "Dane docierają, ale centrum decyzyjne kojarzy je z niewłaściwą reakcją.",
    symptom: "Służby są wysyłane do złego problemu, a stabilność spada mimo aktywności.",
    explanation: "To awaria korelatora: dane były dostępne, ale system skojarzył je z niewłaściwą reakcją.",
  },
  {
    id: "city-overreaction",
    title: "Reakcje są przesadne albo za słabe",
    damagedPart: "homeostat",
    scenario: "Miasto zna dane i może działać, ale nie utrzymuje proporcji reakcji.",
    symptom: "Regulacje pogarszają zaufanie albo nie zmniejszają odchylenia.",
    explanation: "To awaria homeostatu: system nie dobiera siły korekty do skali zakłócenia.",
  },
  {
    id: "city-empty-reserves",
    title: "Rezerwy są wyczerpane",
    damagedPart: "accumulator",
    scenario: "Pierwsza reakcja działa, ale potem brakuje budżetu, zapasów albo energii.",
    symptom: "Zasoby spadają szybciej niż stabilność wraca do normy.",
    explanation: "To pusty akumulator: miasto nie ma rezerw potrzebnych do odporności.",
  },
  {
    id: "city-weak-supply",
    title: "Dopływ zasobów jest zbyt mały",
    damagedPart: "alimentator",
    scenario: "Dostawy energii, wody lub transportu nie nadążają za potrzebami.",
    symptom: "Dobre decyzje nie działają, bo system nie ma czym zasilać reakcji.",
    explanation: "To słaby alimentator: miasto nie dostarcza zasobów do działania.",
  },
  {
    id: "city-effectors-blocked",
    title: "Decyzje istnieją, wykonanie zawodzi",
    damagedPart: "effector",
    scenario: "Plany i komunikaty są poprawne, ale służby lub instytucje nie realizują działań.",
    symptom: "Parametry prawie się nie poprawiają mimo dobrego rozpoznania.",
    explanation: "To niesprawne efektory: decyzje nie są przekładane na wykonanie.",
  },
];
