import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";
import { baseQueryWithReauth } from "@/shared/api/baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth({ baseUrl: "http://localhost:8080/api/user" }),
  endpoints: () => ({}),
});
