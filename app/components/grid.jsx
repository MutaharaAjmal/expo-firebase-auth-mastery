import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const Grid = () => {
  const data = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
    { id: 4, title: "Item 4" },
    { id: 5, title: "Item 5" },
    { id: 6, title: "Item 6" },
    { id: 7, title: "Item 7" },
    { id: 8, title: "Item 8" },
    { id: 9, title: "Item 9" },
    { id: 10, title: "Item 10" },
    { id: 11, title: "Item 11" },
    { id: 12, title: "Item 12" },
    { id: 13, title: "Item 13" },
    { id: 14, title: "Item 14" },
  ];
  return (
    <View className="flex-1 bg-white">
      <Text className="text-3xl font-bold text-center text-black mt-6 mb-5">
        Grid
      </Text>
      <ScrollView
        // className="p-3 justify-between flex-wrap flex-row"
        contentContainerStyle={styles.container}
      >
        {data.map((item, index) => (
          <View
            key={item.id}
            className="bg-red-400 p-5 mb-3 w-44 h-28 border rounded-2xl  justify-center items-center"
          >
            <Text className="text-white text-lg font-bold uppercase">
              {item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 16,
  },
});

export default Grid;
