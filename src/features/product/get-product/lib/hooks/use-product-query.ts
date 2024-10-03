import { useQuery } from "@tanstack/react-query";

import { GetProductDto } from "@/entities/product";

import { getProduct } from "../../api/get-product";
import { GetProductDto as GetProductDtoParams } from "../../dto/get-product.dto";
import { GetProductResultDto } from "../../dto/get-product-result.dto";

export const useProductQuery = (
  params: GetProductDtoParams,
  initialData?: GetProductDto,
) => {
  return useQuery<
    GetProductResultDto,
    Error,
    GetProductResultDto,
    [string, GetProductDtoParams]
  >({
    queryKey: ["product", { ...params }],
    queryFn: async ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      const result = await getProduct({ ...params });
      if (!result) {
        throw new Error("Product not found");
      }
      return result;
    },
    enabled: !!params.id,
    initialData: initialData,
  });
};
