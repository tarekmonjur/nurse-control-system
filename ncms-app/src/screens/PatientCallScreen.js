import React from 'react';
import {SafeAreaView, Alert, ScrollView, FlatList, VirtualizedList, StyleSheet, Dimensions} from 'react-native';
import {get} from 'lodash';
import ListItem from './../components/ListItem';
import Loading from "../components/Loading";
import {AppContext} from "../context/AppContext";

export default function PatientCallScreen() {

  const [data, setData] = React.useState({results: [], loading: true});
  const {
    appStore: {settings, user_token, user},
    PATIENT_UI_UPDATE_TOPIC,
    getPatientCalls,
    configClientIO,
    handleCallReceive
  } = React.useContext(AppContext);

  const handleCall = async (call_id) => {
    await handleCallReceive(call_id, data, setData);
  }

  React.useEffect(() => {
    getPatientCalls(data, setData);
    const clientIO = configClientIO();
    clientIO.on(PATIENT_UI_UPDATE_TOPIC, (message) => {
      // console.log('***********message***********', message);
      getPatientCalls(data, setData);
    });
    return () => clientIO.disconnect();
  },[]);

  return (
    <SafeAreaView>
      {data.loading ?
        <Loading style={{height: height, backgroundColor: 'backgroundColor'}} onlyLoading={true}/>
        : null
      }
      <VirtualizedList
        data={data.results}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        renderItem={({item}) => <ListItem item={item} onPress={handleCall} user={user} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<ListItem
          item={{bed_no: 'Bed Number', date: 'Date', status: 'Call Status'}}
          style={styles.list_header} /> }
      />
    </SafeAreaView>
  );
}

const screen = Dimensions.get('screen');
const height = screen.height * .7;

const styles = StyleSheet.create({
  list_header: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#95eeb8'
  }
});
