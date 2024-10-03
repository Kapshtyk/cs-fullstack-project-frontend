import { GetCategoryDto } from "@/entities/category";

import { PaginatedResult } from "@/shared/model";

export interface GetCategoriesResultDto
  extends PaginatedResult<GetCategoryDto> {}
