import { View, Text } from "react-native";
import React, { createContext, useState } from "react";
import First from "./First";

export const CountContext = createContext();

const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {/* {Children} */}
      {/* <First /> */}
      {children}
    </CountContext.Provider>
  );
};

export default CountProvider;
