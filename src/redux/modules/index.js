export default {
  auth: require('./auth'),
  products: require('./products')
};

export const updateInitialServerState = (request, initialState) => {
  if (request.auth.isAuthenticated) {
    initialState.auth = {
      isLoggedIn: true
    };
  }
};
