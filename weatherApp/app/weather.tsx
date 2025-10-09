import { View, StyleSheet } from "react-native";
import { WeatherService } from "@/enums/weatherService";
import { useEffect, useState } from "react";
import { loadWeatherServiceSelectionState } from "@/state/selectedWeatherServiceState";
import WeatherServiceComponent from "@/compontents/weatherServiceComponent";

export default function Weather() {
  // TODO Get coodrinates from phone location or a location picker
  // TODO Toggle weather services
  // TODO Link to change services
  // TODO Add 10 days
  // TODO Day details?

  const [weatherServices, setWeatherServices] = useState([] as WeatherService[]);
  useEffect(() => {
    getSelectedWeatherServices();
  }, []);

  const getSelectedWeatherServices = async () => {
    const selectedWeatherServices = await loadWeatherServiceSelectionState();
    if (selectedWeatherServices && selectedWeatherServices.length > 0) {
      setWeatherServices(selectedWeatherServices);
    }
  }

  return (
    <View style={styles.container}>
      {weatherServices.includes(WeatherService.SMHI) && (
        <WeatherServiceComponent weatherService={WeatherService.SMHI}></WeatherServiceComponent>
      )}

      {weatherServices.includes(WeatherService.YR) && (
        <WeatherServiceComponent weatherService={WeatherService.YR}></WeatherServiceComponent>
      )}
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

