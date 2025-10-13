import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Image } from "react-native";

export default function BackButton() {
  const router = useRouter();
  return (
    <Pressable style={styles.backContainer} onPress={() => router.back()}>
      <Image source={require("@/assets/arrow_back.png")}></Image>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  backContainer: {
    padding: 10,
  },
});

