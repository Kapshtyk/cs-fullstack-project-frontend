import Image from "next/image";
import React, { ReactNode } from "react";

import { currencyFormatter, getAbsoluteUrl } from "@/shared/lib";

import "./ProductPage.scss";

import { GetProductDto } from "../../dto/get-product.dto";

interface ProductPageProps {
  product: GetProductDto;
  actionsComponent: ReactNode;
  ratingComponent: ReactNode;
}

export const ProductPage = ({
  product,
  actionsComponent,
  ratingComponent,
}: ProductPageProps) => {
  return (
    <article className="product-page">
      <div className="product-page__content">
        <div className="product-page__image-wrapper">
          {product.productImage[0]?.url && (
            <Image
              src={getAbsoluteUrl(product.productImage[0].url)}
              alt={product.title}
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 30vw"
              fill={true}
              priority={true}
            />
          )}
        </div>
        <div className="product-page__wrapper">
          <div className="product-page__header">
            <h3 className="h4">{product.title}</h3>
          </div>
          <p className="product-page__description">{product.description}</p>
          <div className="product-page__actions">
            <p>{currencyFormatter.format(product.price)}</p>
            {actionsComponent}
          </div>
        </div>
      </div>
      <div className="product-page__rating">{ratingComponent}</div>
    </article>
  );
};
