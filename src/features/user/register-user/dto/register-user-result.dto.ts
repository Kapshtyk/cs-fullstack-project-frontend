export interface RegisterUserResultDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: "Admin" | "User";
}
