import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home Page",
        }}
      />
      <Stack.Screen
        name="firebase/login"
        options={{
          headerTitle: "Login Page",
        }}
      />
      <Stack.Screen
        name="firebase/register"
        options={{
          headerTitle: "Register Page",
        }}
      />
      <Stack.Screen
        name="firebase/resetPassword"
        options={{
          headerTitle: "Reset Password ",
        }}
      />
      <Stack.Screen
        name="firebase/addUser"
        options={{
          headerTitle: "User Management ",
        }}
      />
      <Stack.Screen
        name="zustand/index"
        options={{
          headerTitle: "Zustand Counter ",
        }}
      />
      <Stack.Screen
        name="components/index"
        options={{
          headerTitle: "Components List ",
        }}
      />
      <Stack.Screen
        name="components/search"
        options={{
          headerTitle: "Search Component",
        }}
      />
      <Stack.Screen
        name="components/useRefComp"
        options={{
          headerTitle: "UseRef Component",
        }}
      />
      <Stack.Screen
        name="components/grid"
        options={{
          headerTitle: "Grid Component",
        }}
      />
      <Stack.Screen
        name="components/asyncStorage"
        options={{
          headerTitle: "Async Storage",
        }}
      />
      <Stack.Screen
        name="components/sectionListComp"
        options={{
          headerTitle: "Section List",
        }}
      />
      <Stack.Screen
        name="components/modal"
        options={{
          headerTitle: "Modal",
        }}
      />
      <Stack.Screen
        name="components/image"
        options={{
          headerTitle: "Image Component",
        }}
      />
      <Stack.Screen
        name="components/platform"
        options={{
          headerTitle: "Platform Component",
        }}
      />
      <Stack.Screen
        name="components/pressableComp"
        options={{
          headerTitle: "Pressable Component",
        }}
      />
    </Stack>
  );
}
