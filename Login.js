import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font';
// import CheckBox from '@react-native-community/checkbox';
import InputField from "../components/InputField";
import ThemeButton from "../components/ThemeButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons'; 

const CustomCheckbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {checked ? (
        <Ionicons name="checkbox-outline" size={18} color="blue" />
      ) : (
        <Ionicons name="square-outline" size={18} color="blue" />
      )}
    </TouchableOpacity>
  );
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState(''); 
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); 


  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState("Show Password");

  const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowPasswordText(showPassword ? "Show Password" : "Hide Password");
  };

  const handleLogin = async () => {
    setEmailErrorMessage('');
    setPasswordErrorMessage('');

  useEffect(() => {
      const loadFonts = async () => {
        try {
          await Font.loadAsync({
            'JimNightshade-Regular': require('../assets/fonts/JimNightshade-Regular.ttf'),
    
          });
        } catch (error) {
          console.error('Font loading error:', error);
        }
      };
  
      loadFonts();
    }, []);
    

    if (password.trim() === ''){
      setPasswordErrorMessage('Please enter password');
    }

    if (username.trim() === '') {
      setEmailErrorMessage('');
      setEmailErrorMessage('Please enter email');
      return;
    }

    const normalizedEmail = username.toLowerCase();

    if (!validateEmail(username)) {
      setEmailErrorMessage('Invalid Email');
      return;
    }

    try {
  
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const users = JSON.parse(userData);
        const user = users.find((user) => user.email.toLowerCase() === normalizedEmail);

        if (!user) {
          setEmailErrorMessage('');
          setEmailErrorMessage('Email does not exist. Please Sign Up!');
        } else if (user.password !== password) {
          setPasswordErrorMessage('Wrong Password');
        } else {
          console.log('User logged in successfully');
          navigation.navigate('ProfilePage', {
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email}}),
          setUsername('');
          setPassword('');
        }
      } else {
        console.log('No user data found. Please sign up first.');
        alert('No user data found. Please sign up first.');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
    setUsername('');
    setPassword('');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Notepad</Text>
      <Image source={require('../assets/logo.png')} style={styles.bottomImage} />
      <View style={styles.curveContainer}>
        <Text style={styles.loginText}>LOGIN</Text>
        {emailErrorMessage !== '' && <Text style={styles.errorText}>{emailErrorMessage}</Text>}
        <InputField label="Username" value={username} onChangeText={text => setUsername(text)} />
        {passwordErrorMessage !== '' && <Text style={styles.errorText}>{passwordErrorMessage}</Text>}
        <InputField label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={!showPassword} />
        <View style={styles.showPasswordContainer}>
          {/* Replace the Checkbox component with CustomCheckbox */}
          <CustomCheckbox checked={showPassword} onPress={toggleShowPassword} />
          <Text style={styles.showPasswordText}>{showPasswordText}</Text>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <ThemeButton title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Don’t have an account Yet? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9B824',
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold', // or fontWeight: '500' (TEMPORARY NEED TO FEIX PA NI)
    padding: 10,
    textAlign: 'center',
    position: 'absolute',
    top: 40,
    fontFamily: 'JimNightshade-Regular', 
    color: 'black',
  },
  curveContainer: {
    position: 'absolute',
    bottom: 0,
    height: screenHeight / 1.6,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 0,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: '',
  },
  loginText: {
    fontSize: 20,
    bottom: 40,
    fontWeight: 'bold', // or fontWeight: '500' (TEMPORARY NEED TO FEIX PA NI)
    fontFamily: 'JimNightshade-Regular', //Ineria Serif (TEMPORARY NEED TO FEIX PA NI)
  },
  forgotPasswordText: {
    fontSize: 11,
    color: 'blue',
    right: -30,
    fontFamily: 'JimNightshade-Regular', //Ineria Serif (TEMPORARY NEED TO FEIX PA NI)
    marginTop: 1.5
  },
  signUpText: {
    fontSize: 12,
    bottom: -20,
    color: 'blue',
    fontFamily: 'JimNightshade-Regular', //Ineria Serif (TEMPORARY NEED TO FEIX PA NI)
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginTop: 5,
    marginBottom:5,
    left:-25,
    width: '50%'
  },

  
  bottomImage: {
    width: 350,
    height: 350,
    position: 'absolute',
    top: 0,
  },

  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'left',
    marginBottom: 10,
    left: -24,
    bottom: 5,
  
 },

 showPasswordText: {
    marginLeft: 16,
    marginTop:1,
    fontSize: 11,
    color: 'black',
 },

 checkbox: {
  padding: 0,
  left: 12 
},
  
});
export default LoginScreen;
