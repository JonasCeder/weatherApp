import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "./weatherIcon";
import moment from "moment"
import { useEffect, useState } from "react";
import { Hour } from "@/classes/hour";
import PercipitationProbability from "./percipitationProbability";

export default function WeatherHour({ hour }: { hour: Hour }) {
  const time = moment(hour.date);
  const [percipitation, setPrecipitation] = useState("");

  useEffect(() => {
    const percipitationText = hour.precipitationAmountMin > 0
      ? `${hour.precipitationAmountMin}-${hour.precipitationAmountMax}`
      : "0"
    setPrecipitation(percipitationText);
  }, [hour])

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>{time.format("HH:mm")}</Text>
      <View style={styles.weatherIcon}>
        <WeatherIcon hour={hour} />
      </View>
      <Text style={styles.text}>{hour.temp}°</Text>
      <PercipitationProbability percipitationProbability={hour.probabilityOfPrecipitation} />
      <View style={styles.text}>
        <Text style={[styles.percipitation]}>{percipitation}</Text>
        <Text style={[styles.percipitation]}>mm</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 230,
    width: 80,
    borderRadius: 50,
    backgroundColor: "#F0F8FF",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  percipitationContainer: {
    display: "flex",
    justifyContent: "center"
  },
  text: {
    color: "rgb(18, 33, 43)",
    margin: 10,
    textAlign: "center",
    minHeight: 26
  },
  percipitation: {
    color: "#1767ce",
    textAlign: "center"
  },
  weatherIcon: {
    height: 40,
    width: 40
  }
})
