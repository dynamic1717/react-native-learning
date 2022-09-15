import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../res/globalStyles";

export const Home = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ImageShare")}>
          <Text style={styles.btnText}>Image Sharing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Game")}>
          <Text style={styles.btnText}>Play Puzzle 15</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 40,
  },
  btnsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "aliceblue",
    padding: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 24,
    color: "#159",
  },
});
