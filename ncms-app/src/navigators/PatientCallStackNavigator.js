import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import PatientCallScreen from './../screens/PatientCallScreen';

const AppStack = createStackNavigator();

export default function PatientCallStackNavigator({navigation}) {

  return (
    <AppStack.Navigator
      initialRouteName="PatientCall"
      screenOptions={{
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
      <AppStack.Screen name="PatientCall" component={PatientCallScreen} options={{ title: 'Real Time Patient Call' }}/>
    </AppStack.Navigator>
  );
}
