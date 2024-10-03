import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

import { currencyFormatter, getAbsoluteUrl } from "@/shared/lib";

import "./ProductCard.scss";

import { GetProductDto } from "../../dto/get-product.dto";

interface ProductCardProps {
  product: GetProductDto;
  actionsComponent: ReactNode;
  ratingComponent: ReactNode;
}

export const ProductCard = ({
  product,
  actionsComponent,
  ratingComponent,
}: ProductCardProps) => {
  return (
    <article className="product-card">
      <Link href={`/products/${product.id}`} className="product-card__wrapper">
        <div className="product-card__image-wrapper">
          {product.productImage[0]?.url && (
            <Image
              src={getAbsoluteUrl(product.productImage[0].url)}
              alt={product.title}
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 30vw"
              fill={true}
            />
          )}
        </div>
        <div className="product-card__header">
          <h3 className="h4">{product.title}</h3>
          {ratingComponent}
        </div>
        <p className="product-card__description">{product.description}</p>
      </Link>
      <div className="product-card__actions">
        <p>{currencyFormatter.format(product.price)}</p>
        {actionsComponent}
      </div>
    </article>
  );
};
