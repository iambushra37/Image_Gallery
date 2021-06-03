import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import {StatusBar, useColorScheme} from 'react-native';
import ImageReviewScreen from './screens/ImageReviewScreen';
import VideoReviewScreen from './screens/VideoReviewScreen';
import {createMediaDirectory} from './util/fs';
import CameraScreen from './screens/CameraScreen';
import GalleryScreen from './screens/GalleryScreen';
import MediaDetailScreen from './screens/MediaDetailScreen';
import Styles from './theme/Styles';
import ColorScheme from './theme/ColorScheme';

export const StylesContext = React.createContext();
const Stack = createStackNavigator();

const App = () => {
  const colorSchemeStr = useColorScheme() === 'light' ? 'light' : 'dark';
  // const colorSchemeStr = 'light';
  // const colorSchemeStr = 'dark';
  const colorScheme = ColorScheme[colorSchemeStr];
  const styles = Styles(colorScheme);

  return (
    <StylesContext.Provider value={styles}>
      <NavigationContainer>
        <StatusBar barStyle={colorSchemeStr === 'dark' ? 'light-content' : 'dark-content'} animated={true} backgroundColor={colorScheme.primary}/>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerStyle: styles.navigatorHeaderBg,
          headerTintColor: colorScheme.white,
          headerShown: false,
        }}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Camera" component={CameraScreen}/>
          <Stack.Screen name="ImageReview" component={ImageReviewScreen}/>
          <Stack.Screen name="VideoReview" component={VideoReviewScreen}/>
          <Stack.Screen name="Gallery" component={GalleryScreen}/>
          <Stack.Screen name="MediaDetail" component={MediaDetailScreen} options={{headerShown: true, title: ''}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </StylesContext.Provider>
  );
};

export default App;
createMediaDirectory();

