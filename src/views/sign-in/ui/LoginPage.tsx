"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useCurrentUserQuery } from "@/features/user/get-me";
import { LoginUserDto } from "@/features/user/login-user/";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Form, Input, Section } from "@/shared/ui";

import { loginSchema } from "../model/sign-in-schema";

export const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<LoginUserDto>({ email: "", password: "" });
  const [errorData, setErrorData] = useState<LoginUserDto>({
    email: "",
    password: "",
  });

  const { refetch } = useCurrentUserQuery();

  const queryClient = useQueryClient();

  const validate = validator.compile(loginSchema);

  const handleSubmit = async (e: React.FormEvent, data: LoginUserDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    void queryClient.invalidateQueries({ queryKey: ["user"] });

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (!result?.ok) {
      setErrorData({
        ...errorData,
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
    } else {
      await refetch();
      router.push(searchParams.get("next") || "/products");
    }
  };

  return (
    <Section title="Sign In" hideTitle isHeading>
      <Form
        onSubmit={(e) => handleSubmit(e, data)}
        formTitle="Sign In"
        buttonLabel="Sign In"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          value={data.email}
          error={errorData.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          onFocus={() => setErrorData({ ...errorData, email: "" })}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={data.password}
          error={errorData.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onFocus={() => setErrorData({ ...errorData, password: "" })}
        />
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="link">
            Sign Up
          </Link>
        </p>
      </Form>
    </Section>
  );
};
