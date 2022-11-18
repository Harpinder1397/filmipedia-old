import { apiPost, apiGet, apiDelete } from "../utils/api";
import { qs } from "query-string";

const API_URL = 'http://node-env.eba-xnwspbk7.ap-northeast-1.elasticbeanstalk.com'

export const getMyFavouritesApi = (userId) => {
  return apiGet(`${API_URL}/favourites/${userId}`)
    .then((res) => {
      return res; 
    })
    .catch((error) => {
      return error;
    });
};

export const addToFavouritesApi = (payload) => {
  return apiPost(`${API_URL}/favourites`, payload)
    .then((res) => {
      return res; 
    })
    .catch((error) => {
      return error;
    });
};

export const removeFromFavouritesApi = (userId, favUserId) => {
  return apiDelete(`${API_URL}/favourites/${userId}/${favUserId}`)
    .then((res) => {
      return res; 
    })
    .catch((error) => {
      return error;
    });
};