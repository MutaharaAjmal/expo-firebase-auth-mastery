import { View, Text, TextInput, FlatList } from "react-native";
import React, { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const contacts = [
    { id: 1, name: "Mutahara" },
    { id: 2, name: "Duaa" },
    { id: 3, name: "Ajmal" },
    { id: 4, name: "Qasim" },
    { id: 5, name: "Manan" },
    { id: 6, name: "Hanan" },
  ];
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const renderItem = ({ item }) => (
    <View className="border border-gray-200 rounded-2xl p-4 mb-4 bg-white shadow-lg">
      <Text className="text-xl  text-black-500 ">{item.name}</Text>
    </View>
  );
  return (
    <View className="flex-1 bg-sky-100 p-5">
      <Text className="text-3xl font-bold text-center text-blue-500 mb-5">
        Contact List
      </Text>
      <TextInput
        className="border border-sky-500 rounded-2xl p-4 mb-4 bg-white shadow-lg"
        placeholder="Search Contacts..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Search;
