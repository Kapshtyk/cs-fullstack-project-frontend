import { MetadataRoute } from "next";

import { getProducts } from "@/src/features/product/get-products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts({
    page: 1,
    perPage: 50,
    categoryId: null,
  });

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: "/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  products.items.forEach((product) =>
    sitemap.push({
      url: `/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return sitemap;
}
