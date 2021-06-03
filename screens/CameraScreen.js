import React, {useContext, useEffect, useRef, useState} from 'react';
import {BackHandler, SafeAreaView, Text, ToastAndroid, View} from 'react-native';
import {Camera} from 'expo-camera';
import TouchableIcon from '../components/TouchableIcon';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Audio} from 'expo-av';
import {formatSecondsToElapsedTime} from '../util/date';
import {StylesContext} from '../App';

export default ({navigation}) => {
  const styles = useContext(StylesContext);

  const [isRecording, setIsRecording] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cameraType, setCameraType] = useState('back');
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [videoRecTimeElapsed, setVideoRecTimeElapsed] = useState(0);
  const isFocused = useIsFocused();
  const cameraRef = useRef();

  useEffect(async () => {
    const {status} = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  }, []);

  useEffect(() => {
    if (!isRecording)
      return;
    const interval = setInterval(() => {
      setVideoRecTimeElapsed(time => time + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isRecording) {
        stopRecording();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [isRecording]);

  const takePicture = async () => {
    try {
      setIsClicked(true);
      const image = await cameraRef.current.takePictureAsync({skipProcessing: false});
      console.log('Image taken:', image);
      navigation.navigate('ImageReview', {imageUri: image.uri});
    } catch (e) {
      console.log('Error taking picture', e);
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    } finally {
      setIsClicked(false);
    }
  };

  const recordVideo = async () => {
    if (isRecording || isClicked)
      return;
    if (!hasAudioPermission) {
      const {status} = await Audio.requestPermissionsAsync();
      setHasAudioPermission(status === 'granted');
    }

    try {
      setIsClicked(true);
      const promiseVideo = cameraRef.current.recordAsync({});
      if (promiseVideo) {
        setVideoRecTimeElapsed(0);
        setIsRecording(true);
        const video = await promiseVideo;
        console.log('Video recorded:', video);
        navigation.navigate('VideoReview', {videoUri: video.uri});
      }
    } catch (e) {
      console.log('Error recording video', e);
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    } finally {
      setIsClicked(false);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (isRecording)
      await cameraRef.current.stopRecording();
  };

  const flipCamera = () => {
    setCameraType(cameraType => {
      if (cameraType === 'front')
        return 'back';
      return 'front';
    });
  };

  const CameraButtons = () => {
    if (isRecording)
      return (
        <TouchableIcon onPress={() => stopRecording()} name={'stop'} size={50}/>
      );
    else {
      if (isClicked)
        return null;
      else
        return (
          <>
            <TouchableIcon onPress={() => takePicture()} name={'camera'} size={50}/>
            <TouchableIcon onPress={() => recordVideo()} name={'videocam'} size={50}/>
            <TouchableIcon onPress={() => flipCamera()} name={'flip-camera-ios'} size={50}/>
          </>
        );
    }
  };

  if (hasCameraPermission === null)
    return (
      <SafeAreaView style={[styles.default, {justifyContent: 'center', alignItems: 'center'}]}>
        <Icon name={'hourglass-top'} size={160} style={[styles.colorForeground, {marginBottom: 40}]}/>
        <Text style={[styles.textBig, styles.colorForeground]}>Initializing camera ...</Text>
      </SafeAreaView>
    );
  else if (hasCameraPermission === false)
    return (
      <SafeAreaView style={[styles.default, styles.centerContainer]}>
        <Icon name={'no-photography'} size={160} style={[styles.colorForeground, {marginBottom: 40}]}/>
        <Text style={[styles.textBig, styles.colorForeground]}>Please allow camera permission!</Text>
      </SafeAreaView>
    );

  // const aspectRatio = '1:1'.split(':');
  // const aspectRatio = '4:3'.split(':');
  const aspectRatio = '16:9'.split(':');

  return (
    <SafeAreaView style={styles.defaultBlack}>
      {
        isFocused &&
        <View style={styles.verticalCenterContainer}>
          <Camera
            ref={cameraRef}
            style={[styles.width100, {aspectRatio: aspectRatio[1] / aspectRatio[0]}]}
            type={cameraType}
            flashMode="auto"
            autoFocus="on"
            ratio={aspectRatio.join(':')}
            useCamera2Api={false}
            /*onCameraReady={async () => {
              // console.log(await cameraRef.current.getSupportedRatiosAsync());
            }}*/
          />
          {
            isRecording &&
            <View style={[styles.horizontalButtonContainer, {position: 'absolute', top: 0, right: 0}]}>
              <Text style={[styles.textBig, styles.colorSecondary, {margin: 20}]}>{formatSecondsToElapsedTime(videoRecTimeElapsed)}</Text>
            </View>
          }
          <View style={[styles.horizontalButtonContainer, styles.bottomFixedContainer]}>
            <CameraButtons/>
          </View>
        </View>
      }
    </SafeAreaView>
  );
}
;
