import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { createFrontpage } from "../../api/create-frontpage";
import { CreateFrontpageDto } from "../../dto/create-frontpage.dto";
import { CreateFrontpageResultDto } from "../../dto/create-frontpage-result.dto";

export const useCreateFrontpageMutation = () =>
  useMutation<CreateFrontpageResultDto | null, Error, CreateFrontpageDto>({
    mutationFn: async (body: CreateFrontpageDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return createFrontpage(body, accessToken);
    },
  });
