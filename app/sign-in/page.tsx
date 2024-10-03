import React, { Suspense } from "react";

import { LoginPage } from "@/views/sign-in/";

export default function SignIn() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
