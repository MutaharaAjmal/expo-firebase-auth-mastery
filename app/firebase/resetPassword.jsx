import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../../firebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        Alert.alert("Success", "Password reset link sent to your email!", [
          { text: "OK", onPress: () => router.push("/firebase/login") },
        ]);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.code);
        // Common error handling
        if (error.code === "auth/user-not-found") {
          Alert.alert("Error", "No user found with this email.");
        } else {
          Alert.alert("Error", error.message);
        }
      });
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-5">
      <Text className="text-3xl font-bold text-white mb-4">Reset Password</Text>
      <Text className="text-gray-400 text-center mb-8">
        Enter your registered email and we'll send you a link to reset your
        password.
      </Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor={"#ccc"}
        className="w-full h-12 bg-gray-800 rounded-lg text-white px-4 mb-6"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        className={`w-full py-3 rounded-lg ${loading ? "bg-gray-500" : "bg-indigo-500"}`}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text className="text-center text-white text-lg font-semibold">
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} className="mt-6">
        <Text className="text-indigo-300">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
