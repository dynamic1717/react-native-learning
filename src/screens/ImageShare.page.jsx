import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import logo from "../../assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import { globalStyles } from "../res/globalStyles";

export const ImageShare = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialogAsync = async () => {
    if (Platform.OS === "web") {
      alert("Sharing is not available");
      return;
    }

    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
    await Sharing.shareAsync(imageTmp.uri);
  };

  if (selectedImage !== null) {
    return (
      <View style={globalStyles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity style={styles.button} onPress={openShareDialogAsync}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo} />

      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 150 }} onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
