"use server";

import { cookies } from "next/headers";
import { LOGIN_KEEP_ME_LOGGED_IN } from "@/components/admin/login/lib/types";
import { signIn, LoginAPIError, signOut } from "@/app/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const handleLogin = async (values: {
  username: string;
  password: string;
  keepMeLoggedIn: boolean;
  isAdmin: boolean;
}) => {
  try {
    const response = await signIn("credentials", {
      ...values,
      redirectTo: "/",
      redirect: false,
    });

    return {
      success: true,
      response,
    };
  } catch (error) {
    //see https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
    if (isRedirectError(error)) {
      throw error;
    }
    // Handle Login related error throw
    if (error instanceof LoginAPIError) {
      return {
        success: false,
        message: error.name,
      };
    }
    // Default error message
    return {
      success: false,
      message: "Something went wrong while checking your credentials.",
    };
  }
};

export const handleLogout = async () => {
  await signOut({ redirectTo: "/", redirect: true });
};

export const updateKeepLoggedInCookieFlag = async (flag: boolean = false) => {
  const cookieStore = await cookies();

  cookieStore.set(LOGIN_KEEP_ME_LOGGED_IN, flag.toString());
};

export const updateCookieKeepLoggedIn = async () => {
  const cookieStore = await cookies();

  const currentValue = cookieStore.get("authjs.session-token")?.value || "";
  const isKeepMeLoggedInValue =
    cookieStore.get(LOGIN_KEEP_ME_LOGGED_IN)?.value || "";

  if (isKeepMeLoggedInValue !== "true") {
    cookieStore.set("authjs.session-token", currentValue, {
      maxAge: undefined,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return true;
};
