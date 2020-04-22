import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    try {
      const result = axios
        .get("https://reqres.in/api/users")
        .then((result) => setUser(result.data.data));
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={user}
        renderItem={({ item: userItem }) => (
          <View>
            <Image
              style={{ height: 64, width: 64 }}
              source={{ uri: userItem.avatar }}
            />
            <View>
              <Text>{`${userItem.first_name} ${userItem.last_name}`}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
