import { useMutation, useQuery, useQueryClient } from "react-query";
import qs from "query-string";
import { apiDelete, apiGet, apiPost } from "../utils/api";
import { PORT } from '../../env.json';

const API_URL =
 PORT

export const useJobsQuery = () => {
  return useQuery(["jobs"], [`${API_URL}/jobs`], () =>
    apiGet(`${API_URL}/jobs`)
  );
};

export const useUpdateJobsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [`${API_URL}/jobs`],
    (payload) =>
      apiGet(`${API_URL}/jobs${payload ? `?${qs.stringify(payload)}` : ""}`),
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
        console.log(newUser, "newUser");
        queryClient.setQueryData(["jobs"], newUser);
      },
      onError: (error, payload, { prevUserData }) => {
        queryClient.setQueryData(["jobs"], prevUserData);
      },
    }
  );
};

export const useCreateJobMutation = () => {
  // const queryClient = useQueryClient();
  const url = `${API_URL}/jobs`
  const { mutate: fetchJobList } = useUpdateJobsMutation();
  return useMutation([`${API_URL}/jobs`],(payload) =>
    apiPost(url, payload),
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
        //  console.log(newUser, 'newUser')
        fetchJobList();
        // queryClient.setQueryData(["jobs"], newUser);
      },
      // onError: (error, payload, { prevUserData }) => {
      //   queryClient.setQueryData(["jobs"], prevUserData);
      // },
    }
  );
};

export const useUpdateJobMutation = () => {
  // const queryClient = useQueryClient();
  const { mutate: fetchJobList } = useUpdateJobsMutation();
  return useMutation(
    [`${API_URL}/jobs`],
    (payload) => apiPost(`${API_URL}/jobs/${payload._id}`, payload),
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
        //  console.log(newUser, 'newUser')
        fetchJobList();
        // queryClient.setQueryData(["jobs"], newUser);
      },
      // onError: (error, payload, { prevUserData }) => {
      //   queryClient.setQueryData(["jobs"], prevUserData);
      // },
    }
  );
};

export const useDeleteJobMutation = () => {
  // const queryClient = useQueryClient();
  const { mutate: fetchJobList } = useUpdateJobsMutation();
  return useMutation(
    [`${API_URL}/jobs`],
    (id) => apiDelete(`${API_URL}/jobs/${id}`),
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
        //  console.log(newUser, 'newUser')
        // queryClient.setQueryData(["jobs"], newUser);
        fetchJobList();
      },
      // onError: (error, payload, { prevUserData }) => {
      //   queryClient.setQueryData(["jobs"], prevUserData);
      // },
    }
  );
};
