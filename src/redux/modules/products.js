import fromError from '../utils/fromError';

// Initial State ---------------------------------------------------------------

export const initialState = {
  entities: {}
};

// Reducers --------------------------------------------------------------------

export const reducers = {

  'products/load': (state, action) => state.mergeDeep({
    entities: {
      [action.id]: {
        loading: true
      }
    }
  }),

  'products/loadOk': (state, action) => state.mergeDeep({
    entities: {
      [action.result.id]: {
        loading: false,
        loaded: true,
        ...action.result
      }
    }
  }),

  'products/loadFail': (state, action) => state.mergeDeep({
    entities: {
      [action.id]: {
        loading: false,
        loaded: false,
        loadError: fromError(action.error)
      }
    }
  })

};

// Action Creators -------------------------------------------------------------

export const actions = {

  load: (id) => ({
    type: 'products/load',
    apiRequest: (api) => api.get(`/products/${id}`)
  })

};


// Selectors -------------------------------------------------------------------

export const selectors = {

  isLoaded: (globalState, id) => 
    globalState.products.getIn(['entities', id, 'loaded'], false)

};
