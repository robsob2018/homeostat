import type { CyberneticPart } from "../../types/game";

export type CityNode = {
  id: string;
  label: string;
  cyberneticPart: CyberneticPart;
  x: number;
  y: number;
  fallbackShape: "tower" | "building" | "panel" | "factory" | "warehouse" | "vehicle" | "water";
  asset?: string;
};

export const cityNodes: CityNode[] = [
  {
    id: "sensor-tower",
    label: "Wieża sensorów",
    cyberneticPart: "receptor",
    x: 120,
    y: 160,
    fallbackShape: "tower",
    asset: "/assets/city/kenney/sensor_tower.glb",
  },
  {
    id: "city-hall",
    label: "Centrum decyzyjne",
    cyberneticPart: "correlator",
    x: 265,
    y: 180,
    fallbackShape: "building",
    asset: "/assets/city/kaykit/city_hall.glb",
  },
  {
    id: "stability-panel",
    label: "Homeostat miasta",
    cyberneticPart: "homeostat",
    x: 265,
    y: 305,
    fallbackShape: "panel",
  },
  {
    id: "power-plant",
    label: "Elektrownia i wodociągi",
    cyberneticPart: "alimentator",
    x: 420,
    y: 165,
    fallbackShape: "factory",
    asset: "/assets/city/kenney/power_plant.glb",
  },
  {
    id: "warehouse",
    label: "Magazyn rezerw",
    cyberneticPart: "accumulator",
    x: 410,
    y: 392,
    fallbackShape: "warehouse",
    asset: "/assets/city/kenney/warehouse.glb",
  },
  {
    id: "service-depot",
    label: "Służby miejskie",
    cyberneticPart: "effector",
    x: 118,
    y: 395,
    fallbackShape: "vehicle",
    asset: "/assets/city/kaykit/service_vehicle.glb",
  },
];
