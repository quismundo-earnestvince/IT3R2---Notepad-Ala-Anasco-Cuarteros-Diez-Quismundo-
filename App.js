import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import SignUp from './containers/SignUp';
import ResetPasswordConfirmation from './containers/ResetPasswordConfirmation';
import ProfilePage from './containers/ProfilePage';
import HomeScreen from './containers/HomeScreen';
import IntroScreen from './containers/IntroScreen';
import AddNoteScreen from './containers/AddNoteScreen';
import ViewNoteScreen from './containers/ViewNoteScreen';
import EditNoteScreen from './containers/EditNoteScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'JimNightshade-Regular': require('./assets/fonts/JimNightshade-Regular.ttf'),
 
  });
};

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const customTransition = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [60, 0],
          }),
        },
      ],
    },
  };
};

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
       initialRouteName="Login"
      screenOptions={{
        cardStyleInterpolator: customTransition,
        headerShown: false,
      }}
    >
       {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: true, title: 'Forgot Password' }}/>
        <Stack.Screen name="ResetPasswordConfirmation" component={ResetPasswordConfirmation} options={{ headerShown: true, title: 'Reset Password' }}/>
        <Stack.Screen name="SignUp" component={SignUp}  options={{ headerShown: true, title: 'Sign Up' }} />
        {/* <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false, title: 'Profile Page' }}/> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
        <Stack.Screen name="ViewNoteScreen" component={ViewNoteScreen} />
        <Stack.Screen name="EditNoteScreen" component={EditNoteScreen} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
