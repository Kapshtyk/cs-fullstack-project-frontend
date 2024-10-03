"use client";

import React, { useRef, useState } from "react";

import { GetUserDto } from "@/entities/user";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Form, Input, Portal } from "@/shared/ui";

import { ChangePasswordDto } from "../dto/change-password.dto";
import { useChangePasswordMutation } from "../lib/hooks/use-edit-user-for-user-mutation";
import { changePasswordSchema } from "../model/change-password-schema";

interface ChangePasswordProps {
  user: GetUserDto;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<
    ChangePasswordDto & { confirmPassword: string }
  >({
    password: "",
    confirmPassword: "",
  });
  const [errorData, setErrorData] = useState<
    Record<keyof (ChangePasswordDto & { confirmPassword: string }), string>
  >({
    password: "",
    confirmPassword: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useChangePasswordMutation({
    userId: user.id,
  });

  const validate = validator.compile(changePasswordSchema);

  const handleSubmit = (e: React.FormEvent, data: ChangePasswordDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      },
    });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Change password</Button>
      <Portal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          wide={true}
          onSubmit={(e) => handleSubmit(e, data)}
          formTitle="Change Password"
          buttonLabel="Change"
          ref={formRef}
        >
          <Input
            type="password"
            label="Password"
            name="password"
            value={data.password}
            error={errorData.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            onFocus={() => setErrorData({ ...errorData, password: "" })}
          />
          <Input
            type="password"
            label="Confirm password"
            name="confirmPassword"
            value={data.confirmPassword}
            error={errorData.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            onFocus={() => setErrorData({ ...errorData, confirmPassword: "" })}
          />
        </Form>
      </Portal>
    </>
  );
};
