// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import LottieView from 'lottie-react-native';
// import animationData from '../components/animationData.json';
// import logo from '../assets/logo.png';

// const IntroScreen = ({ navigation }) => {
//   const [showLogo, setShowLogo] = useState(false);

//   useEffect(() => {
//     const timer1 = setTimeout(() => {
//       setShowLogo(true);
//     }, 1000);

//     const timer2 = setTimeout(() => {
//       navigation.navigate('Login');
//     }, 4000);

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <LottieView
//         source={animationData}
//         autoPlay
//         loop={false}
//         progress={0}
//         style={styles.animationContainer}
//         onAnimationFinish={() => {
//           setTimeout(() => {
//             setShowLogo(true);
//           }, 1000);

//           setTimeout(() => {
//             // Navigate to the Login screen after animation completion
//             navigation.navigate('Login');
//           }, 4000);
//         }}
//       />
//       {showLogo && (
//         <View style={styles.logoContainer}>
//           <Image source={logo} style={styles.logo} />
//           <Text style={styles.text}>Notepad</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   animationContainer: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     transform: [{ scale: 2 }],
//   },
//   logoContainer: {
//     position: 'absolute',
//     top: -400,
//     left: '50%',
//     transform: [{ translateX: -50 }],
//     transition: 'top 1s ease',
//   },
//   logo: {
//     width: 400,
//     height: 400,
//   },
//   text: {
//     textAlign: 'center',
//     fontSize: 40,
//     fontFamily: 'JimNightshade-Regular',
//     opacity: 0,
//   },
// });

// export default IntroScreen;

// IntroScreen.js
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';

const IntroScreen = ({ navigation }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [logoSlide] = useState(new Animated.Value(0));
  const [textFade] = useState(new Animated.Value(0));

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
      {showLogo && (
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
    fontFamily: 'JimNightshade-Regular',
    left: '3%',
  },
});

export default IntroScreen;
