import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from 'views/_app/App';
import NotFound from 'views/_errors/NotFound';

import Login from 'views/login/Login';
import Product from 'views/product/Product';

function requireAuth(store, nextState, replace) {
  const isAdmin = store.getState().admin.get('isAdmin');
  if (!isAdmin) {
    replace({
      pathname: '/login'
    });
  }
}

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/login" />

      <Route path="login" component={Login} />

      <Route path="products/:id" component={Product} 
        onEnter={requireAuth.bind(null, store)} 
      />

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
