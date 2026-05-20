import type { FailureCase } from "../types/game";

export const failures: FailureCase[] = [
  {
    id: "broken-cold-receptors",
    title: "Organizm nie reaguje na mróz",
    damagedPart: "receptor",
    scenario: "Skóra traci ciepło, ale termoreceptory nie przekazują wiarygodnego sygnału do OUN.",
    symptom: "Podwzgórze nie dostaje danych potrzebnych do zwężenia naczyń i uruchomienia drżenia.",
    explanation:
      "To awaria receptorów: system nie wykrywa bodźca. Korelator nie ma materiału do poprawnego skojarzenia sytuacji.",
  },
  {
    id: "wrong-association",
    title: "Sygnał został źle skojarzony",
    damagedPart: "correlator",
    scenario: "Receptory działają, ale po wykryciu zimna OUN wybiera reakcję typową dla przegrzania.",
    symptom: "Dane dotarły, lecz reakcja jest dobrana do innego problemu.",
    explanation:
      "To awaria korelatora: sygnały dotarły, ale zostały źle skojarzone z reakcją.",
  },
  {
    id: "weak-homeostat",
    title: "Reakcje są za późne albo za silne",
    damagedPart: "homeostat",
    scenario: "Układ widzi odchylenie, lecz odpowiedź regulacyjna pojawia się z opóźnieniem lub jest zbyt silna.",
    symptom: "Parametry oscylują: raz za nisko, raz za wysoko.",
    explanation:
      "To słaby homeostat: układ korekcji nie utrzymuje zakresu normy, tylko spóźnia się lub przeregulowuje.",
  },
  {
    id: "empty-stores",
    title: "Brakuje rezerw do działania",
    damagedPart: "accumulator",
    scenario: "OUN rozpoznaje wysiłek, ale mięśnie i wątroba mają zbyt małą rezerwę glikogenu.",
    symptom: "Organizm wie, co zrobić, lecz nie ma rezerw, by wykonać reakcję.",
    explanation:
      "To pusty akumulator: zapasy energii są za małe, więc efektory szybko tracą sprawność.",
  },
  {
    id: "weak-supply",
    title: "Dostawy zasobów są zbyt małe",
    damagedPart: "alimentator",
    scenario: "Oddychanie, płyny i regeneracja nie nadążają za potrzebami układu.",
    symptom: "Nawet poprawne decyzje szybko rozbijają się o brak tlenu, wody albo regeneracji.",
    explanation:
      "To słaby alimentator: system nie otrzymuje zasobów potrzebnych do regulacji.",
  },
  {
    id: "blocked-effectors",
    title: "System wie, ale nie wykonuje",
    damagedPart: "effector",
    scenario: "Układ regulacji wykrywa problem i dobiera reakcję, lecz mięśnie, naczynia lub gruczoły jej nie wykonują.",
    symptom: "Plan jest poprawny, ale parametry nie zmieniają się po uruchomieniu działania.",
    explanation:
      "To niesprawne efektory: korelator i homeostat wiedzą, co zrobić, ale reakcja wykonawcza nie zachodzi.",
  },
];
