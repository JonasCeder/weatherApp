import { getSMHIWeatherData } from "@/services/SMHI";
import { getYRWeatherData } from "@/services/YR";
import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Image } from "react-native";
import WeatherCard from "@/compontents/weatherCard";
import { Hour } from "@/interfaces/hour";
import { Day } from "@/classes/day";
import WeatherHour from "@/compontents/weatherHour";
import { WeatherService } from "@/enums/weatherService";
import { WEATHER_SERVICE_ICON_PATH } from "@/utils/weatherServiceIconPaths";
import { Location } from "@/types/location";

export default function WeatherServiceComponent({ weatherService, location }: { weatherService: WeatherService, location: Location }) {
  // TODO: Get coodrinates from phone location 
  const [logo, setLogo] = useState("")
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
          setMaxTemp(weatherData.getMaxTemp(todayWeather));
          setMinTemp(weatherData.getMinTemp(todayWeather));
          setNow(weatherData.getNow());
          setToday(todayWeather);
          setLogo(WEATHER_SERVICE_ICON_PATH.shmhi);
        })
        break;
      case WeatherService.YR:
        getYRWeatherData({ lat, lon }).then((weatherData) => {
          const todayWeather = weatherData.get24Hours();
          setMaxTemp(weatherData.getMaxTemp(todayWeather));
          setMinTemp(weatherData.getMinTemp(todayWeather));
          setNow(weatherData.getNow());
          setToday(todayWeather);
          setLogo(WEATHER_SERVICE_ICON_PATH.yr);
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
        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={styles.weatherHourContainer}>
            {today && today.length && today.map((hour, index) => (
              <WeatherHour key={index} hour={hour} />
            ))}
          </View>
        </ScrollView>
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
  }
})

