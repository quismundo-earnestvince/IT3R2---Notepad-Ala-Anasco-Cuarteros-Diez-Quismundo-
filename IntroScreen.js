import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/animation.gif')}
        style={styles.gifImage}
        resizeMode="contain"
      />
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
  },
});

export default IntroScreen;
