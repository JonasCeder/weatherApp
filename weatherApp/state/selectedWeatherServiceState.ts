import { WeatherService } from '@/enums/weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SELECTED_WEATHER_SERVICE_KEY = 'selectedWeatherService';

export const saveWeatherServiceSelectionState = async (service: WeatherService) => {
  try {
    const selectedWeatherServices = await loadWeatherServiceSelectionState();
    if (selectedWeatherServices?.includes(service)) return;
    if (selectedWeatherServices?.length === 0) {
      await AsyncStorage.setItem(SELECTED_WEATHER_SERVICE_KEY, JSON.stringify([service.toString()]));
    }
    selectedWeatherServices?.push(service);
    await AsyncStorage.setItem(SELECTED_WEATHER_SERVICE_KEY, JSON.stringify(selectedWeatherServices));
  } catch (error) {
    console.error("Error saving selection", error);
  }
};

export const saveWeatherServicesSelectionState = async (services: WeatherService[]) => {
  try {
    await AsyncStorage.setItem(SELECTED_WEATHER_SERVICE_KEY, JSON.stringify(services));
  } catch (error) {
    console.error("Error saving selection", error);
  }
};

export const loadWeatherServiceSelectionState = async (): Promise<WeatherService[] | null> => {
  try {
    const weatherServicesString = await AsyncStorage.getItem(SELECTED_WEATHER_SERVICE_KEY);
    if (weatherServicesString) {
      return JSON.parse(weatherServicesString) as WeatherService[];
    }
    return [];
  } catch (error) {
    console.error("Error loading selection", error)
    return [];
  }
}
