import { WeatherSymbol } from "@/classes/weatherSymbol";

export interface Hour {
  time?: string;
  temp?: number;
  weatherSymbol?: WeatherSymbol;
};
