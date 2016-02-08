import Joi from 'joi';
import config from 'config';

export const routes = [
  {
    path: '/login', method: 'POST', handler: async (request, reply) => {
      if (request.payload.auth === config.get('app.authPhrase')) {
        request.auth.session.set({ pass: request.payload.auth });
        reply({ status: 'OK' });
      } else {
        request.auth.session.clear();
        reply({ error: 'Unknown Auth' });
      }
    },
    payload: {
      auth: Joi.string()
    }
  }
];
