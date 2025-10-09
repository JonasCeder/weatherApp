import { Hour } from "@/interfaces/hour";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "./weatherIcon";
import moment from "moment"

export default function WeatherHour({ hour }: { hour: Hour }) {
  const time = moment(hour.date);
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>{time.format("HH:mm")}</Text>
      <View style={styles.weatherIcon}>
        <WeatherIcon hour={hour}></WeatherIcon>
      </View>
      <Text style={styles.text}>{hour.temp}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#F0F8FF",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  text: {
    color: "rgb(18, 33, 43)",
    margin: 10,
  },
  weatherIcon: {
    height: 40,
    width: 40
  }
})
