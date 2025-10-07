import { Hour } from "@/interfaces/hour";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "./weatherIcon";
import moment from "moment"

export default function WeatherHour({ hour }: { hour: Hour }) {
  const time = moment(hour.date);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{time.format("hh:mm")}</Text>
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
