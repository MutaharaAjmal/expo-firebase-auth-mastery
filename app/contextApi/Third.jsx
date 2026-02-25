import { View, Text } from "react-native";
import React, { useContext } from "react";
import { CountContext } from "./countContext";

const Third = () => {
  const { count } = useContext(CountContext);
  return (
    <View>
      <Text>Third</Text>
      <Text className="text-4xl font-bold text-white mb-8">Count:{count}</Text>
    </View>
  );
};

export default Third;
