import React, { useState, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import AuthStackNavigator from './navigators/AuthStackNavigator';
import PatientCallStackNavigator from './navigators/PatientCallStackNavigator';
import HomeStackNavigator from './navigators/HomeStackNavigator';
import DrawerContentNavigator from './navigators/DrawerContentNavigator';
import {AuthContext, AuthMemo} from './context/authContext';
import SplashScreen from './screens/SplashScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  const initialLoginState = {
    user: null,
    userToken: null,
    isLoading: true,
  }
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          userToken: null,
          isLoading: false
        }
      case 'LOADING':
        return {
          ...prevState,
          isLoading: action.loading
        }
    }
  }

  const [ loginState, dispatch ] = useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(AuthMemo(dispatch));

  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch(err) {
        console.log('Get token failed', err);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token})
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    return <SplashScreen />
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { !loginState.userToken ?
          (
            <AuthStackNavigator />
          )
        :
          (
            <Drawer.Navigator
              initialRouteName="PatientCall"
              drawerContentOptions={{
                labelStyle: {fontWeight: 'bold', fontSize: 16 },
                itemStyle: { padding: 5, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgray'},
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
    </AuthContext.Provider>
  );
}
