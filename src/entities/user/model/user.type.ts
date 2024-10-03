export interface User {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
  role: "Admin" | "User";
}
