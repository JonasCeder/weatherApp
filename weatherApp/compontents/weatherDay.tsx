import { Day } from "@/classes/day";
import { Hour } from "@/classes/hour";
import moment from "moment";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import WeatherHourList from "./weatherHourList";
import WeatherIcon from "./weatherIcon";
import PercipitationProbability from "./percipitationProbability";

export default function WeatherDay({ day }: { day: Day }) {
  const [dateString, setDateString] = useState("");
  const [precipString, setPrecipString] = useState("");
  const [probPrecip, setProbPrecip] = useState(0);
  const [midDay, setMidDay] = useState({} as Hour);
  const [activeSections, setActiveSections] = useState([]);
  useEffect(() => {
    const momentDate = moment(day.date).format("dddd DD MMMM");
    setDateString(momentDate);
    const dayMidDay = day.getMidDay();
    setMidDay(dayMidDay);
    setPrecipString(day.getPrecipitationString());
    setProbPrecip(day.getMaxProbabilityOfPercipitation());
  }, [day, dateString])

  const sections = [{
    content:
      <View style={styles.weahterHourListContainer}>
        <WeatherHourList hours={day.hours} />
      </View>
  }];

  function renderContent(section, _, isActive) {
    return (
      <View>
        {section.content}
      </View>
    )
  }

  function renderHeader(section, _, isActive) {
    return (
      <View>
        <View style={styles.dateHeader}>
          <Text style={styles.dateString}>
            {dateString}
          </Text>
          <Image source={require("@/assets/arrow_down.png")}></Image>
        </View>
        <View style={styles.details}>
          <View style={styles.weatherIcon}>
            <WeatherIcon hour={midDay} />
          </View>
          <View>
            <Text>
              {day.maxTemp}°
            </Text>
            <Text>
              {day.minTemp}°
            </Text>
          </View>
          <View style={styles.perpContainer}>
            <PercipitationProbability percipitationProbability={probPrecip} />
            <Text>
              {precipString}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.weatherDayContainer}>
      <Accordion
        align="bottom"
        sections={sections}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={(sections) => setActiveSections(sections)}
        underlayColor="transparent"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  weatherDayContainer: {
    borderWidth: 1,
    borderColor: "#d0d6db",
    borderRadius: 10
  },
  dateHeader: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d0d6db",
    display: "flex",
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  details: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherSymbol: {
    height: 30,
    width: 30,
  },
  perpContainer: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-end',
    minWidth: 70
  },
  dateString: {
    lineHeight: 24
  },
  weatherIcon: {
    height: 34,
    width: 34
  },
  weahterHourListContainer: {
    borderTopWidth: 1,
    borderTopColor: "#d0d6db",
    padding: 5,
    height: 250
  },
});

