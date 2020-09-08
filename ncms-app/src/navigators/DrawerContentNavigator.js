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
  const {logOut, appStore} = React.useContext(AppContext);
  const handleLogout = () => {
    logOut();
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('./../../assets/logo.png')} style={{height: 80, width: 80}} />
        <View style={{alignItems: 'stretch', marginLeft: 15}}>
          {appStore.user.name ?
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>{appStore.user.name}</Text>
          : null
          }
          {appStore.user.designation ?
            <Text style={{fontWeight: 'bold', color: 'lightgray'}}>{appStore.user.designation}</Text>
            : null
          }

          { appStore.user.department ?
            <Text style={{fontWeight: 'bold', color: 'lightgray'}}>{appStore.user.department}</Text>
            : null
          }
        </View>
      </View>

      <View style={styles.content}>
        <DrawerContentScrollView>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
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
  content: {
    flex: 8,
    backgroundColor: 'white'
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
