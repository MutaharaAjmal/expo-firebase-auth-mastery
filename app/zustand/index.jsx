import { View, Text, Pressable } from "react-native";
import React from "react";
import useStore from "./useStore";

const ZustandCounter = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const reset = useStore((state) => state.reset);
  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-5">
      <Text className="text-4xl font-bold text-white mb-8">
        Zustand Counter
      </Text>
      <Text className="text-4xl  text-white mb-6">Count: {count}</Text>
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
        className="w-full bg-indigo-500 py-3 mt-4 rounded-lg"
        onPress={decrement}
      >
        {/* <Text className="text-white text-center">Go to Home</Text> */}
        <Text className="text-center text-white text-lg font-semibold">
          Decrement
        </Text>
      </Pressable>
      <Pressable
        className="w-full bg-indigo-500 py-3 mt-3 rounded-lg"
        onPress={reset}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Reset
        </Text>
      </Pressable>
    </View>
  );
};

export default ZustandCounter;
