import { useMutation } from "@tanstack/react-query";

import { registerUser } from "../../api/register-user";
import { RegisterUserDto } from "../../dto/register-user.dto";
import { RegisterUserResultDto } from "../../dto/register-user-result.dto";

export const useRegiserUserMutation = () =>
  useMutation<RegisterUserResultDto, Error, RegisterUserDto>({
    mutationFn: (body: RegisterUserDto) => registerUser(body),
  });
