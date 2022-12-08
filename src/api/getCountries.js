import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiGet } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const useGetCountriesQuery = () => {
  return useQuery(["countries"], [`${API_URL}/countries`], () =>
    apiGet(`${API_URL}/countries`)
   )}
 
export const useGetCountriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation([`${API_URL}/countries`],() =>
    apiGet(`${API_URL}/countries`),
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
      queryClient.setQueryData(["countries"], newUser);
    },
    onError: (error, payload, { prevUserData }) => {
      queryClient.setQueryData(["countries"], prevUserData);
    },
  });
};
