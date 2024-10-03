"use client";

import React, { useRef, useState } from "react";

import { GetUserDto } from "@/entities/user";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Form, Input, Portal } from "@/shared/ui";

import { useCurrentUserQuery } from "../../get-me";
import { EditUserForUserDto } from "../dto/edit-user-for-user.dto";
import { useEditUserForUserMutation } from "../lib/hooks/use-edit-user-for-user-mutation";
import { editUserForUserSchema } from "../model/edit-user-for-user-schema";

interface EditUserForUserProps {
  user: GetUserDto;
}

export const EditUserForUser: React.FC<EditUserForUserProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<EditUserForUserDto>({
    ...user,
    avatar: new File([""], ""),
  });
  const [errorData, setErrorData] = useState<
    Record<keyof Omit<EditUserForUserDto, "password">, string>
  >({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  const { refetch } = useCurrentUserQuery();

  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useEditUserForUserMutation({
    userId: user.id,
  });

  const validate = validator.compile(editUserForUserSchema);

  const handleSubmit = (e: React.FormEvent, data: EditUserForUserDto) => {
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
        void refetch();
      },
    });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Edit your profile</Button>
      <Portal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          wide={true}
          onSubmit={(e) => handleSubmit(e, data)}
          formTitle="Edit User"
          buttonLabel="Edit"
          ref={formRef}
        >
          <Input
            label="First Name"
            value={data.firstName}
            error={errorData.firstName}
            name={"firstName"}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            onFocus={() => setErrorData({ ...errorData, firstName: "" })}
          />
          <Input
            label="Last Name"
            value={data.lastName}
            error={errorData.lastName}
            name={"lastName"}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            onFocus={() => setErrorData({ ...errorData, lastName: "" })}
          />
          <Input
            label="Email"
            value={data.email}
            error={errorData.email}
            name={"email"}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            onFocus={() => setErrorData({ ...errorData, email: "" })}
          />
          <Input
            type="file"
            label="Avatar"
            error={errorData.avatar}
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
        </Form>
      </Portal>
    </>
  );
};
