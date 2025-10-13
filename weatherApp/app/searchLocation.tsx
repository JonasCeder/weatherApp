import GooglePlacesTextInput from 'react-native-google-places-textinput';
import { View, StyleSheet } from 'react-native';
import { saveLocationState } from '@/state/locationState';
import { Location } from '@/types/location';
import { useRouter } from 'expo-router';

export default function SearchLocation() {
  // TODO: More styling 
  // TODO: Add current location info

  const router = useRouter();
  const materialStyles = {
    container: {
      width: '100%',
      marginHorizontal: 16,
    },
    input: {
      height: 56,
      borderWidth: 0,
      borderRadius: 4,
      fontSize: 16,
      paddingHorizontal: 12,
      backgroundColor: '#F5F5F5',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
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
      color: '#6200EE',
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
  const response = { "details": { "displayName": { "languageCode": "en", "text": "Mora" }, "formattedAddress": "Mora, Sweden", "id": "ChIJpWmgeUTbZ0YR-cUlkAQU-RQ", "location": { "latitude": 61.004878, "longitude": 14.537003 } }, "place": "places/ChIJpWmgeUTbZ0YR-cUlkAQU-RQ", "placeId": "ChIJpWmgeUTbZ0YR-cUlkAQU-RQ", "structuredFormat": { "mainText": { "matches": [Array], "text": "Mora" }, "secondaryText": { "text": "Sweden" } }, "text": { "matches": [[Object]], "text": "Mora, Sweden" }, "types": ["political", "geocode", "locality"] };
  const testLocation = { lat: 61.004878, lon: 14.537003, name: "Mora, Sweden" } as Location;
  const handlePlaceSelect = (place) => {
    // console.log(place)
    // let lat = place.details.location.latitude as number;
    // let lon = place.details.location.longitude as number;
    // const name = place.details.formattedAddress as string;
    // lat = Number(lat.toFixed(6));
    // lon = Number(lon.toFixed(6));
    // const location = { lat: lat, lon: lon, name: name } as Location;
    // console.log(location);
    // saveLocationState(location);
    saveLocationState(testLocation);
    router.navigate('./weather')
  };
  return (
    <View style={styles.searchContainer}>
      <GooglePlacesTextInput
        apiKey=""
        fetchDetails={true}
        onPlaceSelect={handlePlaceSelect}
        style={materialStyles}
        languageCode='sv'
      />
    </View>
  )
}
const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 50
  },
});

