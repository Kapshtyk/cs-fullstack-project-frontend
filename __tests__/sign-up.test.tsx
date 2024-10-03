import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { expect, test } from "vitest";
import { vi } from "vitest";

import RegisterPage from "@/views/sign-up/ui/RegisterPage";

import {
  RegisterUserDto,
  useRegiserUserMutation,
} from "@/features/user/register-user";
import { RegisterUserResultDto } from "@/features/user/register-user/dto/register-user-result.dto";

import { apiClient } from "@/shared/api";

vi.mock("../src/shared/api/api", () => ({
  apiClient: {
    postForm: vi.fn(),
  },
}));

test("SignUpPage", async () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  const wrapper = createWrapper();

  const dto: RegisterUserDto = {
    email: "string@string.com",
    password: "string",
    firstName: "string",
    lastName: "string",
    avatar: new File([], ""),
  };

  const user: RegisterUserResultDto = {
    id: 1,
    email: "string",
    firstName: "string",
    lastName: "string",
    avatar: "string",
    role: "User",
  };

  (apiClient.postForm as typeof vi.fn).mockResolvedValue({
    data: user,
  });

  const { result } = renderHook(() => useRegiserUserMutation(), { wrapper });

  result.current.mutate(dto);

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(user);

  render(<RegisterPage />, { wrapper });

  fireEvent.change(screen.getByTestId("email"), {
    target: { value: dto.email },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: dto.password },
  });
  fireEvent.change(screen.getByTestId("confirmPassword"), {
    target: { value: dto.password },
  });
  fireEvent.change(screen.getByTestId("firstName"), {
    target: { value: dto.firstName },
  });
  fireEvent.change(screen.getByTestId("lastName"), {
    target: { value: dto.lastName },
  });
  fireEvent.change(screen.getByTestId("avatar"), {
    target: { files: [dto.avatar] },
  });
  fireEvent.submit(screen.getByTestId("form"));
});
