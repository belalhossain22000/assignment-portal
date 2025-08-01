// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `https://assignment-portal-server-nine.vercel.app/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      // cache: "no-store",
    }
  );
  const userInfo = await res.json();

  if (userInfo?.data?.token) {
    setAccessToken(userInfo?.data?.token, {
      redirect: "/",
    });
  }

  return userInfo;
};
