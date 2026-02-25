import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function addUser() {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();
  const isAdmin = currentUser?.email === "mutaharaajmal@gmail.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); // Image state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User login hai
        setCurrentUser(user);
        console.log("Logged in user email:", user.email);
      } else {
        // User login nahi hai
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // --- 1. Image Picker Function ---
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // --- 2. Image Upload Logic ---
  const uploadImage = async (uri) => {
    if (!uri) return null;
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `user_profiles/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  // --- 3. READ: Users list ---
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);
  console.log(users);

  // --- 4. CREATE / UPDATE ---
  const handleSaveUser = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = image;

      // Agar nayi image select ki hai (local uri hai), toh upload karein
      if (image && image.startsWith("file://")) {
        imageUrl = await uploadImage(image);
      }

      if (editingId) {
        await updateDoc(doc(db, "users", editingId), {
          displayName: name,
          email: email,
          profilePic: imageUrl,
        });
        Alert.alert("Success", "User updated!");
      } else {
        await addDoc(collection(db, "users"), {
          displayName: name,
          email: email,
          profilePic: imageUrl,
          createdAt: serverTimestamp(),
        });
        Alert.alert("Success", "User added!");
      }
      setName("");
      setEmail("");
      setImage(null);
      setEditingId(null);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setName(user.displayName);
    setEmail(user.email);
    setImage(user.profilePic);
    setEditingId(user.id);
  };

  return (
    <View className="flex-1 bg-slate-950 p-6 pt-12">
      <Text className="text-white text-3xl font-bold mb-6">User Manager</Text>

      {/* --- FORM SECTION --- */}
      {isAdmin && (
        <View className="bg-slate-900 p-4 rounded-2xl mb-8 border border-slate-800 items-center">
          {/* Image Upload UI */}
          <TouchableOpacity
            onPress={pickImage}
            className="mb-4 bg-slate-800 w-24 h-24 rounded-full overflow-hidden justify-center items-center border border-slate-700"
          >
            {image ? (
              <Image source={{ uri: image }} className="w-full h-full" />
            ) : (
              <Ionicons name="camera" size={32} color="#64748b" />
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#64748b"
            className="bg-slate-950 text-white h-12 px-4 rounded-xl mb-3 border border-slate-800 w-full"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#64748b"
            className="bg-slate-950 text-white h-12 px-4 rounded-xl mb-4 border border-slate-800 w-full"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            onPress={handleSaveUser}
            className={`h-12 rounded-xl items-center justify-center w-full ${editingId ? "bg-amber-500" : "bg-indigo-600"}`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold">
                {editingId ? "Update User" : "Add User"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      {/* --- LIST SECTION --- */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-slate-900 p-4 rounded-2xl mb-3 flex-row justify-between items-center border border-slate-800">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: item.profilePic || "https://via.placeholder.com/150",
                }}
                className="w-12 h-12 rounded-full mr-3 bg-slate-800"
              />
              <View>
                <Text className="text-white font-bold text-lg">
                  {item.displayName}
                </Text>
                <Text className="text-slate-400 text-sm">{item.email}</Text>
              </View>
            </View>
            {isAdmin && (
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={() => startEdit(item)}
                  className="p-2 bg-slate-800 rounded-lg mr-2"
                >
                  <Ionicons name="pencil" size={20} color="#f59e0b" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  className="p-2 bg-slate-800 rounded-lg"
                >
                  <Ionicons name="trash" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
