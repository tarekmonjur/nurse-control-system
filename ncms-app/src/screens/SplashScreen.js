import React from 'react';
import {ActivityIndicator, ImageBackground, Text, View} from 'react-native';

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require('./../../assets/banner.png')}
      imageStyle={{opacity: .5, resizeMode: 'cover'}}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', position: 'absolute', top: 25, color: 'mediumseagreen'}}>
          Bangladesh Medical Hospital LTD
        </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 55, color: 'mediumseagreen'}}>
          Nurse Control Management System
        </Text>
        <ActivityIndicator size="large" color="#00ff00"/>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Loading...</Text>
      </View>
    </ImageBackground>
  )
}