import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef } from "react";

const useRefComp = () => {
  const myRef = useRef();
  const handleRef = () => {
    myRef.current.setNativeProps({
      text: "Mutahara Duaa",
      style: { color: "white", backgroundColor: "crimson" },
    });
    // myRef.current.focus();
  };
  return (
    // <View style={styles.container}>
    <View className="flex-1 bg-sky-100 p-5">
      <Text className="text-3xl font-bold text-center text-black mb-5">
        UseRef Component
      </Text>
      <TextInput
        ref={myRef}
        style={styles.input}
        placeholder="Enter Your Text"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleRef}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007Bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default useRefComp;
