export interface EditUserForAdminDto {
  firstName: string;
  lastName: string;
  email: string;
  role: "Admin" | "User";
  password?: string;
  avatar?: File;
}
