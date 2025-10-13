import { Hour } from "@/interfaces/hour";
import { Pressable, StyleSheet, Text, View } from "react-native";
import WeatherIcon from "./weatherIcon";
import { Location } from "@/types/location";

export default function WeatherCard({ hour, maxTemp, minTemp, location }: { hour: Hour, maxTemp?: number, minTemp?: number, location: Location }) {

  return (
    <Pressable style={styles.container}>
      <Text style={styles.tempText}>{hour.temp}°C</Text>
      <Text style={styles.highLowText}>H:{maxTemp}°C L:{minTemp}°C</Text>
      <Text style={styles.location}>{location.name}</Text>
      <View style={styles.weatherIcon}>
        <WeatherIcon hour={hour}></WeatherIcon>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FF",
    borderRadius: 10,
    height: 150,
    padding: 10,
    marginTop: 30
  },
  tempText: {
    fontSize: 44,
    color: "rgb(18, 33, 43)",
  },
  highLowText: {
    color: "rgb(18, 33, 43)"
  },
  location: {
    color: "rgb(18, 33, 43)",
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
