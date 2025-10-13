import AsyncStorage from "@react-native-async-storage/async-storage";
import { Location } from "@/types/location";

const RECENT_LOCATIONS_STATE = "recentLocationsState";

export const saveRecentLocationState = async (location: Location) => {
  try {
    const selectedWeatherServices = await loadRecentLocationsState();
    if (selectedWeatherServices?.includes(location)) return;
    if (selectedWeatherServices?.length === 0) {
      await AsyncStorage.setItem(RECENT_LOCATIONS_STATE, JSON.stringify([location.toString()]));
    }
    selectedWeatherServices?.push(location);
    await AsyncStorage.setItem(RECENT_LOCATIONS_STATE, JSON.stringify(selectedWeatherServices));
  } catch (error) {
    console.error("Error saving selection", error);
  }
};

export const loadRecentLocationsState = async (): Promise<Location[] | null> => {
  try {
    const recentLocationsString = await AsyncStorage.getItem(RECENT_LOCATIONS_STATE);
    if (recentLocationsString) {
      return JSON.parse(recentLocationsString) as Location[];
    }
    return [];
  } catch (error) {
    console.error("Error loading selection", error)
    return [];
  }
}
