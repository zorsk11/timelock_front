import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import type { RootState } from "@/app/store";
import { logoutUser } from "@/features/UserRegistration/model/authSlice";

export const baseQueryWithReauth = ({
  baseUrl,
}: {
  baseUrl: string;
}): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    const isAuthenticated = Boolean((api.getState() as RootState).auth.user);

    if (result.error && result.error.status === 401 && isAuthenticated) {
      api.dispatch(logoutUser());

      window.location.href = "/login";

      return { error: { status: 401, data: "Unauthorized" } };
    }

    return result;
  };
};
