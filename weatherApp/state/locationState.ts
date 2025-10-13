import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '@/types/location';

const LOCATION_STATE = 'locationState';

export const saveLocationState = async (location: Location) => {
  try {
    await AsyncStorage.setItem(LOCATION_STATE, JSON.stringify(location));
  } catch (error) {
    console.error("Error saving selection", error);
  }
};

export const loadLocationState = async (): Promise<Location | null> => {
  try {
    const locationStateString = await AsyncStorage.getItem(LOCATION_STATE);
    if (locationStateString) {
      return JSON.parse(locationStateString) as Location;
    }
    return null;
  } catch (error) {
    console.error("Error loading selection", error)
    return null;
  }
}
