import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitScreen from './../screens/InitScreen';

const InitStack = createStackNavigator();

export default function InitStackNavigator({navigation}) {

  return (
    <InitStack.Navigator initialRouteName="Init" screenOptions={{
      headerStyle: {
        backgroundColor: 'mediumseagreen',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <InitStack.Screen name="Init" component={InitScreen} options={{ headerShown: false }}/>
    </InitStack.Navigator>
  );

}
