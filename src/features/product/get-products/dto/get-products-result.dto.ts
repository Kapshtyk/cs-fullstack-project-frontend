import { GetProductDto } from "@/entities/product";

import { PaginatedResult } from "@/shared/model";

export interface GetProductsResultDto extends PaginatedResult<GetProductDto> {}
