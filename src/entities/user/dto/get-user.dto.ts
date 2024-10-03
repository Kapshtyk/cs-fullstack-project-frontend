import { User } from "../model/user.type";

export interface GetUserDto extends Omit<User, "password"> {}
