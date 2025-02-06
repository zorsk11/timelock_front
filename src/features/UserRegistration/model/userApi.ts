import { userApi } from "@/shared/api/userApi";
import {
  LoginRequest,
  RegisterRequest,
  CompleteProfileRequest,
  AuthResponse,
  UserProfileResponse,
} from "@/entities/User/types";

export const extendedUserApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    completeProfile: builder.mutation<
      UserProfileResponse,
      CompleteProfileRequest
    >({
      query: (data) => ({
        url: "/complete-profile",
        method: "POST",
        body: data,
      }),
    }),
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
  useRegisterMutation,
  useCompleteProfileMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = extendedUserApi;
