export const initialLoginState = {
  settings: {
    app_name: 'Nurse Control Management System',
    hospital: {
      name: 'Bangladesh Medical Hospital LTD',
      title: 'Nurse Control Management System',
      address: 'Dhaka, Bangladesh',
    },
    api_host: null, //'172.21.0.1:3000',
  },
  user: {},
  user_token: null,
  is_loading: true,
};


export default (prevState, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...prevState,
        settings: {
          ...prevState.settings,
          api_host: action.host
        }
      }
    case 'RETRIEVE_DATA':
      return {
        ...prevState,
        user: action.user,
        user_token: action.token,
        settings: {
          ...prevState.settings,
          api_host: action.host
        },
        is_loading: false,
      }
    case 'LOGIN':
      return {
        ...prevState,
        user: action.user,
        user_token: action.token,
        is_loading: false,
      }
    case 'LOGOUT':
      return {
        ...prevState,
        user: null,
        user_token: null,
        is_loading: false
      }
    case 'LOADING':
      return {
        ...prevState,
        is_loading: action.loading
      }
  }
}

