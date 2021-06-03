import React, {useContext} from 'react';
import {ToastAndroid} from 'react-native';
import {Video} from 'expo-av';
import {deleteFile} from '../util/fs';
import {StylesContext} from '../App';

export default ({videoUri, navigation}) => {
  const styles = useContext(StylesContext);

  return (
    <Video
      source={{uri: videoUri}}
      onError={() => {
        ToastAndroid.show('Error in video recording, please try again!', ToastAndroid.SHORT);
        console.log(`Error in video recording at ${videoUri}`);
        deleteFile(videoUri);
        navigation.goBack();
      }}
      shouldPlay={true}
      useNativeControls={false}
      resizeMode="contain"
      isLooping
      style={styles.media}
    />
  );
};
