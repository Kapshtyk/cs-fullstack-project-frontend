import { GetUserDto } from "@/entities/user";

import { PaginatedResult } from "@/shared/model/";

export interface GetUsersResultDto extends PaginatedResult<GetUserDto> {}
