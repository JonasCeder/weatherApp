import { View, StyleSheet, Pressable, Text, Image, TouchableOpacity } from "react-native";
import { loadWeatherServiceSelectionState, saveWeatherServicesSelectionState } from "@/state/selectedWeatherServiceState";
import { WeatherService } from "@/enums/weatherService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import BackButton from "@/compontents/backButton";

export default function WeatherServiceSelection() {
  const router = useRouter();

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

  const handleWeatherServiceSelection = (selectedWeatherService: WeatherService) => {
    let updatedSelectedWeatherServices = [];
    if (weatherServices.includes(selectedWeatherService)) {
      updatedSelectedWeatherServices = weatherServices.filter(weatherService => weatherService !== selectedWeatherService);
    } else {
      updatedSelectedWeatherServices = [...weatherServices, selectedWeatherService];
    }

    setWeatherServices(updatedSelectedWeatherServices);
    saveWeatherServicesSelectionState(updatedSelectedWeatherServices);
  };

  const saveWeatherServiceSelection = () => {
    router.navigate('./weather');
  };

  return (
    <View style={styles.containerGradient}>
      <View style={styles.headerContainer}>
        <BackButton />
      </View>
      <View style={styles.viewContainer}>
        <Pressable style={[styles.weatherServiceButton, styles.shmhiServiceButton]} onPress={() => handleWeatherServiceSelection(WeatherService.SMHI)}>
          <Image style={styles.smhilogo} source={require("@/assets/SMHILogo.png")} />
          {weatherServices.includes(WeatherService.SMHI) && (
            <View style={styles.selected}>
              <Image source={require("@/assets/check_circle.svg")} />
            </View>
          )}
        </Pressable>
        <Pressable style={[styles.weatherServiceButton, styles.yrServiceButton]} onPress={() => handleWeatherServiceSelection(WeatherService.YR)}>
          <Image style={styles.yrlogo} source={require("@/assets/YRLogo.png")} />
          {weatherServices.includes(WeatherService.YR) && (
            <View style={styles.selected}>
              <Image source={require("@/assets/check_circle.svg")} />
            </View>
          )}
        </Pressable>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity onPress={saveWeatherServiceSelection} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View >
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
    padding: 5
  },
  headerContainer: {
    height: 100,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: "#BBB",
    marginBottom: 5,
    width: "100%",
    display: 'flex',
    justifyContent: 'flex-end',
  },
  containerGradient: {
    height: '100%',
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
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.5,
    backgroundColor: "#CCC"
  },
  yrServiceButton: {
    borderColor: "rgb(18, 33, 43)",
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
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: "rgb(18, 33, 43)",
  },
  saveButtonText: {
    color: "#FFF",
    alignSelf: "center",
    fontSize: 16,
  },
  saveButtonContainer: {
    padding: 5
  },
})

