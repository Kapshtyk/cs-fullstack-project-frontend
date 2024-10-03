"use client";

import React, { useState } from "react";

import { GetUserDto } from "@/entities/user";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Dropdown, Form, Input, Portal } from "@/shared/ui";

import { useUsersQuery } from "../../get-users";
import { EditUserForAdminDto } from "../dto/edit-user-for-admin.dto";
import { useEditUserForAdminMutation } from "../lib/hooks/use-edit-user-for-admin-mutation";
import { editUserForAdminSchema } from "../model/edit-user-for-admin-schema";

interface EditUserForAdminProps {
  user: GetUserDto;
}

export const EditUserForAdmin: React.FC<EditUserForAdminProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<EditUserForAdminDto>({
    ...user,
    avatar: new File([""], ""),
  });
  const [errorData, setErrorData] = useState<
    Record<keyof Omit<EditUserForAdminDto, "password">, string>
  >({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    avatar: "",
  });

  const { refetch } = useUsersQuery({
    page: 1,
    perPage: 1000,
  });

  const mutation = useEditUserForAdminMutation({
    userId: user.id,
  });

  const validate = validator.compile(editUserForAdminSchema);

  const handleSubmit = (e: React.FormEvent, data: EditUserForAdminDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        void refetch();
        setIsModalOpen(false);
      },
    });
  };

  const rolesOptions = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
  ];

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Edit user</Button>
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
          <Dropdown
            name="role"
            label="Role"
            options={rolesOptions}
            value={data.role}
            onChange={(value) =>
              setData({ ...data, role: value as "Admin" | "User" })
            }
            error={errorData.role}
            onFocus={() => setErrorData({ ...errorData, role: "" })}
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
