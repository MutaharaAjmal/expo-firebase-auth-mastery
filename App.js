import "./global.css";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GoogleLogin from "./src/components/firebase/google-auth";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up to start working on your app!</Text>
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <GoogleLogin />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
