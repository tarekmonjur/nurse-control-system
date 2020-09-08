export const initialLoginState = {
  settings: {
    app_name: 'Nurse Control Management System',
    hospital: {
      name: 'Bangladesh Medical Hospital LTD',
      title: 'Nurse Control Management System',
      address: 'Dhaka, Bangladesh',
    },
    api_host: 'http://172.21.0.1:3000',
    io_host: 'ws://172.21.0.1:3000',
  },
  user: {},
  user_token: null,
  is_loading: true,
};


export default (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        user: action.user,
        user_token: action.token,
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

