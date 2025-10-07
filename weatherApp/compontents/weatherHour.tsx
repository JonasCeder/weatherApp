import { Hour } from "@/interfaces/hour";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "./weatherIcon";

export default function WeatherHour({ hour }: { hour: Hour }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{hour.time}</Text>
      <View style={styles.weatherIcon}>
        <WeatherIcon symbolCode={hour.weatherSymbol?.symbol}></WeatherIcon>
      </View>
      <Text style={styles.text}>{hour.temp}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 30,
    borderRadius: 50,
    backgroundColor: "#5738B2",
  },
  text: {
    color: "#FFF"
  },
  weatherIcon: {

  }
})
