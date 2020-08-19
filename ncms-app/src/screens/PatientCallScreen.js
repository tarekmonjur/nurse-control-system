import React from 'react';
import {SafeAreaView, Alert, ScrollView, FlatList, VirtualizedList, StyleSheet} from 'react-native';
import ListItem from './../components/ListItem';

export default function PatientCallScreen() {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1",
      bed_no: "0001",
      status: 'call',
      date: new Date().toDateString(),
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f632",
      bed_no: "0002",
      status: 'present',
      date: new Date().toDateString(),
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d723",
      bed_no: "0003",
      status: 'received',
      date: new Date().toDateString(),
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d724",
      bed_no: "0004",
      status: 'Completed',
      date: new Date().toDateString(),
    },
  ];

  const handleCall = () => {
    Alert.alert(
      'Are you sure?',
      'you receive the patient call. if you receive the you are responsive person for take care of this call.'
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <VirtualizedList
          data={data}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          renderItem={({item}) => <ListItem item={item} onPress={handleCall} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={<ListItem
            item={{bed_no: 'Bed Number', 'date': 'Date', status: 'Call Status'}}
            style={styles.list_header} /> }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list_header: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#95eeb8'
  }
});
