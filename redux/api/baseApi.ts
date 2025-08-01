import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dream2drive.com.au/api/v1",
    // baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers: any) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", ` ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Users",
    "Auth",
    "Instructor",
    "Student",
    "Assignment",
    "Submission",
  ],
});
