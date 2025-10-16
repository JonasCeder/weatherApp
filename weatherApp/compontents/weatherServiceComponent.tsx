import { getSMHIWeatherData } from "@/services/SMHI";
import { getYRWeatherData } from "@/services/YR";
import { useEffect, useState } from "react"
import { View, StyleSheet, Image } from "react-native";
import WeatherCard from "@/compontents/weatherCard";
import { WeatherService } from "@/enums/weatherService";
import { WEATHER_SERVICE_ICON_PATH } from "@/utils/weatherServiceIconPaths";
import { Location } from "@/types/location";
import { Hour } from "@/classes/hour";
import { Day } from "@/classes/day";
import WeatherDay from "./weatherDay";
import WeatherHourList from "./weatherHourList";

export default function WeatherServiceComponent({ weatherService, location, onLoadingComplete }: { weatherService: WeatherService, location: Location, onLoadingComplete: () => void }) {
  const [logo, setLogo] = useState("")
  const [days, setDays] = useState([] as Day[]);
  const [today, setToday] = useState([] as Hour[]);
  const [now, setNow] = useState({} as Hour)
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const lat = location.lat;
  const lon = location.lon;

  useEffect(() => {
    switch (weatherService) {
      case WeatherService.SMHI:
        getSMHIWeatherData({ lat, lon }).then((weatherData) => {
          const todayWeather = weatherData.get24Hours();
          setDays(weatherData.days);
          setMaxTemp(weatherData.getMaxTemp(todayWeather));
          setMinTemp(weatherData.getMinTemp(todayWeather));
          setNow(weatherData.getNow());
          setToday(todayWeather);
          setLogo(WEATHER_SERVICE_ICON_PATH.shmhi);
          onLoadingComplete();
        })
        break;
      case WeatherService.YR:
        getYRWeatherData({ lat, lon }).then((weatherData) => {
          const todayWeather = weatherData.get24Hours();
          setDays(weatherData.days);
          setMaxTemp(weatherData.getMaxTemp(todayWeather));
          setMinTemp(weatherData.getMinTemp(todayWeather));
          setNow(weatherData.getNow());
          setToday(todayWeather);
          setLogo(WEATHER_SERVICE_ICON_PATH.yr);
          onLoadingComplete();
        })
        break;
      default:
        break;
    }
  }, [weatherService])

  const getLogoStyles = () => {
    switch (weatherService) {
      case WeatherService.SMHI:
        return { resizeMode: "contain", width: 80 }
      case WeatherService.YR:
        return { resizeMode: "contain", height: 80, width: 80 }
      default:
        break;
    }
  }

  return (
    <View style={styles.containerGradient}>
      <View style={[styles.weatherServiceContaier, styles.smhiWeatherServiceContainer]}>
        <Image style={getLogoStyles()} source={logo} />
        {now && (
          <WeatherCard hour={now} maxTemp={maxTemp} minTemp={minTemp} location={location} />
        )}
        <WeatherHourList hours={today} />
        <View style={styles.weatherDayContainer}>
          {days.map((day) => (
            <WeatherDay key={day.date} day={day} />
          ))}
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    height: 240
  },
  weatherServiceContaier: {
    padding: 10,
    borderRadius: 20
  },
  smhiWeatherServiceContainer: {
    backgroundColor: '#FFF'
  },
  containerGradient: {
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    padding: 5,
    flex: 1
  },
  weatherHourContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  smhilogo: {
    resizeMode: "contain",
    width: 85
  },
  yrlogo: {
    resizeMode: "contain",
    height: 80,
    width: 80
  },
  weatherDayContainer: {
    marginTop: 30,
    display: 'flex',
    rowGap: 10
  },
})

