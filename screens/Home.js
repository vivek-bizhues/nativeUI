import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

const Home = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem('token');
      // Navigate back to the login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Our App!</Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        bibendum justo eu mauris elementum, at fermentum erat cursus.
      </Text>
      <Text style={styles.paragraph}>
        Nullam in ex vitae mauris ullamcorper efficitur. Fusce vel nunc non
        tellus fermentum ullamcorper nec non ligula.
      </Text>
      <Text style={styles.farewell}>Enjoy your stay!</Text>

      {/* Logout Button */}
      <Button 
              title="Logout"  
              filled 
              onPress={handleLogout} 
              style={{
                marginTop: 18,
                marginBottom: 4,
                padding:20
              }} />
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
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  farewell: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default Home;
