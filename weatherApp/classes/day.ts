import { Hour } from "@/interfaces/hour";

export class Day {
  Hours: Hour[];
  MaxTemp?: number;
  MinTemp?: number;

  constructor(hours?: Hour[]) {
    if (!hours || hours === undefined) this.Hours = [];

    hours = hours.filter((hour) => {
      const hourTime = hour.date.toISOString().slice(0, -1);
      const hourDate: Date = new Date(Date.parse(hourTime));
      const todayDate: Date = new Date(Date.now());

      hourDate.setHours(0, 0, 0, 0);
      todayDate.setHours(0, 0, 0, 0);

      return hourDate.getTime() === todayDate.getTime();
    });

    hours = hours.map((hour) => {
      hour.temp = Math.round(hour.temp || 0)
      return hour;
    })

    const temps = hours.map((hour) => hour.temp || 0);
    this.MaxTemp = Math.max(...temps);
    this.MinTemp = Math.min(...temps);

    this.Hours = hours || [];
  }

  getAverageTemp(): number {
    const totalTemp = this.Hours.reduce((sum, hour) => sum + (hour.temp || 0), 0) / this.Hours.length;
    return totalTemp
  }

  getWeatherNow(): Hour {
    return this.Hours[0];
  }
}
