import AsyncStorage from "@react-native-async-storage/async-storage";
import { Location } from "@/types/location";

const RECENT_LOCATIONS_STATE = "recentLocationsState";

export const saveRecentLocationState = async (location: Location) => {
  try {
    let recentLocations = await loadRecentLocationsState();
    if (recentLocations.some(l => l.name === location.name)) return;
    if (recentLocations.length === 0) {
      await AsyncStorage.setItem(RECENT_LOCATIONS_STATE, JSON.stringify([location.toString()]));
    }

    if (recentLocations.length > 4) {
      recentLocations.pop();
    }

    recentLocations?.unshift(location);
    await AsyncStorage.setItem(RECENT_LOCATIONS_STATE, JSON.stringify(recentLocations));
  } catch (error) {
    console.error("Error saving selection", error);
  }
};

export const loadRecentLocationsState = async (): Promise<Location[]> => {
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
