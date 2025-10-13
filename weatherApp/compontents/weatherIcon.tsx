import { Hour } from "@/interfaces/hour";
import { Image } from "expo-image";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { WEATHER_ICON_PATH } from "@/utils/weatherIconPaths";

export default function WeatherIcon({ hour }: { hour: Hour }) {
  const [symbolCode, setSymbolCode] = useState("");

  useEffect(() => {
    if (hour && hour.date && hour.weatherSymbol) {

      let weatherSymbol = hour.weatherSymbol?.symbolCode ?? "";
      if (weatherSymbol === "") return;

      const nightTimeLimit = 22;
      const dayTimeLimit = 6;
      const weatherSymbolCode = hour?.weatherSymbol?.symbolCode as keyof typeof WEATHER_ICON_PATH;
      const hourTime = moment(hour.date).hours();

      if ((hourTime > dayTimeLimit)) {
        weatherSymbol = WEATHER_ICON_PATH[weatherSymbolCode].day;
      }
      if ((hourTime > nightTimeLimit) || (hourTime < dayTimeLimit)) {
        weatherSymbol = WEATHER_ICON_PATH[weatherSymbolCode].night;
      }

      console.log(weatherSymbol);
      setSymbolCode(weatherSymbol);
    }
  }, [hour])

  return (
    <Image style={{ width: '100%', height: '100%' }} source={symbolCode} />
  )
}
