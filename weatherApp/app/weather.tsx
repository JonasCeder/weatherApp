import { View, StyleSheet } from "react-native";
import WeatherServiceComponent from "./weatherServiceComponent";
import { WeatherService } from "@/enums/weatherService";

export default function Weather() {
  // TODO Get coodrinates from phone location or a location picker
  // TODO Get data based on weather service picked
  return (
    <View style={styles.container}>
      <WeatherServiceComponent weatherService={WeatherService.SMHI}></WeatherServiceComponent>
      <WeatherServiceComponent weatherService={WeatherService.YR}></WeatherServiceComponent>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
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

