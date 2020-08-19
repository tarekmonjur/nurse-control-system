import React from 'react';
import AsyncStorage from "@react-native-community/async-storage";

export const AuthMemo = (dispatch) => (
  () => ({
    logIn: async (username, password) => {
      try {
        return fetch('http://192.168.0.198:3000/api/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(async (result) => {
            // console.log({result});
            if (result.status === 'success') {
              try {
                await AsyncStorage.setItem('userToken', result.results.token);
              } catch (err) {
                console.log('Login storage failed: ',err)
              }
              dispatch({type: 'LOGIN', user: result.result, token: result.results.token});
            }
            return result;
          });
      } catch (err) {
        console.log('Login request failed: ', err);
      }

    },
    logOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (err) {
        console.log('Logout storage failed: ',err)
      }
      dispatch({type: 'LOGOUT'})
    }
  })
);

export const AuthContext = React.createContext();