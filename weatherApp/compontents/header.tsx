import { View, Text, StyleSheet } from "react-native";
import BackButton from "./backButton";

export default function Header({ text, showBackButton }: { text: string, showBackButton?: boolean }) {
  return (
    <View style={styles.headerContainer}>
      {showBackButton || showBackButton === undefined && (
        <BackButton />
      )}
      <Text style={styles.headerText}>{text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: "#BBB",
    marginBottom: 5,
    width: "100%",
    display: 'flex',
    alignItems: "center",
    position: "relative",
    flexDirection: 'row',
  },
  headerText: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 20,
    fontWeight: "bold"
  },
});
