import { getSMHIWeatherData } from "@/services/SMHI";
import { getYRWeatherData } from "@/services/YR";
import { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur"
import { LinearGradient } from 'expo-linear-gradient';
import WeatherCard from "@/compontents/weatherCard";
import { Hour } from "@/interfaces/hour";
import { Day } from "@/classes/day";
import WeatherHour from "@/compontents/weatherHour";

export default function Weather() {
  // TODO Get coodrinates from phone location or a location picker
  const [averageTemp, setAverageTemp] = useState(0);
  const [today, setToday] = useState({} as Day);
  const [now, setNow] = useState({} as Hour)
  const lat = "61.009722";
  const lon = "14.563611";
  useEffect(() => {
    const smhiData = getSMHIWeatherData({ lat, lon }).then((weatherData) => {
      const smhiAverageTemp = weatherData.getAverageTemp()
      setAverageTemp(smhiAverageTemp);
      setNow(weatherData.getWeatherNow());
      setToday(weatherData);
      console.log(weatherData.getWeatherNow())
    })
    const yrData = getYRWeatherData({ lat, lon }).then((weatherData) => {
      // console.log(weatherData)
    });
  }, [])
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(46, 49, 89, 1)', 'rgba(65, 42, 116, 1)', 'rgba(40, 31, 73, 1)']}
        style={styles.containerGradient}>
        <WeatherCard hour={now} maxTemp={today.MaxTemp} minTemp={today.MinTemp}></WeatherCard>
        {today.Hours && today.Hours.length && today.Hours.map((hour, index) => (
          <WeatherHour key={index} hour={hour}></WeatherHour>
        ))}
      </LinearGradient>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    // padding: 10
    // backgroundColor: "linear-gradient(90deg,rgba(46, 49, 89, 1) 0%, rgba(65, 42, 116, 1) 100%)",
  },
  containerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    padding: 10
  }
})
