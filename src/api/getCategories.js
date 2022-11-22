import { apiDelete, apiGet, apiPost } from '../utils/api';

const API_URL = 'http://localhost:3000'

export const getCategoryApi = () => {

  const url = `${API_URL}/categories`
  return apiGet(url)
  .then((res) => {
      return res; 
    }
  )
  .catch((error) => {
    return error;
  });
};

export const createCategoryApi = (payload) => {

  const url = `${API_URL}/categories`
  return apiPost(url, payload)
  .then((res) => {
      return res; 
    }
  )
  .catch((error) => {
    return error;
  });
};

export const updateCategoryApi = (id, payload) => {

  const url = `${API_URL}/categories/${id}`
  return apiPost(url, payload)
  .then((res) => {
      return res; 
    }
  )
  .catch((error) => {
    return error;
  });
};

export const deleteCategoryApi = (id) => {

  const url = `${API_URL}/categories/${id}`
  return apiDelete(url)
  .then((res) => {
      return res; 
    }
  )
  .catch((error) => {
    return error;
  });
};

export const updateSubCategoryApi = (id, payload) => {

  const url = `${API_URL}/categories/${id}/subCategory`
  return apiPost(url, payload)
  .then((res) => {
      return res; 
    }
  )
  .catch((error) => {
    return error;
  });
};

export const updateTagsApi = (id, payload) => {

  const url = `${API_URL}/categories/${id}/tags`
  return apiPost(url, payload)
  .then((res) => {
      return res; 
    }
  )
  .catch((error) => {
    return error;
  });
};