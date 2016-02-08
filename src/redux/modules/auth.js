import fromError from '../utils/fromError';

// Initial State ---------------------------------------------------------------

export const initialState = {
  isLoggedIn: false
};

// Reducers --------------------------------------------------------------------

export const reducers = {

  'auth/login': (state, action) => state.merge({
    loggingIn: true,
    loginError: false
  }),

  'auth/loginOk': (state, action) => state.merge({
    loggingIn: false,
    isLoggedIn: true
  }),

  'auth/loginFail': (state, action) => state.merge({
    loggingIn: false,
    isLoggedIn: false,
    loginError: fromError(action.error)
  })

};

// Action Creators -------------------------------------------------------------

export const actions = {

  login: (auth) => ({
    type: 'auth/login',
    apiRequest: (api) => api.post('/login', { auth })
  })

};

// Selectors -------------------------------------------------------------------

export const selectors = {

  isLoggedIn: (globalState) => globalState.auth.get('isLoggedIn')

};
