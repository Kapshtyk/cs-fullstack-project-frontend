import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { updateFrontpage } from "../../api/update-frontpage";
import { UpdateFrontpageDto } from "../../dto/update-frontpage.dto";
import { UpdateFrontpageResultDto } from "../../dto/update-frontpage-result.dto";

export const useUpdateFrontpageMutation = (id: number) =>
  useMutation<UpdateFrontpageResultDto | null, Error, UpdateFrontpageDto>({
    mutationFn: async (body: UpdateFrontpageDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return updateFrontpage(body, id, accessToken);
    },
  });
