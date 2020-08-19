import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './../screens/LoginScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {

  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{
      headerStyle: {
        backgroundColor: 'mediumseagreen',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
    </AuthStack.Navigator>
  );

}
