import React, { useState, useEffect } from 'react';
import { View, Text, Button, AsyncStorage, StyleSheet } from 'react-native';
import ThemeButton from "../components/ThemeButton";

const ProfilePage = ({ route, navigation }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    if (route.params && route.params.user) {
      setUser(route.params.user);
    } else {
      getUserDetails();
    }
  }, [route.params]);

  const getUserDetails = async () => {
    try {
      const firstName = await AsyncStorage.getItem('user.firstName');
      const lastName = await AsyncStorage.getItem('user.lastName');

      if (firstName && lastName) {
        setUser({ firstName, lastName });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleProfileDetails = () => {
    console.log('Navigate to Profile Details');
  };

  const handleAbout = () => {
    console.log('Navigate to About');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user.firstName');
      await AsyncStorage.removeItem('user.lastName');

      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.firstName} {user.lastName}</Text>
      <View style={styles.buttonContainer}>
      <ThemeButton title="Profile Details" onPress={handleProfileDetails} />
      <ThemeButton title="About" onPress={handleAbout} />
      <ThemeButton title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },

  curveContainer: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 0,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: '',
  },


});

export default ProfilePage;
