import { WeatherSymbol } from "./weatherSymbol";

export class Hour {
  date: Date;
  temp: number;
  weatherSymbol?: WeatherSymbol;
  probabilityOfPrecipitation: number;
  precipitationAmountMin: number;
  precipitationAmountMax: number;

  constructor(
    date: Date,
    temp: number,
    weatherSymbol: WeatherSymbol,
    probabilityOfPrecipitation: number,
    precipitationAmountMin: number,
    precipitationAmountMax: number) {
    this.date = date;
    this.temp = temp;
    this.weatherSymbol = weatherSymbol;
    this.probabilityOfPrecipitation = probabilityOfPrecipitation;
    this.precipitationAmountMax = precipitationAmountMax;
    this.precipitationAmountMin = precipitationAmountMin;
  }
}
