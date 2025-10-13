import { ScrollView, View, StyleSheet, Text, Image, Pressable } from "react-native";
import { WeatherService } from "@/enums/weatherService";
import { useEffect, useState } from "react";
import { loadWeatherServiceSelectionState } from "@/state/selectedWeatherServiceState";
import WeatherServiceComponent from "@/compontents/weatherServiceComponent";
import { useRouter } from "expo-router";
import { loadLocationState } from "@/state/locationState";
import { Location } from "@/types/location";

export default function Weather() {
  // TODO: Get coodrinates from phone location
  // TODO: Add 10 days
  // TODO: Day details?
  // TODO: Fetch cache
  // TODO: Update data (auto on wakeup, drag to refresh, refresh button)

  const router = useRouter();
  const [weatherServices, setWeatherServices] = useState([] as WeatherService[]);
  const [location, setLocation] = useState({} as Location);
  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    const selectedLocation = await loadLocationState();
    if (selectedLocation) {
      setLocation(selectedLocation)
    } else {
      router.navigate('./searchLocation')
    }

    const selectedWeatherServices = await loadWeatherServiceSelectionState();
    if (selectedWeatherServices && selectedWeatherServices.length > 0) {
      setWeatherServices(selectedWeatherServices);
    }
  }

  const getScrollViewHeight = () => {
    const scrollHeight = 230 * weatherServices.length
    return { height: scrollHeight }
  }

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.navigate('./weatherServiceSelection')}>
          <Image style={styles.headerIcon} source={require("@/assets/settings.png")}></Image>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.locationName}>{location.name}</Text>
        </View>
        <Pressable onPress={() => router.navigate('./searchLocation')}>
          <Image style={styles.headerIcon} source={require("@/assets/search.png")}></Image>
        </Pressable>
      </View>
      <ScrollView style={getScrollViewHeight()}>
        {weatherServices.includes(WeatherService.SMHI) && (
          <WeatherServiceComponent weatherService={WeatherService.SMHI} location={location} />
        )}

        {weatherServices.includes(WeatherService.YR) && (
          <WeatherServiceComponent weatherService={WeatherService.YR} location={location} />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#BBB",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  headerIcon: {
    height: 30,
    width: 30,
    margin: 10,
    color: "rgb(18, 33, 43)"
  },
  container: {
    height: "100%"
  },
  textContainer: {
    padding: 15,
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 16
  }
})
