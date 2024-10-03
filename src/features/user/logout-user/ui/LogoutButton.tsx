"use client";

import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/shared/ui";

import { useLogoutUserMutation } from "../lib/hooks/use-logout-user-mutation";

export const LogoutButton = () => {
  const mutation = useLogoutUserMutation();

  const queryClient = useQueryClient();

  return (
    <Button
      onClick={async () => {
        await mutation.mutateAsync();
        await signOut();
        void queryClient.invalidateQueries({ queryKey: ["user"] });
      }}
    >
      Logout
    </Button>
  );
};
