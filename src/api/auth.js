import { apiPost } from "../utils/api";
import { PORT } from '../../env.json';

const API_URL =
 PORT

export const LoginAPI = (payload, setProfileCompleted) => {
  return apiPost(`${API_URL}/login`, payload)
    .then((res) => {
      if (res?.auth && res?.token) {
        if (
          res?.user?.category &&
          res.user.projects.length &&
          res.user.thumbnails.length
        ) {
          localStorage.setItem("isProfileCompleted", true);
          // setProfileCompleted(true)
        }
        localStorage.setItem("token", res?.token);
        localStorage.setItem("user", res?.user?._id);
        return res?.auth;
      }
    })
    .catch((error) => {
      console.log("error", error);
      return 0;
    });
};
