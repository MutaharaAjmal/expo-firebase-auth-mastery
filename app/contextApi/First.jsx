import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { CountContext } from "./countContext";
import Second from "./Second";

const First = () => {
  const { increment, decrement } = useContext(CountContext);
  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-5">
      <Text className="text-4xl font-bold text-white mb-8">
        Context Counter
      </Text>
      <Pressable
        className="w-full bg-indigo-500 py-3 mt-3 rounded-lg"
        onPress={increment}
      >
        {/* <Text className="text-white text-center">Go to Home</Text> */}
        <Text className="text-center text-white text-lg font-semibold">
          Increment
        </Text>
      </Pressable>
      <Pressable
        className="w-full bg-indigo-500 py-3 mt-3 rounded-lg"
        onPress={decrement}
      >
        {/* <Text className="text-white text-center">Go to Home</Text> */}
        <Text className="text-center text-white text-lg font-semibold">
          Decrement
        </Text>
      </Pressable>

      <Second />
    </View>
  );
};

export default First;
