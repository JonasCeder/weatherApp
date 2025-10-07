import { Hour } from "@/interfaces/hour";
import { Pressable, StyleSheet, Text, View } from "react-native";
import WeatherIcon from "./weatherIcon";

export default function WeatherCard({ hour, maxTemp, minTemp }: { hour: Hour, maxTemp?: number, minTemp?: number }) {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.tempText}>{hour.temp}°C</Text>
      <Text style={styles.highLowText}>H:{maxTemp}°C L:{minTemp}°C</Text>
      <Text style={styles.location}>Mora, Sweden</Text>
      <View style={styles.weatherIcon}>
        <WeatherIcon symbolCode={hour.weatherSymbol?.symbol}></WeatherIcon>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5738B2",
    borderRadius: 10,
    height: 150,
    padding: 10,
    marginTop: 50
  },
  tempText: {
    fontSize: 44,
    color: "white",
  },
  highLowText: {
    color: "white"
  },
  location: {
    color: "white",
  },
  weatherIcon: {
    position: "absolute",
    fontSize: 30,
    right: 0,
    top: -60,
    width: 150,
    height: 150
  }
})
