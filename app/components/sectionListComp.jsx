import { View, Text, StyleSheet, SectionList } from "react-native";
import React from "react";

const SectionListScreen = () => {
  const listItems = [
    {
      title: "Fruits",
      data: [
        { id: 1, name: "Apple" },
        { id: 2, name: "Mango" },
        { id: 3, name: "Orange" },
        { id: 4, name: "Banana" },
        { id: 5, name: "Peach" },
        { id: 6, name: "Orange" },
      ],
    },
    {
      title: "Vegetables",
      data: [
        { id: 7, name: "Carrot" },
        { id: 8, name: "Potato" },
        { id: 9, name: "Tomato" },
        { id: 10, name: "Peas" },
        { id: 11, name: "Potato" },
        { id: 12, name: "Tomato" },
        { id: 13, name: "Carrot" },
        { id: 14, name: "Potato" },
        { id: 15, name: "Tomato" },
      ],
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={style.item}>
        <Text style={style.title}>{item.name}</Text>
      </View>
    );
  };
  const rendersectionHeader = ({ section }) => {
    return (
      <View style={style.header}>
        <Text style={style.headerTitle}>{section.title}</Text>
      </View>
    );
  };
  return (
    <View className="flex-1 bg-sky-100 p-5 mb-14">
      <Text className="text-3xl font-bold text-center text-black mb-5">
        Section List Screen
      </Text>
      <SectionList
        sections={listItems}
        renderItem={renderItem}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={rendersectionHeader}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    paddingTop: 15,
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: "#add8e6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    color: "#fff",
    fontSize: 18,
  },
  header: {
    backgroundColor: "#90ee90",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
export default SectionListScreen;
