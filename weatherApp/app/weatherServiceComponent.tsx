import { getSMHIWeatherData } from "@/services/SMHI";
import { getYRWeatherData } from "@/services/YR";
import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Image } from "react-native";
import WeatherCard from "@/compontents/weatherCard";
import { Hour } from "@/interfaces/hour";
import { Day } from "@/classes/day";
import WeatherHour from "@/compontents/weatherHour";
import { WeatherService } from "@/enums/weatherService";

export default function WeatherServiceComponent({ weatherService }: { weatherService: WeatherService }) {
  // TODO Get coodrinates from phone location or a location picker
  // TODO Get data based on weather service picked
  const [today, setToday] = useState({} as Day);
  const [now, setNow] = useState({} as Hour)
  const lat = "61.009722";
  const lon = "14.563611";
  useEffect(() => {
    switch (weatherService) {
      case WeatherService.SMHI:
        getSMHIWeatherData({ lat, lon }).then((weatherData) => {
          setNow(weatherData.getWeatherNow());
          setToday(weatherData);
        })
        break;
      case WeatherService.YR:
        getYRWeatherData({ lat, lon }).then((weatherData) => {
          setNow(weatherData.getWeatherNow());
          setToday(weatherData);
        })
        break;
      default:
        break;
    }
  }, [weatherService])

  return (
    <View style={styles.containerGradient}>
      <View style={[styles.weatherServiceContaier, styles.smhiWeatherServiceContainer]}>
        <Image style={styles.smhilogo} source={require("@/assets/SMHILogo.png")}></Image>
        {now && (
          <WeatherCard hour={now} maxTemp={today.MaxTemp} minTemp={today.MinTemp}></WeatherCard>
        )}
        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={styles.weatherHourContainer}>
            {today.Hours && today.Hours.length && today.Hours.map((hour, index) => (
              <WeatherHour key={index} hour={hour}></WeatherHour>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    height: 130
  },
  weatherServiceContaier: {
    padding: 10,
    borderRadius: 20
  },
  smhiWeatherServiceContainer: {
    backgroundColor: '#FFF'
  },
  containerGradient: {
    // position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    padding: 10,
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
    width: 80
  },
  yrlogo: {
    resizeMode: "contain",
    height: 80,
    width: 80
  }
})

