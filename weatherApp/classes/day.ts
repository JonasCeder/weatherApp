import { Hour } from "./hour";

export class Day {
  hours: Hour[];
  date: string;
  maxTemp?: number;
  minTemp?: number;

  constructor(date: string, hours: Hour[]) {
    if (!hours || hours === undefined) this.hours = [];

    this.date = date;
    this.hours = hours;

    const temps = hours.map((hour) => hour.temp || 0);
    this.maxTemp = Math.max(...temps);
    this.minTemp = Math.min(...temps);

    this.hours = hours || [];
  }

  getAverageTemp(): number {
    const totalTemp = this.hours.reduce((sum, hour) => sum + (hour.temp || 0), 0) / this.hours.length;
    return totalTemp
  }

  getWeatherNow(): Hour {
    return this.hours[0];
  }

  getMidDay(): Hour {
    let midDay = this.hours.filter((hour) => {
      return hour.date.getHours() === 12;
    })

    if (midDay.length) {
      return this.hours[0];
    }

    midDay = this.hours.filter((hour) => {
      return hour.date.getHours() === 14;
    })

    if (midDay.length) {
      return midDay[0];
    }

    return this.hours[0];
  }

  getPrecipitationString(): string {
    const precipMin = this.hours
      .map((hour) => hour.precipitationAmountMin)
      .filter(precip => precip !== 0);
    const precipMax = this.hours
      .map((hour) => hour.precipitationAmountMax)
      .filter(precip => precip !== 0);

    if (!precipMin.length || !precipMax.length) return "0";

    const minPrecip = Math.min(...precipMin);
    const maxPrecip = Math.max(...precipMax);

    return `${minPrecip} - ${maxPrecip}`;
  }
  getMaxProbabilityOfPercipitation(): number {
    const probPercip = this.hours
      .map((hour) => hour.probabilityOfPrecipitation)
      .filter(pB => pB !== 0);

    if (!probPercip.length) return 0

    return Math.max(...probPercip);
  }
}
