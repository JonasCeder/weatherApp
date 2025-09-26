import { View, StyleSheet, Pressable, Text } from "react-native";
import { saveWeatherServiceSelectionState } from "@/state/selectedWeatherServiceState";
import { WeatherService } from "@/enums/weatherService";

export default function WeatherServiceSelection() {
  const handleWeatherServiceSelection = (weatherService: WeatherService) => {
    saveWeatherServiceSelectionState(weatherService);
  };

  return (
    <View style={styles.viewContainer}>
      <Pressable style={[styles.weatherServiceButton, styles.selected]} onPress={() => handleWeatherServiceSelection(WeatherService.SMHI)}>
        <Text>SMHI</Text>
      </Pressable>
      <Pressable style={styles.weatherServiceButton} onPress={() => handleWeatherServiceSelection(WeatherService.YR)}>
        <Text>YR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    boxSizing: "border-box",
    // flexWrap: 'wrap',
    width: '100%',
    flexDirection: "row",
    // rowGap: 10,
    // columnGap: 10,
    gap: 10,
    padding: 10,
  },
  weatherServiceButton: {
    padding: 10,
    width: '50%',
    backgroundColor: 'lightblue',
    height: 100,
    // margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    opacity: 0.5,
    backgroundColor: 'lightgrey',
  }
})

