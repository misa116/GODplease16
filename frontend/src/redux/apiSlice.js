import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // 🔥🔥🔥 this is required for cookies to be sent
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [], // if you're using tags for caching
  endpoints: (builder) => ({}),
});

export default apiSlice;
