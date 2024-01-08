import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, CheckBox, ScrollView } from 'react-native';
import InputField from "../components/InputField";
import ThemeButton from "../components/ThemeButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBox from '../components/MessageBox'; 
import zxcvbn from 'zxcvbn';
import { generate } from 'random-words';
import ProfilePage from './ProfilePage'; 
import HomeScreen from './HomeScreen'; 
import { Ionicons } from '@expo/vector-icons';

const CustomCheckbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {checked ? (
        <Ionicons name="checkbox-outline" size={24} color="blue" />
      ) : (
        <Ionicons name="square-outline" size={24} color="blue" />
      )}
    </TouchableOpacity>
  );
};

const SignUp = ({ navigation }) => {
  // const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false); 
  // const [message, setMessage] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [firstnameError, setFirstNameError] = useState('');
  const [lastnameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState("Show Password");

  const [userData, setUserData] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordColor, setPasswordColor] = useState('');
  const [confirmPasswordErrorTop, setConfirmPasswordErrorTop] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 

  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // const [successMessage, setSuccessMessage] = useState('');
  // const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);

  

  useEffect(() => {
    console.log('showSuccessMessage changed:', showSuccessMessage);
  }, [showSuccessMessage]);

  
  const generateRecoveryWords = () => {
    return generate({ exactly: 3, wordsPerString: 1 });
  };

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const existingUserData = await AsyncStorage.getItem('userData');
        if (existingUserData) {
          const parsedUserData = JSON.parse(existingUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const checkPasswordStrength = () => {
    const result = zxcvbn(password);
    const strength = result.score;
    let color = 'red';

    if (strength === 0) {
      color = 'red';
      setPasswordError('');
      setPasswordStrength('Weak');
    } else if (strength === 1 || strength === 2) {
      color = 'orange';
      setPasswordError('');
      setPasswordStrength('Moderate');
    } else if (strength === 3 || strength === 4) {
      color = 'green';
      setPasswordError('');
      setPasswordStrength('Strong');
    }

    setPasswordColor(color);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowPasswordText(showPassword ? "Show Password" : "Hide Password");
  };

  const handleSignUp = async () => {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const emailAlreadyExists = (newEmail) => {
      return userData.some((user) => user.email === newEmail);
    };
  
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  
    let hasError = false;
  
    if (!firstname) {
      setFirstNameError('Please Enter First Name');
      hasError = true;
    }
    if (!lastname) {
      setLastNameError('Please Enter Last Name');
      hasError = true;
    }
  
    if (!confirmpassword) {
      setConfirmPasswordError('Please Enter Confirm Password');
      hasError = true;
    } else if (password !== confirmpassword) {
      setConfirmPasswordError('Password did not match.');
      hasError = true;
    }
  
    if (!email) {
      setEmailError('Please Enter Email');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please Enter a Valid Email');
      hasError = true;
    } else if (emailAlreadyExists(email)) {
      setEmailError('Email is already in use.');
      hasError = true;
    }
  
    if (!password) {
      setPasswordError('Please Enter Password');
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
  
    try {
      const newUser = {
        id: userData.length + 1,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        recoveryWords: generateRecoveryWords(),
      };
  
      
      const updatedUserData = [...userData, newUser];
  
      setUserData(updatedUserData);
  

      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
  
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
  
  
      navigation.navigate('HomeScreen', {
        successMessage: `Sign up successful! Your recovery words are: ${newUser.recoveryWords.join(', ')}`,
      });
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Error signing up. Please try again.');
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      
      const timeout = setTimeout(() => {
        setShowSuccessMessage(false); 
      }, 10000); 

      return () => clearTimeout(timeout); 
    }
  }, [showSuccessMessage]);

  const updatePasswordError = () => {
    if (password === '') {
      setPasswordError('Please Enter Password');
    } else {
      setPasswordError('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

      <MessageBox
          message={successMessage}
          visible={showSuccessMessage} 
          onClose={() => setShowSuccessMessage(false)}
        />
        
        
        <Text style={styles.headerText}>Sign Up</Text>
        
        

        <View style={styles.curveContainer}>

          {firstnameError ? <Text style={styles.errorText}>{firstnameError}</Text> : null}
          <InputField label="First Name" value={firstname} onChangeText={text => setFirstName(text)} secureTextEntry={false} />

          {lastnameError ? <Text style={styles.errorText}>{lastnameError}</Text> : null}
          <InputField label="Last Name" value={lastname} onChangeText={text => setLastName(text)} secureTextEntry={false} />

          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <InputField label="Email" value={email} onChangeText={text => setEmail(text)} secureTextEntry={false}/>

          
          

          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          {passwordStrength && (
            <Text style={{ color: passwordColor, 
            fontSize: 10,
            marginBottom: 4,
            textAlign: 'left',
            left: -25,
            width: '50%'}}>
            Password Strength: {passwordStrength}
            </Text>
          )}

          <InputField
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              updatePasswordError();
              checkPasswordStrength();
            }}
            secureTextEntry={!showPassword}
            errorText={passwordError ? passwordError : null}
          />

          {confirmPasswordErrorTop ? <Text style={styles.errorText}>{confirmPasswordErrorTop}</Text> : null}
          {confirmpasswordError ? <Text style={styles.errorText}>{confirmpasswordError}</Text> : null}

          <InputField
            label="Confirm Password"
            value={confirmpassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordErrorTop('');
            }}
            secureTextEntry={!showPassword}
            errorText={confirmpasswordError ? confirmpasswordError : null}
          />

          <View style={styles.showPasswordContainer}>
            <CustomCheckbox checked={showPassword} onPress={toggleShowPassword} />
            <Text style={styles.showPasswordText}>Show Password</Text>
          </View>

          <ThemeButton title="Sign Up"  onPress={handleSignUp}  style={signUpButtonStyles.button}>Sign Up</ThemeButton>

          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const screenHeight = Dimensions.get('window').height;

const signUpButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#E9B824',
    borderRadius: 20,
    width: 160,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

const styles = StyleSheet.create({
  scrollContainer: {
    minHeight: Dimensions.get('window').height,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9B824',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
    position: 'absolute',
    top: 40,
    fontFamily: 'Ineria Serif',
    color: 'white'
  },
  curveContainer: {
    position: 'absolute',
    bottom: 0,
    height: screenHeight / 1.2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 0,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInText: {
    fontSize: 10,
    bottom: -10,
    color: 'blue',
    fontFamily: 'Ineria Serif',
    paddingBottom: 20,
  },

  errorText: {
    color: 'red',
    marginBottom: 4,
    fontSize: 10,
    textAlign: 'left',
    left: -25,
    width: '50%'
  },

  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'left',
    marginBottom: 10,
    left: -55
  },

  showPasswordText: {
    marginLeft: 5,
    fontSize: 10.5,
    color: 'black',
  },
});

export default SignUp;


