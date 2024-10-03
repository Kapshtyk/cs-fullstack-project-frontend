import Image from "next/image";

import { GetProductDto } from "@/entities/product";

import { currencyFormatter, getAbsoluteUrl } from "@/shared/lib";
import { Button } from "@/shared/ui";

import "./SuggestedProduct.scss";

interface SelecedProductProps {
  product: GetProductDto;
}

export const SuggestedProduct = ({ product }: SelecedProductProps) => {
  return (
    <div className="suggested-product">
      <h3 className="suggested-product__heading">Our recommendation</h3>
      <article className="suggested-product__article">
        <div className="suggested-product__content">
          <h3 className="suggested-product__title">{product.title}</h3>
          <p className="suggested-product__price">
            {currencyFormatter.format(product.price)}
          </p>
        </div>
        {product.productImage.length > 0 && product.productImage[0] && (
          <div className="suggested-product__image-wrapper">
            <Image
              src={getAbsoluteUrl(product.productImage[0].url)}
              alt={product.title}
              fill={true}
            />
          </div>
        )}
      </article>
      <Button
        data-testid="suggested-product-button"
        as="a"
        href={`/products/${product.id}`}
        className="suggested-product__button"
      >
        View
      </Button>
    </div>
  );
};
