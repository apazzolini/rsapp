import Joi from 'joi';
import config from 'config';
import fetch from 'isomorphic-fetch';

// -----------------------------------------------------------------------------
// rewardStyle API fetching ----------------------------------------------------
// -----------------------------------------------------------------------------

// Realistically this would be redis or something similar
const terribleCache = {};

/**
 * Fetch favorites from the RS api
 */
const fetchFavorites = async () => {
  const oauth = config.get('rs.favoritesOauth');
  const favoritesUrl = 'https://api.rewardstyle.com/v1/favorites';
  return fetch(`${favoritesUrl}?oauth_token=${oauth}`).then(data => data.json());
};

/**
 * Update internal cache
 */
const cacheFavorites = async () => {
  const apiResponse = await fetchFavorites();

  let internalId = 0;
  for (let f of apiResponse.favorites) {
    terribleCache[internalId++] = f;
  }
};

/**
 * Returns the requested product from the cache. If there was a
 * cache miss, update the cache.
 *
 * @param id {Number} 0-100 corresponding to the internal id
 */
const getProduct = async (id) => {
  if (!terribleCache[id]) {
    await cacheFavorites();
  }
  
  return terribleCache[id];
};

// -----------------------------------------------------------------------------
// Routes ----------------------------------------------------------------------
// -----------------------------------------------------------------------------

export const routes = [
  {
    path: '/products/refresh', method: 'GET', handler: async (request, reply) => {
      await cacheFavorites();
      return 'Cache updated';
    },
    auth: 'session'
  },

  {
    path: '/products/{id}', method: 'GET', handler: async (request, reply) => {
      const product = await getProduct(request.params.id);

      return {
        id: request.params.id,
        ...product
      };
    },
    auth: 'session',
    params: {
      id: Joi.number().integer().min(0).max(99)
    }
  }

];
