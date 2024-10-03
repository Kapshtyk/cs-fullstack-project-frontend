"use client";

import { OrderListForUser } from "@/widgets/orders/order-list-for-user";

import { ChangePassword } from "@/features/user/change-password";
import { EditUserForUser } from "@/features/user/edit-user-for-user";
import { useCurrentUserQuery } from "@/features/user/get-me";

import { Section } from "@/shared/ui";

import "./Profile.scss";

export const Profile = () => {
  const { data: user } = useCurrentUserQuery();

  if (!user) {
    return null;
  }

  return (
    <Section title="Profile" isHeading>
      <p>Welcome, {user.firstName}!</p>
      <div className="user-profile__actions">
        <EditUserForUser user={user} />
        <ChangePassword user={user} />
      </div>
      <OrderListForUser user={user} />
    </Section>
  );
};
