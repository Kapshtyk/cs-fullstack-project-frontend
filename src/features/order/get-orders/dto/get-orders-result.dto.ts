import { GetOrderDto } from "@/entities/order";

import { PaginatedResult } from "@/shared/model";

export interface GetOrdersResultDto extends PaginatedResult<GetOrderDto> {}
