import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import Script from "next/script";

import { ProductPage } from "@/views/product";

import { getProduct } from "@/features/product/get-product";
import { getProducts } from "@/features/product/get-products/";

import { getAbsoluteUrl } from "@/shared/lib";
import { Section } from "@/shared/ui";

import { getReviews } from "@/src/features/review/get-reviews";

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

    const reviews = await getReviews({
      productId: product.id,
      page: 1,
      perPage: 1000,
      userId: null,
    });

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.description,
      image: {
        "@type": "ImageObject",
        contentUrl: product.productImage[0]
          ? getAbsoluteUrl(product.productImage[0].url)
          : "",
        caption: product.title,
        representativeOfPage: "True",
      },
      aggragateRating: {
        "@type": "AggregateRating",
        ratingValue:
          reviews?.items.reduce((acc, review) => acc + review.rating, 0) /
          reviews.items.length,
        reviewCount: reviews?.items.length,
      },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      review: reviews?.items.map((review) => ({
        "@type": "Review",
        author: review.user.name,
        reviewBody: review.description,
        name: review.title,
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: review.rating,
          worstRating: "1",
        },
      })),
    };

    return (
      <>
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductPage product={product} />;
      </>
    );
  } catch (error) {
    notFound();
  }
}
