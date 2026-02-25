import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const ComponentList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const contacts = [
    { id: 1, name: "Mutahara" },
    { id: 2, name: "Duaa" },
    { id: 3, name: "Ajmal" },
    { id: 4, name: "Qasim" },
    { id: 5, name: "Manan" },
    { id: 6, name: "Hanan" },
  ];

  return (
    <View className="flex-1 bg-sky-100 p-5">
      <Text className="text-3xl font-bold text-center text-black mb-5">
        Component List
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/search");
        }}
        className="bg-red-400 px-10 py-3 mb-3 rounded-full"
      >
        <Text className="text-white font-bold text-lg text-center">
          Search Component
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/useRefComp");
        }}
        className="bg-green-400 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          UseRef Component
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/grid");
        }}
        className="bg-indigo-400 px-10 py-3 mb-3 rounded-full"
      >
        <Text className="text-white font-bold text-lg text-center">
          Grid Component
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/asyncStorage");
        }}
        className="bg-pink-500 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          Async Storage
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/sectionListComp");
        }}
        className="bg-orange-300 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          Section List
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/modal");
        }}
        className="bg-purple-400 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">Modal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/image");
        }}
        className="bg-red-500 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          Image Component
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/platform");
        }}
        className="bg-blue-400 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          Platform Component
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/pressableComp");
        }}
        className="bg-gray-400 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          Pressable Component
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/components/getApi");
        }}
        className="bg-orange-400 px-10 py-3 mb-3 rounded-full "
      >
        <Text className="text-white font-bold text-lg text-center">
          Get Api
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComponentList;
