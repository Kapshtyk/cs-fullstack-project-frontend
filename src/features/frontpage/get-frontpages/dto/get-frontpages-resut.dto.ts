import { GetFrontpageDto } from "@/entities/frontpage";

import { PaginatedResult } from "@/shared/model/";

export interface GetFrontpagesResultDto
  extends PaginatedResult<GetFrontpageDto> {}
