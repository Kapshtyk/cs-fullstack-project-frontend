import { Frontpage } from "@/views/frontpage";

import { getCategories } from "@/features/category/get-categories";
import { getFrontpages } from "@/features/frontpage/get-frontpages";
import { getProduct } from "@/features/product/get-product";
import { getTopProducts } from "@/features/product/get-top-products";

export default async function HomePage() {
  const frontpage = await getFrontpages({
    isPublished: true,
    perPage: 1,
    page: 1,
  });

  if (!frontpage.items[0]) {
    return null;
  }

  const suggestedProduct = await getProduct({
    id: frontpage?.items[0]?.selectedProductId,
  });

  const bestSellingProducts = await getTopProducts({
    page: 1,
    perPage: 10,
    numberOfProducts: 3,
  });

  const categories = await getCategories({
    page: 1,
    perPage: 10,
    parentCategoryId: null,
  });

  if (!suggestedProduct || !categories.items) {
    return null;
  }

  return (
    <Frontpage
      frontpage={frontpage.items[0]}
      suggestedProduct={suggestedProduct}
      categories={categories.items}
      bestSellingProducts={bestSellingProducts || []}
    />
  );
}
