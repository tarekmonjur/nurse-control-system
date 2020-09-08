import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Loading from './../components/Loading';

export default function SplashScreen({settings}) {
  return (
    <ImageBackground
      source={require('./../../assets/banner.png')}
      imageStyle={{opacity: .5, resizeMode: 'cover'}}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <Loading {...settings.hospital} />
    </ImageBackground>
  )
}