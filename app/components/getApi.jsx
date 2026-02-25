import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

const GET_API_LIST = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //10.0.2.2:3000/users
    // axios.get('http://192.168.2.33:3000/users').then(response => {
    //   // axios.get('http://10.0.2.2:3000/users').then(response => {
    //   setMyData(response.data);
    //   setLoading(false);
    // });
    fetch("http://192.168.1.1:3000/users").then((response) => {
      response.json().then((result) => {
        console.log(result);
        console.log(result.data);
        setMyData(result);
        console.log(myData);
      });
    });
  }, []);
  console.log(myData);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>USERS</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={myData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#00796b",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#004d40",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#00796b",
  },
});
export default GET_API_LIST;
