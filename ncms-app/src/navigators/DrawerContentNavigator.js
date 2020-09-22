import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppContext} from "../context/AppContext";

export default function DrawerContentNavigator (props) {
  const {logOut, appStore, appStore: {settings}} = React.useContext(AppContext);
  const handleLogout = () => {
    logOut();
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('./../../assets/logo.png')} style={{height: 80, width: 80}} />
        <View style={{alignItems: 'stretch', marginLeft: 15}}>
          {appStore.user.name ?
            <Text style={[styles.header_text, { fontSize: 16, color: 'white'}]}>{appStore.user.name}</Text>
          : null
          }
          {appStore.user.designation ?
            <Text style={styles.header_text}>{appStore.user.designation}</Text>
            : null
          }

          { appStore.user.department ?
            <Text style={styles.header_text}>{appStore.user.department}</Text>
            : null
          }
        </View>
      </View>

      <View style={styles.content}>
        <DrawerContentScrollView>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={styles.details}>
          <Text style={[styles.details_text, {color: 'mediumseagreen'}]}>{settings.hospital.name}</Text>
          <Text style={[styles.details_text, {fontSize: 12}]}>{settings.hospital.title}</Text>
          <Text style={[styles.details_text, {fontSize: 12}]}>Email: {settings.hospital.email}</Text>
          <Text style={[styles.details_text, {fontSize: 12}]}>Hotline: {settings.hospital.hotline}</Text>
          <Text style={[styles.details_text, {color: 'mediumseagreen'}]}>{settings.app_name}</Text>
          <Text style={styles.details_text}>{settings.company_name}</Text>
          <Text style={styles.details_text}>{settings.company_title}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              name="logout"
              size={size}
              backgroundColor="white"
              color="white" />
          )}
          labelStyle={{fontWeight: 'bold', fontSize: 16, color: 'white'}}
          label="Logout"
          onPress={() => {handleLogout()}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  header_text: {
    fontWeight: 'bold',
    color: 'lightgray'
  },
  content: {
    flex: 8,
    backgroundColor: 'white'
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    alignItems: 'center',
    padding: 15,
  },
  details_text: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    flex: 1,
    // paddingLeft: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  }

});
