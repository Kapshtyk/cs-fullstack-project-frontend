export const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5169/";
export const API_PREFIX = "api/v1/";
export const SESSION_TIMEOUT = 60 * 60 * 24 * 3;
export const TOKEN_REFRESH_BUFFER = 60 * 1000;
export const SIGNIN_SUB_URL = "/sign-in";
export const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith("https://");
export const SESSION_COOKIE = SESSION_SECURE
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";
export const AUTH_SECRET = process.env.NEXTAUTH_SECRET || "secret";
