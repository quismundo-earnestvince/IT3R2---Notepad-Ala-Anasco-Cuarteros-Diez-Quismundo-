import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';
import * as Font from 'expo-font';

const IntroScreen = ({ navigation }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [logoSlide] = useState(new Animated.Value(0));
  const [textFade] = useState(new Animated.Value(0));
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'JimNightshade-Regular': require('../assets/fonts/JimNightshade-Regular.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    const gifFreezeTimer = setTimeout(() => {
      setShowLogo(true);
      logoSlideAnimation();
    }, 1800);

    const navigateTimer = setTimeout(() => {
      navigateToLogin();
    }, 6000); // Adjust the total time according to your preference

    return () => {
      clearTimeout(gifFreezeTimer);
      clearTimeout(navigateTimer);
    };
  }, []);

  const logoSlideAnimation = () => {
    Animated.timing(logoSlide, {
      toValue: 1,
      duration: 1000, // Adjust the duration for logo slide animation
      useNativeDriver: true,
    }).start(() => {
      textFadeAnimation();
    });
  };

  const textFadeAnimation = () => {
    Animated.timing(textFade, {
      toValue: 1,
      duration: 1000, // Adjust the duration for text fade animation
      useNativeDriver: true,
    }).start(() => {
      navigateToLogin();
    });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/animation.gif')}
        style={styles.gifImage}
        resizeMode="contain"
      />
      {showLogo && fontLoaded && (
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                {
                  translateY: logoSlide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -200], // Adjust the logo sliding distance
                  }),
                },
              ],
            },
          ]}
        >
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Animated.Text
            style={[
              styles.text,
              {
                opacity: textFade,
                marginTop: 10, // Adjust the top margin for the text
                fontFamily: 'JimNightshade-Regular', // Use the loaded custom font
              },
            ]}
          >
            Notepad
          </Animated.Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Adjust the background color as needed
  },
  gifImage: {
    width: 500,
    height: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: '30%', // Adjust the top position of the logo container
    left: '0%',
    right: '1%',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
  text: {
    fontSize: 40,
    left: '3%',
  },
});

export default IntroScreen;

