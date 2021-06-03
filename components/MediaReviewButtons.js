import {ToastAndroid, View} from 'react-native';
import React, {useContext} from 'react';
import TouchableIcon from './TouchableIcon';
import {deleteFile, getMediaPath} from '../util/fs';
import {FileSystem} from 'react-native-unimodules';
import {StylesContext} from '../App';

export default ({uri, mediaType, navigation}) => {
  const styles = useContext(StylesContext);

  return (
    <View style={[styles.horizontalButtonContainer, styles.bottomFixedContainer]}>
      <TouchableIcon onPress={() => {
        deleteFile(uri);
        navigation.goBack();
      }} name={'undo'} size={40}/>
      <TouchableIcon onPress={async () => {
        const newUri = getMediaPath(mediaType);
        await FileSystem.moveAsync({from: uri, to: newUri});
        console.log(`File moved from ${uri} to ${newUri}`);
        ToastAndroid.show(`${mediaType} saved!`, ToastAndroid.SHORT);
        navigation.popToTop();
      }} name={'done'} size={40}/>
      <TouchableIcon onPress={() => {
        deleteFile(uri);
        ToastAndroid.show(`${mediaType} discarded!`, ToastAndroid.SHORT);
        navigation.popToTop();
      }} name={'close'} size={40}/>
    </View>
  );
};
