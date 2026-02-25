import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageExample = () => {
  const [username, setUsername] = useState("");
  const [storedUsername, setStoredUsername] = useState("");
  const saveUsername = async () => {
    await AsyncStorage.setItem("username", username);
    setUsername("");
    Alert.alert("Username Saved");
  };
  const getUsername = async () => {
    const savedUsername = await AsyncStorage.getItem("username");
    if (savedUsername) {
      setStoredUsername(savedUsername);
    } else {
      Alert.alert("Username Not Found");
    }
  };
  const removeUsername = async () => {
    await AsyncStorage.removeItem("username");
    setStoredUsername("");
    Alert.alert("Username Removed");
  };
  useEffect(() => {
    getUsername();
  }, []);
  return (
    <View className="flex-1 bg-sky-100 p-5">
      <Text className="text-3xl font-bold text-center text-black mb-5">
        Async Storage
      </Text>
      <TextInput
        className="border border-sky-500 rounded-2xl p-4 mb-4 bg-white shadow-lg"
        placeholder="Enter username.."
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity
        onPress={saveUsername}
        className="bg-green-400 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          Save Username
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={getUsername}
        className="bg-indigo-400 px-10 py-3 mb-3 rounded-full"
      >
        <Text className="text-white font-bold text-lg text-center">
          Get Username
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={removeUsername}
        className="bg-red-500 px-10 py-3 mb-3 rounded-full shadow-lg active:bg-pink-700"
      >
        <Text className="text-white font-bold text-lg text-center">
          Remove Username
        </Text>
      </TouchableOpacity>

      <Text className="text-xl mt-5 text-black mb-5">
        Stored Username: {storedUsername}
      </Text>
    </View>
  );
};

export default AsyncStorageExample;
