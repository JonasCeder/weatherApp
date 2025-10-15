import { Hour } from "@/classes/hour";
import { ScrollView, View, StyleSheet } from "react-native";
import WeatherHour from "./weatherHour";

export default function WeatherHourList({ hours }: { hours: Hour[] }) {
  return (
    <ScrollView horizontal={true} contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.weatherHourContainer}>
        {hours && hours.length && hours.map((hour, index) => (
          <WeatherHour key={index} hour={hour} />
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  weatherHourContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  scrollView: {
    flex: 1,
  }
});

