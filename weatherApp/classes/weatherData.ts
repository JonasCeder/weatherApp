import { Hour } from "@/interfaces/hour";
import { Day } from "./day";

export class WeatherData {
  days: Day[]
  constructor(hours: Hour[]) {
    hours = hours.map((hour) => {
      hour.temp = Math.round(hour.temp || 0)
      return hour;
    })

    const groupedByDate = hours.reduce<Record<string, Hour[]>>((acc, hour) => {
      const day = hour.date.toISOString().slice(0, 10);
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(hour);
      return acc;
    }, {});

    const days = Object.keys(groupedByDate).map(date => new Day(date, groupedByDate[date]));
    this.days = days;
  }

  get24Hours(): Hour[] {
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const result = this.days.flatMap(day =>
      day.hours.filter(hour => {
        const itemDate = new Date(hour.date);
        return itemDate >= now && itemDate <= next24h;
      })
    );
    console.log(result)
    return result;
  }

  getMaxTemp(hours: Hour[]): number {
    const temps = hours.map((hour) => hour.temp || 0);
    return Math.max(...temps);
  }

  getMinTemp(hours: Hour[]): number {
    const temps = hours.map((hour) => hour.temp || 0);
    return Math.min(...temps);
  }
  getNow(): Hour {
    return this.days[0].hours[0];
  }
}
