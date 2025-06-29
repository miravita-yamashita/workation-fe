export const COOKIE_PUBLIC_TOKEN = "wkn.public-token";

export type PublicTokenResponseType = {
  success: boolean;
  message: string;
  data: {
    token_type: string;
    access_token: string;
    user: {
      id: string;
      loginId: string;
    };
  };
};
