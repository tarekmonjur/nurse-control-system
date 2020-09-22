import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

export default function Loading({onlyLoading, style, app_name, company_name, company_title}) {
  return (
    <View style={[styles.loading, onlyLoading && styles.loading_overlay, style]}>
      <Text style={[styles.title, {top: 25,}]}>{app_name}</Text>
      <Text style={[styles.title, {top: 51, fontSize: 17}]}>{company_name}</Text>
      <Text style={[styles.title, {top: 71, fontSize: 16}]}>{company_title}</Text>
      <ActivityIndicator size="large" color="#00ff00"/>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'gray'}}>Loading...</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading_overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: .7,
    zIndex: 99,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    color: 'mediumseagreen'
  }
});