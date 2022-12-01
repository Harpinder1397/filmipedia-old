import { apiDelete, apiPost } from "../utils/api";
import { PORT } from '../../env.json';

const API_URL =
 PORT

export const uploadApi = (userId, file) => {
  const url = `${API_URL}/upload/${userId}`;
  return apiPost(url, file)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteImgApi = (imgUrl) => {
  const url = `${API_URL}/upload/delete?url=${imgUrl.url}`;
  return apiDelete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
