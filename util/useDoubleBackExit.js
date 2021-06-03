import {useEffect, useRef} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';

export default (navigation, timeout = 2000) => {
  if (navigation.canGoBack())
    return;
  const canExitApp = useRef(false);

  useEffect(() => {
    let timeoutId;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack())
        return false;
      if (canExitApp.current)
        return false;
      else {
        ToastAndroid.show('Press Back again to exit!', ToastAndroid.SHORT);
        canExitApp.current = true;
        timeoutId = setTimeout(() => {
          canExitApp.current = false;
        }, timeout);
        return true;
      }
    });
    return () => {
      clearTimeout(timeoutId);
      backHandler.remove();
    };
  }, []);
};
