import { JSONSchemaType } from "ajv";

import { EditUserForAdminDto } from "../dto/edit-user-for-admin.dto";

export const editUserForAdminSchema: JSONSchemaType<
  Omit<EditUserForAdminDto, "avatar" | "password">
> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    firstName: { type: "string", minLength: 2, maxLength: 100 },
    lastName: { type: "string", minLength: 2, maxLength: 100 },
    role: { type: "string", enum: ["Admin", "User"] },
  },
  required: ["email", "firstName", "lastName", "role"],
  additionalProperties: true,
};
