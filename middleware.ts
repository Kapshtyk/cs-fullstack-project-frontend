import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from "next/server";
import { encode, getToken, type JWT } from "next-auth/jwt";

import {
  AUTH_SECRET,
  SESSION_COOKIE,
  SESSION_SECURE,
  SESSION_TIMEOUT,
  SIGNIN_SUB_URL,
  TOKEN_REFRESH_BUFFER,
} from "@/shared/config";

import { refreshToken } from "./src/features/user/refresh-token";

export function shouldUpdateToken(token: JWT): boolean {
  if (token.accessTokenExpires - TOKEN_REFRESH_BUFFER < new Date().getTime()) {
    return true;
  }
  return false;
}

const isAdmin = (token: JWT | null) => {
  if (!token) {
    return false;
  }
  return token.role === "Admin";
};

const isAuthenticated = (token: JWT | null) => {
  if (!token) {
    return false;
  }
  return token.role === "User" || token.role === "Admin";
};

export function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
): NextResponse<unknown> {
  if (sessionToken && sessionToken !== null) {
    request?.cookies?.set(SESSION_COOKIE, sessionToken);
    response = NextResponse.next({
      request: {
        headers: request?.headers,
      },
    });
    response?.cookies?.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
      sameSite: "lax",
    });
  } else {
    request?.cookies?.delete(SESSION_COOKIE);
    response = NextResponse.redirect(new URL(SIGNIN_SUB_URL, request?.url));

    return response;
  }

  return response;
}

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const token = await getToken({ req: request });

  let response = NextResponse.next();

  if (!token) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    } else {
      return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
    }
  }

  if (shouldUpdateToken(token)) {
    try {
      const newTokens = await refreshToken({
        refreshToken: token.refreshToken,
      });

      const newSessionToken = await encode({
        secret: AUTH_SECRET,
        token: {
          ...token,
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
          accessTokenExpires: Date.now() + 60 * 1000 * 5,
        },
        maxAge: SESSION_TIMEOUT,
      });

      response = updateCookie(newSessionToken, request, response);
    } catch (error) {
      response = updateCookie(null, request, response);
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAdmin(token)) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  } else if (
    request.nextUrl.pathname.startsWith("/cart") ||
    request.nextUrl.pathname.startsWith("/profile")
  ) {
    if (!isAuthenticated(token)) {
      return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
    }
  }

  return response;
};

export const config = {
  matcher: [
    "/api/auth/refresh-token",
    "/dashboard",
    "/dashboard/(.*)",
    "/cart",
    "/cart/(.*)",
    "/profile",
    "/profile/(.*)",
  ],
};
