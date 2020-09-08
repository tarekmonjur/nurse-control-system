import React, { useState, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import AuthStackNavigator from './navigators/AuthStackNavigator';
import PatientCallStackNavigator from './navigators/PatientCallStackNavigator';
import HomeStackNavigator from './navigators/HomeStackNavigator';
import DrawerContentNavigator from './navigators/DrawerContentNavigator';
import SplashScreen from './screens/SplashScreen';
import {AppContext, AppMemo} from './context/AppContext';
import appReducer, {initialLoginState} from './context/appReducer';

const Drawer = createDrawerNavigator();

export default function App() {

  const [ appStore, dispatch ] = useReducer(appReducer, initialLoginState);
  const appContext = React.useMemo(AppMemo(appStore, dispatch));
  appContext.configPushNotification();

  if (appStore.user_token) {
    appContext.configClientIO();
  }

  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      let user = {};
      try {
        token = await AsyncStorage.getItem('userToken');
        user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
      } catch(err) {
        console.log('Get token failed', err);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token, user})
    }, 2000);
  }, []);

  if (appStore.is_loading) {
    return <SplashScreen {...appStore} />
  }

  // if (!appStore.api_host) {
  //   return <SplashScreen {...appStore} />
  // }

  return (
    <AppContext.Provider value={appContext}>
      <NavigationContainer>
        { !appStore.user_token ?
          (
            <AuthStackNavigator />
          )
        :
          (
            <Drawer.Navigator
              initialRouteName="PatientCall"
              drawerContentOptions={{
                labelStyle: {fontWeight: 'bold', fontSize: 16 },
                itemStyle: {padding: 5, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgray'},
                activeTintColor: 'mediumseagreen',
                // activeBackgroundColor: 'black',
                inactiveTintColor: 'gray',
                // inactiveBackgroundColor: 'gray'
              }}
              drawerStyle={{
                backgroundColor: 'mediumseagreen',
              }}
              drawerContent={(props) => <DrawerContentNavigator {...props} />}
            >
              <Drawer.Screen name="Home" component={HomeStackNavigator} options={{
                title: 'Home',
                drawerIcon: ({focused, color, size}) => (
                  <Icon name="home" size={size} color={color} focused={focused}></Icon>
                )
              }} />
              <Drawer.Screen name="PatientCall" component={PatientCallStackNavigator} options={{
                title: 'Patient Call',
                drawerIcon: ({focused, color, size}) => (
                  <Icon name="phone-call" size={size} color={color} focused={focused}></Icon>
                )
              }} />
            </Drawer.Navigator>
          )
        }
      </NavigationContainer>
    </AppContext.Provider>
  );
}
