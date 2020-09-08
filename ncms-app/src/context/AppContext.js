import React from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import PushNotification from 'react-native-push-notification';
import {Alert, Platform} from "react-native";
import {get, isEmpty} from "lodash";
import socketIOClient from "socket.io-client";
const PATIENT_UI_UPDATE_TOPIC = 'broker/ui/patient';
const PATIENT_MOBILE_TOPIC = 'broker/mobile/patient/call/receive';


export const AppMemo = (appStore, dispatch) => {
  const app = Object.create({});
  return () => {
    app.appStore = appStore;
    app.clientIO = null;
    app.PATIENT_UI_UPDATE_TOPIC = PATIENT_UI_UPDATE_TOPIC;
    app.PATIENT_MOBILE_TOPIC = PATIENT_MOBILE_TOPIC;

    app.logIn = async (username, password) => {
      try {
        return fetch(`${app.appStore.settings.api_host}/api/login`, {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(async (result) => {
            console.log('login: ', JSON.stringify(result));
            if (result.status === 'success') {
              try {
                await AsyncStorage.setItem('userToken', result.results.token);
                await AsyncStorage.setItem('user', JSON.stringify(result.results));
              } catch (err) {
                console.log('Login storage failed: ', err)
              }
              dispatch({type: 'LOGIN', user: result.results, token: result.results.token});
            }
            return result;
          });
      } catch (err) {
        console.log('login request failed: ', err);
      }
    };

    app.logOut = async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
      } catch (err) {
        console.log('Logout storage failed: ', err)
      }
      dispatch({type: 'LOGOUT'})
    };

    app.getPatientCalls = async (data, setData) => {
      try {
        return fetch(`${app.appStore.settings.api_host}/api/real-time-call`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': app.appStore.user_token
          }
        })
          .then(response => response.json())
          .then(async (results) => {
            if (get(results, 'code', null) === 401) {
              await app.logOut();
            } else {
              setData({
                ...data,
                results: get(results, 'results.results', []),
                loading: false
              });
              return results;
            }
          })
          .catch((err) => {
            console.log('patient call error: ', err);
          });
      } catch (err) {
        console.log('Patient call failed: ', err)
      }
    };

    app.configPushNotification = () => {
      PushNotification.configure({
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
        },
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
      });
    };

    app.setPushNotification = (message) => {
      const title = message.title;
      const msg = message.message;
      const sub_text = '';
      const big_text = '';

      PushNotification.localNotification({
        bigText: big_text || "", // (optional) default: "message" prop
        subText: sub_text || "New Call", // (optional) default: none
        color: "green", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 500, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        title: title || "A new call generate", // (optional)
        message: msg || "Patient/Doctor call a nurse", // (required)
      });
    };

    app.configClientIO = () => {
      if (!isEmpty(app.clientIO)) {
        return app.clientIO;
      }
      app.clientIO = socketIOClient(`${appStore.settings.io_host}/patient?token=${appStore.user_token}`, {
        path: '/ncms',
        reconnectionAttempts: 15
      });
      app.clientIO.on('connect', () => {
        if (app.clientIO.connected) {
          console.log('client io connect');
        }
      });

      app.clientIO.on(PATIENT_UI_UPDATE_TOPIC, (message) => {
        // console.log('***********message2***********', message);
        app.setPushNotification(JSON.parse(message));
      });
      return app.clientIO
    };

    app.handleCallReceive = async (call_id, data, setData) => {
      Alert.alert(
        'Are you sure?',
        'you receive the patient call. if you receive the you are responsive person for take care of this call.',
        [
          {
            text: 'YES',
            onPress: () => {
              console.log('YES');
              setData({
                ...data,
                loading: true
              });
              app.clientIO.emit(PATIENT_MOBILE_TOPIC, JSON.stringify({
                call_id,
                nurse_id: app.appStore.user.id,
                message: 'success'
              }));
            },
          },
          {
            text: 'NO',
            onPress: () => {
              console.log('NO')
            },
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    };
    return app;
  };
};

export const AppContext = React.createContext();