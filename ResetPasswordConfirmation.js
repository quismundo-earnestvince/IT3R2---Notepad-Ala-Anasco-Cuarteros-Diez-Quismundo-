import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';
import InputField from "../components/InputField";
import ThemeButton from "../components/ThemeButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import zxcvbn from 'zxcvbn'; 
 
const ResetPasswordConfirmation = ({ route, navigation }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
 
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState("Show Password");
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordColor, setPasswordColor] = useState('');
 
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
 
    if (!newPassword || !confirmPassword) {
      setError('Please enter a new password and confirm it.');
      return;
    }
 
    
    try {
      const existingUserData = await AsyncStorage.getItem('userData');
      if (existingUserData) {
        const parsedUserData = JSON.parse(existingUserData);
        const updatedUserData = parsedUserData.map(user => {
          if (user.email === email) {
            return { ...user, password: newPassword };
          }
          return user;
        });
 
        
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      }
 
      
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Error updating password:', error);
      setError('An error occurred while resetting the password.');
    }
  };
 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowPasswordText(showPassword ? "Show Password" : "Hide Password");
  };
 
  const checkPasswordStrength = () => {
    const result = zxcvbn(newPassword);
    const strength = result.score;
    let color = 'red';
 
    if (strength === 0) {
      color = 'red';
      setPasswordStrength('Weak');
    } else if (strength === 1 || strength === 2) {
      color = 'orange';
      setPasswordStrength('Moderate');
    } else if (strength === 3 || strength === 4) {
      color = 'green';
      setPasswordStrength('Strong');
    }
 
    setPasswordColor(color);
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reset Password</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
 
      <InputField
        label="New Password"
        value={newPassword}
        onChangeText={(text) => {
          setNewPassword(text);
          checkPasswordStrength(); 
        }}
        secureTextEntry={!showPassword}
      />
      {passwordStrength && (
        <Text style={{ color: passwordColor, fontSize: 10, marginBottom: 10, left:-5, width:'50%' }}>
          Password Strength: {passwordStrength}
        </Text>
      )}
      <InputField
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={!showPassword}
      />
      <View style={styles.showPasswordContainer}>
        <CheckBox value={showPassword} onValueChange={toggleShowPassword} />
        <Text style={styles.showPasswordText}>{showPasswordText}</Text>
      </View>
 
      <ThemeButton title="Save Password" onPress={handleResetPassword} style={resetButtonStyles.button} />
    </View>
  );
};
 
const resetButtonStyles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
    fontFamily: 'Ineria Serif',
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
    left:-5,
    width: '50%',
    fontSize: 10,
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
    fontSize: 12,
    color: 'black',
  },
});
 
export default ResetPasswordConfirmation;
