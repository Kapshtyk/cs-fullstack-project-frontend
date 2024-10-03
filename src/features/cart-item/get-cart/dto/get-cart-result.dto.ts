import { GetCartItemDto } from "@/entities/cart-item";

import { PaginatedResult } from "@/shared/model";

export interface GetCartResultDto extends PaginatedResult<GetCartItemDto> {}
