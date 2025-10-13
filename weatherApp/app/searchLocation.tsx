import GooglePlacesTextInput from 'react-native-google-places-textinput';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { saveLocationState } from '@/state/locationState';
import { Location } from '@/types/location';
import { useRouter } from 'expo-router';
import { loadRecentLocationsState, saveRecentLocationState } from '@/state/recentLocationsState';
import { useEffect, useState } from 'react';
import BackButton from '@/compontents/backButton';

export default function SearchLocation() {
  // NOTE: Add default locations based on service selected?
  // TODO: Add back button

  const router = useRouter();
  const [recentLocations, setRecentLocations] = useState([] as Location[]);
  useEffect(() => {
    loadRecentLocationsState().then((recentLocationsState) => {
      setRecentLocations(recentLocationsState ?? []);
    })
  }, [])

  const response = { "details": { "displayName": { "languageCode": "en", "text": "Mora" }, "formattedAddress": "Mora, Sweden", "id": "ChIJpWmgeUTbZ0YR-cUlkAQU-RQ", "location": { "latitude": 61.004878, "longitude": 14.537003 } }, "place": "places/ChIJpWmgeUTbZ0YR-cUlkAQU-RQ", "placeId": "ChIJpWmgeUTbZ0YR-cUlkAQU-RQ", "structuredFormat": { "mainText": { "matches": [Array], "text": "Mora" }, "secondaryText": { "text": "Sweden" } }, "text": { "matches": [[Object]], "text": "Mora, Sweden" }, "types": ["political", "geocode", "locality"] };
  const testLocation = { lat: 61.004878, lon: 14.537003, name: "Mora, Sweden" } as Location;
  const handlePlaceSelect = (place) => {
    console.log(place)
    let lat = place.details.location.latitude as number;
    let lon = place.details.location.longitude as number;
    const name = place.details.formattedAddress as string;
    lat = Number(lat.toFixed(6));
    lon = Number(lon.toFixed(6));
    const location = { lat: lat, lon: lon, name: name } as Location;
    console.log(location);
    saveLocationState(location);
    saveRecentLocationState(location);
    // saveLocationState(testLocation);
    // saveRecentLocationState(testLocation);
    router.navigate('./weather')
  };
  function handleRecentLocationSelect(recentLocation: Location): void {
    saveLocationState(recentLocation);
    router.navigate('./weather')
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.headerContainer}>
        <BackButton />
      </View>
      <View>
        <GooglePlacesTextInput
          apiKey=""
          fetchDetails={true}
          onPlaceSelect={handlePlaceSelect}
          style={materialStyles}
          languageCode='se'
        />
        <Image style={styles.searchIcon} source={require("@/assets/search.png")}></Image>
      </View>
      <View style={styles.recentLocationsContainer}>
        {recentLocations && recentLocations.length && recentLocations.map((recentLocation) => (
          <Pressable style={styles.recentLocation} key={recentLocation.name} onPress={() => handleRecentLocationSelect(recentLocation)} >
            <Text>{recentLocation.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  recentLocation: {
    borderWidth: 1,
    borderColor: "rgb(18, 33, 43)",
    fontWeight: "bold",
    width: "100%",
    color: "rgb(18, 33, 43)",
    padding: 10,
    backgroundColor: '#FFF',
    marginVertical: 5
  },
  recentLocationsContainer: {
    padding: 10
  },
  searchIcon: {
    position: "absolute",
    right: 20,
    top: 25,
    height: 30,
  },
  headerContainer: {
    height: 100,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: "#BBB",
    marginBottom: 5,
    width: "100%",
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const materialStyles = {
  container: {
    width: '100%',
    padding: 10
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "rgb(18, 33, 43)",
    fontSize: 16,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginTop: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  suggestionText: {
    main: {
      fontSize: 16,
      color: '#212121',
    },
    secondary: {
      fontSize: 14,
      color: '#757575',
    }
  },
  loadingIndicator: {
    color: "rgb(18, 33, 43)",
  },
  placeholder: {
    color: '#9E9E9E',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '400',
  }
};
