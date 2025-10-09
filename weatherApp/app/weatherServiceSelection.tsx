import { View, StyleSheet, Pressable, Text, Image, TouchableOpacity } from "react-native";
import { saveWeatherServiceSelectionState } from "@/state/selectedWeatherServiceState";
import { WeatherService } from "@/enums/weatherService";
import { useRouter } from "expo-router";

export default function WeatherServiceSelection() {
  const router = useRouter();
  const handleWeatherServiceSelection = (weatherService: WeatherService) => {
    saveWeatherServiceSelectionState(weatherService);
  };

  const saveWeatherServiceSelection = () => {
    router.navigate('./weather');
  };

  return (
    <View style={styles.containerGradient}>
      <View style={styles.viewContainer}>
        <Pressable style={[styles.weatherServiceButton, styles.shmhiServiceButton]} onPress={() => handleWeatherServiceSelection(WeatherService.SMHI)}>
          <Image style={styles.smhilogo} source={require("@/assets/SMHILogo.png")} />
        </Pressable>
        <Pressable style={[styles.weatherServiceButton, styles.yrServiceButton]} onPress={() => handleWeatherServiceSelection(WeatherService.YR)}>
          <Image style={styles.yrlogo} source={require("@/assets/YRLogo.png")} />
        </Pressable>
      </View>
      <TouchableOpacity onPress={saveWeatherServiceSelection} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    boxSizing: "border-box",
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  containerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    padding: 10
  },
  weatherServiceButton: {
    padding: 10,
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: "rgb(18, 33, 43)",
    borderWidth: 1
  },
  selected: {
    opacity: 0.5,
  },
  yrServiceButton: {
    backgroundColor: '#EEF5FF',
  },
  yrlogo: {
    height: 40,
    width: 40
  },
  shmhiServiceButton: {
    backgroundColor: '#FFF'
  },
  smhilogo: {
  },
  saveButton: {
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F0F8FF"
  },
  saveButtonText: {
    color: "rgb(18, 33, 43)",
    alignSelf: "center"
  }
})

