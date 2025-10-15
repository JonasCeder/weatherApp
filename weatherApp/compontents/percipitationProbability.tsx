import { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';


export default function PercipitationProbability({ percipitationProbability }: { percipitationProbability: number }) {
  const [percipitationProbabilityText, setPercipitationProbabilityText] = useState("");
  useEffect(() => {
    const percipitationProbabilityText = percipitationProbability > 0
      ? `${percipitationProbability}%`
      : "";
    setPercipitationProbabilityText(percipitationProbabilityText);
  }, [percipitationProbability])

  const getPercipitationProbabilityStyles = () => {
    if (percipitationProbability > 40) {
      return { borderRadius: 10, padding: 5, backgroundColor: "#99D6FF" }
    }

    if (percipitationProbability > 0) {
      return { borderRadius: 10, padding: 5, backgroundColor: "#EBEEF0" }
    }
  }

  return (
    <Text style={[styles.text, getPercipitationProbabilityStyles()]}>{percipitationProbabilityText}</Text>
  )
}
const styles = StyleSheet.create({
  text: {
    color: "rgb(18, 33, 43)",
    // margin: 10,
    textAlign: "center",
    minHeight: 26
  },
});

