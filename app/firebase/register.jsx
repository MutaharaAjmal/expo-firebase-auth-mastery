import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
// import { auth } from "../firebase.config";
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email"), // fn chck krta email format
  password: yup
    .string()
    .required("Enter Password")
    .min(6, "Password must be atleast 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match") // compare value
    .required("Confirm Passsword is Required"),
});

const RegisterForm = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(null);

  const [emailSent, setEmailSent] = useState(false);
  useEffect(() => {
    setEmailSent(false);
    setErrorMessage(null);
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onChange",
  });
  const onSubmit = (data) => {
    setErrorMessage(null);
    setEmailSent(false);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Alert.alert("Success", "Form Submitted Successfully!");
        sendEmailVerification(user)
          .then(() => {
            alert("Verification email sent! Please check your inbox");
            setEmailSent(true);
          })
          .catch((error) => {
            setErrorMessage("Error sending verification email");
          });
        reset();
        // router.replace("/login");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email already in use");
        } else {
          setErrorMessage(error.message);
        }
        reset();
      });
  };
  return (
    <View className="flex-1 justify-center bg-gray-700 p-8">
      <Text className="text-4xl text-gray-200 text-center mb-8 font-bold">
        Create Account
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg"
              placeholder="Enter your email"
              placeholderTextColor="#A0AEC0"
              onBlur={() => {
                onBlur();
                trigger("email"); // btata h user n value likh li
              }} //input sy bahr touch kro
              onChangeText={(text) => {
                onChange(text);
                trigger("email");
                if (errorMessage) setErrorMessage(null); // Error message reset ho jayega
              }}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text className="text-red-600 mb-2">{errors.email.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg"
              placeholder="Enter your password"
              placeholderTextColor="#A0AEC0"
              onBlur={() => {
                onBlur();
                trigger("password"); // btata h user n value likh li
              }} //input sy bahr touch kro
              onChangeText={(text) => {
                onChange(text);
                trigger("password");
              }}
              value={value}
              secureTextEntry
            />
            {errors.password && (
              <Text className="text-red-600 mb-2">
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg"
              placeholder="Enter your Confirm Password"
              placeholderTextColor="#A0AEC0"
              onBlur={() => {
                onBlur();
                trigger("confirmPassword"); // btata h user n value likh li
              }} //input sy bahr touch kro
              onChangeText={(text) => {
                onChange(text);
                trigger("confirmPassword");
              }}
              value={value}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text className="text-red-600 mb-2">
                {errors.confirmPassword.message}
              </Text>
            )}
          </>
        )}
      />
      {/* Error Message */}
      {errorMessage && (
        <Text className="text-red-500 mb-4 text-center">{errorMessage}</Text>
      )}

      {/* Conditional Rendering for Button/Success Message */}
      {emailSent ? (
        <View className="bg-green-100 p-4 rounded-lg border border-green-500">
          <Text className="text-green-500 mt-4 text-center">
            A verification email has been sent to your email address. Please
            verify your email before login!
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/firebase/login")}
            className="mt-3 bg-green-600 p-3 rounded-md"
          >
            <Text className="text-white text-center font-bold">
              Go to Login
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity
            className="bg-blue-600 p-4 rounded-lg shadow-lg active:bg-blue-800"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Register
            </Text>
          </TouchableOpacity>
          <View className="mt-4 flex-row justify-center">
            <Text className="text-indigo-300 text-center">
              Already have an account ?
            </Text>
            <TouchableOpacity onPress={() => router.push("/firebase/login")}>
              <Text className="text-indigo-300 px-2">Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default RegisterForm;
