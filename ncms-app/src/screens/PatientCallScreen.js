import React from 'react';
import {SafeAreaView, ScrollView, FlatList, VirtualizedList, StyleSheet, Dimensions, AppState} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import ListItem from './../components/ListItem';
import Loading from "../components/Loading";
import {AppContext} from "../context/AppContext";

export default function PatientCallScreen() {

  const {
    appStore: {settings, user_token, user, data},
    configClientIO,
    handleCallReceive
  } = React.useContext(AppContext);

  const handleCall = async (call_id) => {
    await handleCallReceive(call_id);
  }


  React.useEffect(() => {
    configClientIO();
    BackgroundTimer.runBackgroundTimer(() => {
      if (AppState.currentState === 'background') {
        configClientIO();
      } else {
        BackgroundTimer.stopBackgroundTimer();
      }
    }, 3000);
  }, []);

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
