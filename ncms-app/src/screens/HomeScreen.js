import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

export default function PatientCallScreen() {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center',}}>
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Text>Welcome to !</Text>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}
