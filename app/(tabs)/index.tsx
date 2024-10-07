import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { TableFirstAndLastColumnPinned } from "@/components/TableFirstAndLastColumnPinned";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import sampleData from "@/data/tableData";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Welcome!</ThemedText>
      <Text style={styles.textTest}>
        Open up App.tsx to start working on your app!
      </Text>
      <TableFirstAndLastColumnPinned data={sampleData} />

      <HelloWave />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    padding: 16,
    height: "100%",
    marginTop: 100,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  textTest: {
    fontSize: 16,
    color: "#888",
  },
});
