import { View, Text } from "react-native";
import React from "react";
import CountProvider from "./countContext";
import First from "./First";

const contextCounter = () => {
  return (
    <CountProvider>
      <First />
    </CountProvider>
  );
};

export default contextCounter;
