import { getAccessTokenAction } from "../[...nextauth]/get-access-token.action";

export const getAccessToken = async () => {
  await fetch("/api/auth/refresh-token", {
    method: "POST",
  });
  const accessToken = await getAccessTokenAction();
  if (!accessToken) {
    return null;
  }
  return accessToken;
};
