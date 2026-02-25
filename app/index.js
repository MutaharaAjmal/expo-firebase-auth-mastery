import "../global.css";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth, GoogleSignin } from "../firebaseConfig";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.replace("/firebase/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // 1. Firebase Sign Out
      await signOut(auth);

      // 2. Google Sign Out (Updated Logic)
      if (GoogleSignin) {
        const hasPreviousSignIn = await GoogleSignin.hasPreviousSignIn();

        if (hasPreviousSignIn) {
          await GoogleSignin.signOut();
          console.log("Google Sign-Out successful");
        }
      }

      alert("Logged out successfully!");
      router.replace("/firebase/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Logout failed: " + error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-5">
      {user ? (
        <View className="items-center">
          {/* Agar Google user hai toh uska photo dikhayein */}
          {user.photoURL && (
            <Image
              source={{ uri: user.photoURL }}
              className="w-24 h-24 rounded-full mb-4 border-2 border-indigo-500"
            />
          )}

          <Text className="text-white text-4xl m-2">Welcome back,</Text>

          {/* Username (Display Name) */}
          <Text className="text-gray-400 font-bold text-2xl mb-1">
            {user.displayName || "User"}
          </Text>

          {/* Email */}
          <Text className="text-indigo-300 text-lg mb-8 italic">
            {user.email}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/firebase/addUser");
            }}
            className="bg-red-500 px-10 py-3 mb-3 rounded-full shadow-lg active:bg-red-700"
          >
            <Text className="text-white font-bold text-lg">
              Add User Detail
            </Text>
          </TouchableOpacity>
          {/* 0333920027 */}
          <TouchableOpacity
            onPress={() => {
              router.push("/zustand");
            }}
            className="bg-red-500 px-10 py-3 mb-3 rounded-full shadow-lg active:bg-red-700"
          >
            <Text className="text-white font-bold text-lg">
              Open Zustand State
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-10 py-3 rounded-full shadow-lg active:bg-red-700"
          >
            <Text className="text-white font-bold text-lg">Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-white font-bold text-4xl m-2">
            No User Found..!
          </Text>
          <Text className=" text-2xl m-2 text-center text-rose-100">
            Please Login First to continue..
          </Text>

          <TouchableOpacity
            onPress={() => {
              router.push("/firebase/login");
            }}
            className="bg-red-500 px-10 py-3 mb-3 rounded-full shadow-lg active:bg-red-700"
          >
            <Text className="text-white font-bold text-lg">Go To Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/zustand");
            }}
            className="bg-indigo-400 px-10 py-3 mb-3 rounded-full"
          >
            <Text className="text-white font-bold text-lg">
              Open Zustand State
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/contextApi");
            }}
            className="bg-purple-400 px-10 py-3 mb-3 rounded-full"
          >
            <Text className="text-white font-bold text-lg">
              Open Context Api
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/components");
            }}
            className="bg-red-400 px-10 py-3 mb-3 rounded-full"
          >
            <Text className="text-white font-bold text-lg">
              Go To Component
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
