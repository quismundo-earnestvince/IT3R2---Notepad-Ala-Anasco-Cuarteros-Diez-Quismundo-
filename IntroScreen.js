import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const IntroScreen = ({ navigation }) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      navigation.navigate('Login');
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/animation.gif')}
        style={[styles.gifImage, !showLogo && { opacity: 0 }]}
        resizeMode="contain"
      />
      {showLogo && (
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.text}>Notepad</Text>
        </View>
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
    top: '10%', // Adjust the positioning as needed
    left: '8%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'JimNightshade-Regular',
  },
});

export default IntroScreen;


