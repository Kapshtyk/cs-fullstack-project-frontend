"use client";

import { useCurrentUserQuery } from "@/features/user/get-me";

import { Section } from "@/shared/ui";

export const Dashboard = () => {
  const { data } = useCurrentUserQuery();

  if (!data) {
    return null;
  }
  return (
    <Section title="Dashboard" isHeading>
      Welcome, {data.firstName} {data.lastName}!
    </Section>
  );
};
