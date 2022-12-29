import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiDelete, apiGet, apiPost } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const getCategoryApi = () => {
  const url = `${API_URL}/categories`;
  return apiGet(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const createCategoryApi = (payload) => {
  const url = `${API_URL}/categories`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateCategoryApi = (id, payload) => {
  const url = `${API_URL}/categories/${id}`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteCategoryApi = (id) => {
  const url = `${API_URL}/categories/${id}`;
  return apiDelete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateSubCategoryApi = (id, payload) => {
  const url = `${API_URL}/categories/${id}/subCategory`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateTagsApi = (id, payload) => {
  const url = `${API_URL}/categories/${id}/tags`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBestInApi = (id, payload) => {
  const url = `${API_URL}/categories/${id}/best-in`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateExtraTalentApi = (id, payload) => {
  const url = `${API_URL}/categories/${id}/extra-talent`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateFiltersApi = (id, payload) => {
  const url = `${API_URL}/categories/${id}/filters`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};


export const useGetCategoryApiQuery = () => {
  return useQuery(["categories"], [`${API_URL}/categories`], () =>
    apiGet(`${API_URL}/categories`)
  );
};

export const useFetchCategoryApiQuery = () => {
  const queryClient = useQueryClient();
  return useMutation([`${API_URL}/categories`],() =>
    apiGet(`${API_URL}/categories`),
   {
      onSuccess: (newUser) => {
        //  console.log(newUser, 'newUser')
        queryClient.setQueryData(["categories"], newUser);
      },
      onError: (error, payload, { prevUserData }) => {
        queryClient.setQueryData(["categories"], prevUserData);
      },
    }
  );
};
