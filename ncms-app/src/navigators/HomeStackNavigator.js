import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../screens/HomeScreen';

const AppStack = createStackNavigator();

export default function HomeStackNavigator({navigation}) {

  return (
    <AppStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'mediumseagreen',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <Icon.Button
          name="ios-menu"
          size={25}
          backgroundColor="mediumseagreen"
          onPress={() => navigation.openDrawer()}>
        </Icon.Button>
      )
    }}>
      <AppStack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }}/>
    </AppStack.Navigator>
  );
}
