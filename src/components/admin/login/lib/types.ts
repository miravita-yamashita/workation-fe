export const LOGIN_KEEP_ME_LOGGED_IN = "wkn.keep_me_logged_in";

export type AdminLoginResponseType = {
  success: boolean;
  message: string;
  data: {
    token_type: string;
    access_token: string;
    user: {
      id: string;
      login_id: string;
      email: string;
      family_name: string;
      name: string;
      role: string;
      note: string;
      isAdmin: boolean;
      avatar: {
        id: string;
        url: string;
      };
    };
  };
};
