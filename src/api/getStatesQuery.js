import { useMutation, useQuery, useQueryClient } from "react-query";
import qs from "query-string";
import { apiGet } from "../utils/api";

const API_URL = 'http://localhost:3000'

export const useStateQuery = () => {
    return useQuery(["states"],[`${API_URL}/states`], () =>
    apiGet(`${API_URL}/states`)
   )}
 
 export const useUpdateStateMutation = () => {
   const queryClient = useQueryClient();
   return useMutation([`${API_URL}/states`],(payload) =>
     apiGet(`${API_URL}/states${payload ? `?${qs.stringify(payload)}` : ''}`),
    {
     // onMutate: async () => {
     //   await queryClient.cancelQueries("user");
 
     //   const prevUserData = queryClient.getQueryData(["user"]);
 
     //   queryClient.setQueryData(["user"], (prevData) => ({
     //     ...prevData,
     //   }));
 
     //   return { prevUserData };
     // },
     onSuccess: (newUser) => {
        console.log(newUser, 'newUser')
       queryClient.setQueryData(["states"], newUser);
     },
     onError: (error, payload, { prevUserData }) => {
       queryClient.setQueryData(["states"], prevUserData);
     },
   });
 };
 