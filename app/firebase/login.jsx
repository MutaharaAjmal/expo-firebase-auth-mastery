import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";

import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutRight,
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import {
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleSignin } from "../../firebaseConfig";

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    // Yeh listener check karta hai ke user login hai ya nahi
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        router.replace("/");

        // User login hai
        // setUser(currentUser);
      } else {
        // User login nahi hai, login screen par bhej dein
        // console.log(currentUser.email);
      }
      // setLoading(false);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Latest status lane ke liye reload karein
      await user.reload();
      const updatedUser = auth.currentUser;

      if (updatedUser.emailVerified) {
        alert("Login Successful!");
        router.replace("/");
      } else {
        // 👈 Yahan hum sign-out NAHI karenge, sirf error message set karenge
        setErrorMessage(
          "📧 Email verify nahi hui! Please check your inbox and verify link, then click Login again.",
        );

        // Tip: Aap chahein toh yahan 'Resend Email' ka button bhi dikha sakti hain
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        console.log("Not signed in to Google, skipping signout");
      }
      await GoogleSignin.hasPlayServices();

      const response = await GoogleSignin.signIn();
      console.log("Full Response:", JSON.stringify(response));
      const idToken = response.data?.idToken || response.idToken;

      if (!idToken) {
        console.log("Token not found.");
        return;
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);

      alert("Login Successful with new account!");
      router.replace("/");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signin in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
      } else {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <Animated.View
      //   entering={SlideInRight.duration(500)}
      //   exiting={SlideOutLeft.duration(500)}
      //   entering={FadeIn.duration(500)}
      //   exiting={FadeOut.duration(500)}
      entering={ZoomIn.duration(500)}
      exiting={ZoomOut.duration(500)}
      className="flex-1 justify-center items-center bg-gray-900 p-5"
    >
      <Text className="text-4xl font-bold text-white mb-8">Welcome Back!</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor={"#ccc"}
        className="w-full h-12 bg-gray-800 rounded-lg text-white px-4 mb-4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor={"#ccc"}
        className="w-full h-12 bg-gray-800 rounded-lg text-white px-4 mb-4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage && (
        <Text className="text-red-500 mb-4 text-center">{errorMessage}</Text>
      )}
      {loading ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <Pressable
          className="w-full bg-indigo-500 py-3 mt-3 mb-3 rounded-lg"
          onPress={handleLogin}
        >
          {/* <Text className="text-white text-center">Go to Home</Text> */}
          <Text className="text-center text-white text-lg font-semibold">
            Login
          </Text>
        </Pressable>
      )}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleLogin}
        // disabled={isInProgress}
      />

      <TouchableOpacity
        onPress={() => router.push("/firebase/resetPassword")}
        className="mt-4"
      >
        <Text className="text-indigo-300 text-center">Forgot Password</Text>
      </TouchableOpacity>
      <View className="mt-6 flex-row justify-center">
        <Text className="text-indigo-300 text-center">
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/firebase/register")}>
          <Text className="text-indigo-300">Sign up</Text>
        </TouchableOpacity>
      </View>
      {/* <Link href="/about" asChild>
        <Pressable className="bg-blue-600 p-4 rounded-md">
          <Text className="text-white">Go to About</Text>
        </Pressable>
      </Link> */}
    </Animated.View>
  );
};

export default Login;
