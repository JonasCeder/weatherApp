import { ScrollView, View, StyleSheet, Text, Image, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { WeatherService } from "@/enums/weatherService";
import { useCallback, useEffect, useState } from "react";
import { loadWeatherServiceSelectionState } from "@/state/selectedWeatherServiceState";
import WeatherServiceComponent from "@/compontents/weatherServiceComponent";
import { useRouter } from "expo-router";
import { loadLocationState } from "@/state/locationState";
import { Location } from "@/types/location";
import moment from "moment";

export default function Weather() {
  // TODO: Get coodrinates from phone location
  // TODO: Day details?
  // TODO: Add wind speeds
  // FIX: Fetch times

  const router = useRouter();
  const [weatherServices, setWeatherServices] = useState([] as WeatherService[]);
  const [location, setLocation] = useState({} as Location);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
    } else {
      router.navigate('./weatherServiceSelection')
    }
    const updatedTime = moment(new Date())
    setLastUpdated(updatedTime.format("HH:mm"))
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setWeatherServices([]);
    const selectedWeatherServices = await loadWeatherServiceSelectionState();
    setWeatherServices(selectedWeatherServices ?? []);
    const updatedTime = moment(new Date())
    setLastUpdated(updatedTime.format("HH:mm"))
    setRefreshing(false);
  }, [])

  const getScrollViewHeight = () => {
    const scrollHeight = 230 * weatherServices.length
    return { height: scrollHeight }
  }

  const loadingComplete = () => {
    setLoaded(true);
  }

  return (
    <View style={{ height: "100%" }}>
      {!loaded && (
        <View style={styles.loading}>
          <Image source={require("@/assets/fair_day.svg")} />
          <Text style={styles.loadingText}>Laddar väder...</Text>
          <ActivityIndicator size="large" color={"rgb(18, 33, 43)"} />
        </View>
      )}
      <>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => router.navigate('./weatherServiceSelection')}>
            <Image style={styles.headerIcon} source={require("@/assets/settings.png")}></Image>
          </Pressable>
          <View style={styles.textContainer}>
            <Text>Senaste updaterad: {lastUpdated}</Text>
            <Text style={styles.locationName}>{location.name}</Text>
          </View>
          <Pressable onPress={() => router.navigate('./searchLocation')}>
            <Image style={styles.headerIcon} source={require("@/assets/search.png")}></Image>
          </Pressable>
        </View>
        <ScrollView style={getScrollViewHeight()} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {weatherServices.includes(WeatherService.SMHI) && (
            <WeatherServiceComponent weatherService={WeatherService.SMHI} location={location} onLoadingComplete={loadingComplete} />
          )}
          {weatherServices.includes(WeatherService.YR) && (
            <WeatherServiceComponent weatherService={WeatherService.YR} location={location} onLoadingComplete={loadingComplete} />
          )}
        </ScrollView>
      </>
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
    padding: 10,
    alignItems: 'center',
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 16
  },
  loading: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(240,248,255,1.00)",
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: "center",
  },
  loadingText: {
    fontSize: 30,
    marginBottom: 30,
  },
})
