import { WeatherSymbol } from "@/classes/weatherSymbol";

export interface Hour {
  date: Date;
  temp: number;
  weatherSymbol?: WeatherSymbol;
  probabilityOfPrecipitation: number;
  precipitationAmountMin: number;
  precipitationAmountMax: number;
};
