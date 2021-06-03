import {getFormattedDate} from './date';
import {FileSystem} from 'react-native-unimodules';
import {ToastAndroid} from 'react-native';

export const mediaDirectory = FileSystem.documentDirectory + 'Camera/';
export const getMediaPath = (type) => mediaDirectory + getFormattedDate() + (type === 'Image' ? '.jpg' : '.mp4');

export const deleteFile = uri => {
  FileSystem.deleteAsync(uri, {idempotent: true}).then(() => {
    console.log(`File deleted: ${uri}`);
  }, reason => {
    console.log(`Error deleting file: ${uri}`, reason);
  });
};

export const createMediaDirectory = async () => {
  const {exists} = await FileSystem.getInfoAsync(mediaDirectory);
  if (!exists) {
    try {
      await FileSystem.makeDirectoryAsync(mediaDirectory, {intermediates: true});
      console.log(`Camera directory at ${mediaDirectory} created.`);
    } catch (e) {
      console.error(`Error creating camera directory at ${mediaDirectory}`, e);
      ToastAndroid.show('Error creating camera directory', ToastAndroid.SHORT);
    }
  }
};
