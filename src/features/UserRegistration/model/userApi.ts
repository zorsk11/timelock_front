import { userApi } from "@/shared/api/userApi";
import {
  LoginRequest,
  AuthResponse,
  UserProfileResponse,
} from "@/entities/User/types";

export const extendedUserApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = extendedUserApi;
