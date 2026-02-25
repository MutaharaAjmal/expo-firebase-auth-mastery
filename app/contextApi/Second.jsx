import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { CountContext } from "./countContext";
import Third from "./Third";

const Second = () => {
  return (
    <View>
      <Third />
    </View>
  );
};

export default Second;
