"use client";

import { CategoriesCarousel } from "@/widgets/categories/categories-carousel";
import { HeroBanner } from "@/widgets/hero-banner";
import { ProductCard } from "@/widgets/products/product-card";
import { SuggestedProduct } from "@/widgets/products/suggested-product";

import { GetCategoryDto } from "@/entities/category";
import { Frontpage as FrontpageType } from "@/entities/frontpage";
import { GetProductDto } from "@/entities/product";

import { Section } from "@/shared/ui";

import "./Frontpage.scss";
interface FrontpageProps {
  frontpage: FrontpageType;
  suggestedProduct: GetProductDto;
  categories: GetCategoryDto[];
  bestSellingProducts: GetProductDto[];
}

export const Frontpage: React.FC<FrontpageProps> = ({
  frontpage,
  suggestedProduct,
  categories,
  bestSellingProducts,
}) => {
  return (
    <>
      <h1 className="visually-hidden">Frontpage</h1>
      <Section title="Hero banner" hideTitle={true} isFullWidth={true}>
        <HeroBanner
          frontpage={frontpage}
          callToAction={<SuggestedProduct product={suggestedProduct} />}
        />
      </Section>
      <Section title="Our products" isFullWidth={true}>
        <CategoriesCarousel categories={categories} />
      </Section>
      {bestSellingProducts.length > 0 && (
        <Section title="Best selling products" isFullWidth={true}>
          <ul className="best-selling-product-list">
            {bestSellingProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
};
