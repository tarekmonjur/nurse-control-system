export const initialLoginState = {
  settings: {
    app_name: 'Nurse Control Management System',
    company_name: 'Box Technology Solution Ltd.',
    company_title: 'Your Trusted Partner',
    hospital: {
      name: 'Bangladesh Medical Hospital LTD',
      title: 'Nurse Control Management System',
      email: '',
      hotline: '',
      logo: 'logo.png',
      address: 'Dhaka, Bangladesh',
    },
    api_host: null, //'172.21.0.1:3000',
  },
  user: {},
  user_token: null,
  is_loading: true,
  data: {loading: true, results: []}
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
    case 'SETTINGS':
      if (action.settings) {
        return {
          ...prevState,
          settings: {
            ...prevState.settings,
            hospital: action.settings,
          }
        }
      } else {
        return prevState;
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
        is_loading: false,
      }
    case 'LOADING':
      return {
        ...prevState,
        data: {
          ...prevState.data,
          loading: action.loading
        },
      }
    case 'GET_DATA':
      return {
        ...prevState,
        data: {
          loading: false,
          results: action.data
        },
      }
  }
}

