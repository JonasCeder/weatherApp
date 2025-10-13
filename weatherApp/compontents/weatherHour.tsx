import { Hour } from "@/interfaces/hour";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "./weatherIcon";
import moment from "moment"
import { useEffect, useState } from "react";

export default function WeatherHour({ hour }: { hour: Hour }) {
  const time = moment(hour.date);
  const [percipitationProbability, setPrecipitationProbability] = useState("");
  const [percipitation, setPrecipitation] = useState("");

  useEffect(() => {
    const percipitationText = hour.precipitationAmountMin > 0
      ? `${hour.precipitationAmountMin}-${hour.precipitationAmountMax}`
      : "0"
    setPrecipitation(percipitationText);
    const percipitationProbabilityText = hour.probabilityOfPrecipitation > 0
      ? `${hour.probabilityOfPrecipitation}%`
      : "";
    setPrecipitationProbability(percipitationProbabilityText);
  }, [hour])

  const getPercipitationProbabilityStyles = () => {
    if (hour.probabilityOfPrecipitation > 40) {
      return { borderRadius: 10, padding: 5, backgroundColor: "#99D6FF" }
    }

    if (hour.probabilityOfPrecipitation > 0) {
      return { borderRadius: 10, padding: 5, backgroundColor: "#EBEEF0" }
    }
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>{time.format("HH:mm")}</Text>
      <View style={styles.weatherIcon}>
        <WeatherIcon hour={hour} />
      </View>
      <Text style={styles.text}>{hour.temp}°</Text>
      <Text style={[styles.text, getPercipitationProbabilityStyles()]}>{percipitationProbability}</Text>
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
