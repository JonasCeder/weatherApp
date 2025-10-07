import { useEffect } from "react";
import { useRouter } from "expo-router";
import { loadWeatherServiceSelectionState } from "../state/selectedWeatherServiceState";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    getSelectedWeatherServices();
  }, []);

  const getSelectedWeatherServices = async () => {
    const selectedWeatherServices = await loadWeatherServiceSelectionState();
    if (selectedWeatherServices && selectedWeatherServices.length > 0) {
      router.navigate('./weather');
    } else {
      router.navigate('./weatherServiceSelection');
    }
  };
}

