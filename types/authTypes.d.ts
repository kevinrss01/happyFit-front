export type AccessToken = string;
export type RefreshToken = string;

export interface Tokens {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
  userId: string;
}

export interface VerifyTokenResponse {
  isValid: boolean;
  message: "Valid Token" | "Invalid Token" | "Expired Token";
}

export interface LoginFormValue {
  email: string;
  password: string;
}
