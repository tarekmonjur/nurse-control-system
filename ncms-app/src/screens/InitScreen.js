import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {isEmpty} from 'lodash';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppContext} from './../context/AppContext';
import Loading from "../components/Loading";

export default function InitScreen({navigation}) {
  const [formData, setFormData] = React.useState({
    api_host: null,
    errors: {},
    loading: false,
  });
  const {logIn, appStore: {settings}} = React.useContext(AppContext);

  const handleLogin = async () => {
    const api_host = formData.api_host;
    const errors = {};
    setFormData({
      ...formData,
      loading: true
    });
    if (!api_host) {
      errors['api_host'] = 'api host is required';
    }

    if (isEmpty(errors)) {
      try {
        const result = await logIn(username, password);
        if (result.status === 'error') {
          setFormData({
            ...formData,
            errors: result.errors || {},
            unauthorized: result.message,
            loading: false
          });
        }
      } catch (err) {
        console.log('login failed: ', err);
      }
    } else {
      setFormData({
        ...formData,
        errors: errors,
        loading: false
      });
    }
  }

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {formData.loading ?
        <Loading onlyLoading={true}/>
        : null
      }
      <View style={styles.header}>
        <Image
          source={require('./../../assets/icon.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={[styles.title]}>Nurse Call Management System</Text>
      </View>

      <View style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.title, {color: 'dimgray', textShadowRadius: .5, fontSize: 21}]}>Host Setup!</Text>
          { formData.unauthorized ?
            <Text style={styles.error}>{formData.unauthorized}</Text>
            : null
          }

        </View>
        <View style={styles.form}>

          <View style={styles.input}>
            <Text style={styles.input_label}>API Host: </Text>
            <View style={styles.input_field}>
              <FIcon name="user" size={25} />
              <TextInput
                style={styles.input_text}
                placeholder="Enter Username"
                autoCompleteType="api_host"
                autoCapitalize="none"
                onChangeText={(value) => handleChange('api_host', value)}
              />
              { formData.api_host ?
                <FIcon name="check" size={20} color="mediumseagreen"/>
                : null
              }
            </View>
            { formData.errors.api_host ?
              <Text style={styles.error}>{formData.errors.api_host}</Text>
              : null
            }
          </View>

          <View style={styles.input}>
            <Text style={styles.input_label}>Password: </Text>
            <View style={styles.input_field}>
              <FIcon name="lock" size={25} />
              <TextInput
                style={styles.input_text}
                placeholder="Enter Password"
                autoCompleteType="password"
                autoCapitalize="none"
                secureTextEntry={formData.secure}
                onChangeText={(value) => handleChange('password', value)}
              />
              { formData.password ?
                <TouchableOpacity onPress={() => handleChange('secure', true)}>
                  {formData.secure ?
                    <FIcon name="eye-slash" size={20}/>
                    :
                    <FIcon name="eye" size={20}/>
                  }
                </TouchableOpacity>
                : null
              }
            </View>
            { formData.errors.password ?
              <Text style={styles.error}>{formData.errors.password}</Text>
              : null
            }
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <MIcon name="login" color="white" size={25} />
            <Text style={styles.button_text}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const screen = Dimensions.get('screen');
const logo_height = screen.height * 0.15;
//console.log({screen});
// console.log(StatusBar.currentHeight);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'mediumseagreen',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 15
  },
  logo: {
    height: logo_height,
    width: logo_height,
    shadowColor: 'black',
    shadowRadius: 5
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 3,
    justifyContent: 'center',
  },
  content: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 15,
  },
  input: {
    marginBottom: 20,
  },
  input_label: {
    color: 'dimgray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input_field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  input_text: {
    flex: 1,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'mediumseagreen',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10
  },
  button_text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    paddingLeft: 10
  },
  error: {
    color: 'red'
  }


});

