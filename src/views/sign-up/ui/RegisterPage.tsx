"use client";

import Link from "next/link";
import React, { useState } from "react";

import {
  RegisterUserDto,
  useRegiserUserMutation,
} from "@/features/user/register-user";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Form, Input, Section } from "@/shared/ui";

import { registerSchema } from "../model/sign-up-schema";

const RegisterPage: React.FC = () => {
  const [data, setData] = useState<
    RegisterUserDto & { confirmPassword: string }
  >({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    avatar: new File([], ""),
  });
  const [errorData, setErrorData] = useState<
    Record<keyof (RegisterUserDto & { confirmPassword: string }), string>
  >({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    avatar: "",
    confirmPassword: "",
  });
  const mutation = useRegiserUserMutation();

  const validate = validator.compile(registerSchema);

  const handleSubmit = (e: React.FormEvent, data: RegisterUserDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    if (!data.avatar.name) {
      setErrorData({ ...errorData, avatar: "Avatar is required" });
      return;
    }

    mutation.mutate(data);
  };

  return (
    <Section title="Sign Up" hideTitle isHeading>
      <Form
        onSubmit={(e) => handleSubmit(e, data)}
        formTitle="Sign Up"
        buttonLabel="Sign Up"
        data-testid="form"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          data-testid="email"
          value={data.email}
          error={errorData.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          onFocus={() => setErrorData({ ...errorData, email: "" })}
        />
        <Input
          label="First Name"
          type="text"
          name="firstName"
          data-testid="firstName"
          value={data.firstName}
          error={errorData.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          onFocus={() => setErrorData({ ...errorData, firstName: "" })}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          data-testid="lastName"
          value={data.lastName}
          error={errorData.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          onFocus={() => setErrorData({ ...errorData, lastName: "" })}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          data-testid="password"
          value={data.password}
          error={errorData.password || errorData.confirmPassword}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onFocus={() =>
            setErrorData({ ...errorData, password: "", confirmPassword: "" })
          }
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          data-testid="confirmPassword"
          value={data.confirmPassword}
          error={errorData.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          onFocus={() =>
            setErrorData({ ...errorData, password: "", confirmPassword: "" })
          }
        />
        <Input
          type="file"
          label="Avatar"
          error={errorData.avatar}
          name="avatar"
          data-testid="avatar"
          onChange={(e) => {
            if (e.target.files) {
              setData({
                ...data,
                avatar: e.target.files[0] || new File([], ""),
              });
            }
          }}
          onFocus={() => setErrorData({ ...errorData, avatar: "" })}
        />
        <p>
          Have an account? <Link href="/sign-in">Sign In</Link>
        </p>
      </Form>
    </Section>
  );
};

export default RegisterPage;
