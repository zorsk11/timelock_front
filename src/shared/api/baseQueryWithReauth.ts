import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import type { RootState } from "@/app/store";
import { logout } from "@/features/UserRegistration/model/authSlice";

export const baseQueryWithReauth = ({
  baseUrl,
}: {
  baseUrl: string;
}): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    const isAuthenticated = (api.getState() as RootState).auth.isAuthenticated;

    if (result.error && result.error.status === 401 && isAuthenticated) {
      api.dispatch(logout());

      window.location.href = "/login";

      return { error: { status: 401, data: "Unauthorized" } };
    }

    return result;
  };
};
