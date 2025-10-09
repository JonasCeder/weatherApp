import { View, StyleSheet, ScrollView } from "react-native";
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
    <ScrollView>
      {weatherServices.includes(WeatherService.SMHI) && (
        <WeatherServiceComponent weatherService={WeatherService.SMHI}></WeatherServiceComponent>
      )}

      {weatherServices.includes(WeatherService.YR) && (
        <WeatherServiceComponent weatherService={WeatherService.YR}></WeatherServiceComponent>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
})

