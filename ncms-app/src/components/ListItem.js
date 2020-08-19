import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ListItem ({item, onPress, style}) {
  return (
    <View style={[styles.item, style]}>
      <View style={styles.item_cell}>
        <Text style={[styles.text, style]}>{item.bed_no}</Text>
      </View>
      <View style={styles.item_cell}>
        <Text style={[styles.text, style]}>{item.date}</Text>
      </View>
      <View style={styles.item_cell}>
       { item.status === 'call' ?
         <TouchableOpacity style={styles.button} onPress={onPress}>
           <Icon name="account-arrow-right-outline" size={18} color="white" />
           <Text style={styles.button_text}>Call Receive</Text>
         </TouchableOpacity>
         :
         <Text style={[styles.text, style]}>{item.status}</Text>
       }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e5f6e9',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  item_cell: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  text: {
    textTransform: 'capitalize',
    padding: 2,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'mediumseagreen',
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 50
  },
  button_text: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 3
  }
});