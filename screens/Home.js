import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements'; // Assuming you're using react-native-elements for Button
import axios from 'axios';

const Home = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access media library denied');
      Alert.alert('Permission Denied', 'Please grant permission to access the media library.');
    }
  };

  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // Navigate back to the login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Check if the selected image is from the new assets property (Expo SDK 42 and above)
        const selectedImage = result.assets ? result.assets[0] : result;
  
        setSelectedImage(selectedImage);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleImageUpload = async () => {
    try {
      console.log(selectedImage)
      if (!selectedImage) {
        console.error('No image selected');
        Alert.alert("No Image Selected")
        return;
      }
  
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage.uri,
        type: selectedImage.type || 'image/jpg',
        name: 'image.jpg',
      });
      console.log(formData)
  
      // Get user_id from AsyncStorage or wherever it is stored in your app
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const user_id = user?._id;
  
      if (!user_id) {
        console.error('User ID not found');
        return;
      }
  
      const response = await axios.post('http://192.168.1.7:8000/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'user-id': user_id,
          'Accept': 'application/json',
        },
      });
  
      console.log('Image upload response:', response);
  
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Our App!</Text>

      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
      )}

      <TouchableOpacity onPress={handleImagePicker}>
        <Text style={styles.imagePickerText}>Select Image</Text>
      </TouchableOpacity>

      {/* Upload Image Button */}
      <Button
        title="Upload Image"
        type="solid"
        onPress={handleImageUpload}
        containerStyle={{
          marginTop: 18,
          marginBottom: 4,
          padding: 20,
        }}
      />

      {/* Logout Button */}
      <Button
        title="Logout"
        type="solid"
        onPress={handleLogout}
        containerStyle={{
          marginTop: 18,
          marginBottom: 4,
          padding: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 16,
    marginBottom: 16,
  },
  imagePickerText: {
    color: 'blue',
    fontSize: 16,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default Home;
