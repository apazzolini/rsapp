export default {
  admin: require('./admin'),
  products: require('./products')
};

export const updateInitialServerState = (request, initialState) => {
  if (request.auth.isAuthenticated) {
    initialState.admin = {
      isAdmin: true
    };
  }
};
