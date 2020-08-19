import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from "../context/authContext";

export default function DrawerContentNavigator (props) {
  const {logOut} = React.useContext(AuthContext);
  const handleLogout = () => {
    logOut();
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch'}}>

      <View style={{
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
      }}>
        <Image source={require('./../../assets/logo.png')} style={{height: 80, width: 80}} />
        <View style={{alignItems: 'stretch', marginLeft: 15,}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>Tarek Ahammed</Text>
          <Text style={{fontWeight: 'bold', color: 'lightgray'}}>Doctor</Text>
        </View>
      </View>

      <View style={{flex: 8, backgroundColor: 'white'}}>
        <DrawerContentScrollView>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Help"
              onPress={() => {}} />
        </DrawerContentScrollView>
      </View>

      <View style={{
        flex: 1,
        // paddingLeft: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
      }}>
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

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black'
  }
});
