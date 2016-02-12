import Joi from 'joi';
import config from 'config';
import fetch from 'isomorphic-fetch';
import Boom from 'boom';

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
      //const product = await getProduct(request.params.id);
      const product = {'product_id':'42750048','product_type':'2','product_url':'http://rstyle.me/cz-n/bi2wdamx7e','product_name':'C-Champagne clutch','product_image':'http://images.rewardstyle.com/img?v=1.3&p=42750048','designer':'Charlotte Olympia','advertiser':'Farfetch UK LTD.','currency':'USD','price':'337.50','commission':'23.62','date_added':'2016-02-11 05:54:47','folders':['LETS PARTY','BAGS','SALE'] };

      if (request.params.id > 3) {
        reply(Boom.notFound());
      }

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
