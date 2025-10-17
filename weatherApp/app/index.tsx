import { useEffect } from "react";
import { useRouter } from "expo-router";
import { loadWeatherServiceSelectionState } from "../state/selectedWeatherServiceState";
import { loadLocationState } from "@/state/locationState";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    getSelectedWeatherServices();
  }, []);

  const getSelectedWeatherServices = async () => {
    const selectedWeatherServices = await loadWeatherServiceSelectionState();
    const selectedLocation = await loadLocationState();
    if (selectedWeatherServices && selectedLocation && selectedWeatherServices.length > 0) {
      router.navigate('./weather');
    } else if (!selectedLocation) {
      router.navigate('./searchLocation');
    } else {
      router.navigate('./weatherServiceSelection');
    }
  };
}

