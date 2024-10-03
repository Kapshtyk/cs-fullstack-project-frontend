import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";

import { ProductPage } from "@/views/product";

import { getProduct } from "@/features/product/get-product";
import { getProducts } from "@/features/product/get-products/";

import { getAbsoluteUrl } from "@/shared/lib";
import { Section } from "@/shared/ui";

export async function generateStaticParams() {
  const products = await getProducts({
    page: 1,
    perPage: 20,
    categoryId: null,
  });
  return products.items.map((product) => ({
    id: product.id.toString(),
  }));
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (!id) {
    return {
      title: "Crazy Shop!",
      description:
        "Crazy Shop is a platform for buying the craziest fake products.",
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/products/` + id,
  );

  if (!response.ok) {
    return {
      title: "Product not found",
    };
  }

  const product = await response.json();

  const openGraph: OpenGraph = {};

  if (product.productImage[0] && product.productImage[0].url) {
    openGraph.images = [
      {
        url: getAbsoluteUrl(product.productImage[0].url),
        alt: product.title,
        width: 600,
        height: 600,
      },
    ];
  }

  if (product.title) {
    openGraph.title = product.title;
  }
  if (product.description) {
    openGraph.description = product.description;
  }

  return {
    title: product.title,
    description: product.description,
    openGraph,
  };
}

export default async function ProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  if (!Number.isInteger(+id)) {
    return <Section title="Error">Wrong product id</Section>;
  }

  try {
    const product = await getProduct({
      id: +id,
    });
    if (!product) {
      notFound();
    }

    return <ProductPage product={product} />;
  } catch (error) {
    notFound();
  }
}
