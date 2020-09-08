import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEmpty, get} from 'lodash';

const getStatusAndDate = (item) => {
  let status = null;
  let date = null;
  if (get(item, 'complete', null)) {
    status = 'complete';
    date = get(item, 'complete');
  } else if (get(item, 'emergency', null)) {
    status = 'emergency';
    date = get(item, 'emergency');
  } else if (get(item, 'present', null)) {
    status = 'present';
    date = get(item, 'present');
  } else if (get(item, 'receive', null)) {
    status = 'receive';
    date = get(item, 'receive');
  } else if (get(item, 'call', null)) {
    status = 'call';
    date = get(item, 'call');
  }
  return {status, date};
}

export default function ListItem ({item, onPress, style, user}) {
  const status = item.status || getStatusAndDate(item).status;
  const bed_no = item.bed_no || get(item, 'bed.bed_no', '');
  const date = getStatusAndDate(item).date || item.date;

  return (
    <View style={[styles.item, style]}>
      <View style={styles.item_cell}>
        <Text style={[styles.text, style]}>{bed_no}</Text>
      </View>
      <View style={styles.item_cell}>
        <Text style={[styles.text, style]}>{date}</Text>
      </View>
      <View style={styles.item_cell}>
       { status === 'call' && user.type === 'nurses' ?
         <TouchableOpacity style={styles.button} onPress={() => onPress(item.id)}>
           <Icon name="account-arrow-right-outline" size={18} color="white" />
           <Text style={styles.button_text}>Call Receive</Text>
         </TouchableOpacity>
         :
         <Text style={[styles.text, style]}>{status}</Text>
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