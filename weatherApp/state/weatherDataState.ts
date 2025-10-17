
import { WeatherData } from '@/classes/weatherData';
import { WeatherDataCache } from '@/classes/weatherDataCache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const SMHI_WEAHTER_DATA = 'smhiWeahterDataState';
const YR_WEAHTER_DATA = 'yrWeahterDataState';
const CACHE_DURATION = 10;

export const saveSMHIWeahterData = async (weahterDataCache: WeatherDataCache) => {
  try {
    await AsyncStorage.setItem(SMHI_WEAHTER_DATA, JSON.stringify(weahterDataCache));
  } catch (error) {
    console.error("Error saving selection", error);
  }
};

export const loadSMHIWeatherData = async (): Promise<WeatherData | null> => {
  try {
    const smhiWeatherDataStateString = await AsyncStorage.getItem(SMHI_WEAHTER_DATA);
    if (smhiWeatherDataStateString) {
      const weatherDataCache = WeatherDataCache.Parse(smhiWeatherDataStateString);
      return new WeatherData(weatherDataCache.hours, weatherDataCache.fetchTime, weatherDataCache.lat, weatherDataCache.lon);
    }
    return null;
  } catch (error) {
    console.error("Error loading selection", error)
    return null;
  }
}

export const saveYRWeahterData = async (weahterDataCache: WeatherDataCache) => {
  try {
    await AsyncStorage.setItem(YR_WEAHTER_DATA, JSON.stringify(weahterDataCache));
  } catch (error) {
    console.error("Error saving selection", error);
  }
};

export const loadYRWeatherData = async (): Promise<WeatherData | null> => {
  try {
    const yrWeatherDataStateString = await AsyncStorage.getItem(YR_WEAHTER_DATA);
    if (yrWeatherDataStateString) {
      const weatherDataCache = WeatherDataCache.Parse(yrWeatherDataStateString);
      return new WeatherData(weatherDataCache.hours, new Date(weatherDataCache.fetchTime), weatherDataCache.lat, weatherDataCache.lon);
    }
    return null;
  } catch (error) {
    console.error("Error loading selection", error)
    return null;
  }
}

export const shouldReFetch = (cachedWeatherData: WeatherData | null, lat: number, lon: number): boolean => {
  if (cachedWeatherData === null) return true;
  if (cachedWeatherData.lat !== lat && cachedWeatherData.lon !== lon) return true;

  const mFetchTime = moment(cachedWeatherData.fetchTime);
  const mNow = moment(new Date());
  if (mNow.isAfter(mFetchTime.add(CACHE_DURATION, 'm'))) return true;

  return false;
}
