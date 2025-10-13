import { Hour } from "@/interfaces/hour";

export class Day {
  hours: Hour[];
  date: string;
  maxTemp?: number;
  minTemp?: number;

  constructor(date: string, hours: Hour[]) {
    if (!hours || hours === undefined) this.hours = [];

    // TODO: Remove day and only have Hours?
    // hours = hours.filter((hour) => {
    //   const hourTime = hour.date.toISOString().slice(0, -1);
    //   const hourDate: Date = new Date(Date.parse(hourTime));
    //   const todayDate: Date = new Date(Date.now());

    //   hourDate.setHours(0, 0, 0, 0);
    //   todayDate.setHours(0, 0, 0, 0);

    //   return hourDate.getTime() === todayDate.getTime();
    // });

    // hours = hours.map((hour) => {
    //   hour.temp = Math.round(hour.temp || 0)
    //   return hour;
    // })
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
}
