"use server";

import { auth } from "./helper";

export async function getAccessTokenAction() {
  const session = await auth();

  return session?.user.accessToken;
}
