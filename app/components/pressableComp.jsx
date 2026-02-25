import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

const PressableComponents = () => {
  const [pressState, setPressState] = useState("Button not pressed yet..!");
  const handlePress = () => {
    console.log("On Press");
  };
  const handlePressIn = () => {
    setPressState("Button Pressed In..!");
    console.log("Press In");
  };
  const handlePressOut = () => {
    setPressState("Button Pressed Out..!");
    console.log("Press Out");
  };
  const handleLongPress = () => {
    setPressState("Button Pressed Long..!");
    console.log("Press Long");
  };
  return (
    <View className="flex-1 bg-sky-100 p-5 mt-15 ">
      <Text className="text-3xl font-bold text-center text-black mb-5">
        Pressable Component
      </Text>
      <Pressable
        className="bg-purple-500  py-3 mb-3  rounded-full "
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={handleLongPress}
        delayLongPress={3000}
      >
        <Text className="text-white font-bold text-lg text-center">
          Press Me
        </Text>
      </Pressable>
      <Text className="text-xl mt-5 text-black mb-5 text-center">
        {pressState}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
export default PressableComponents;
