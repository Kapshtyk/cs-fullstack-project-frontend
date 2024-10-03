import { GetReviewDto } from "@/entities/review";

import { PaginatedResult } from "@/shared/model";

export interface GetReviewsResultDto extends PaginatedResult<GetReviewDto> {}
