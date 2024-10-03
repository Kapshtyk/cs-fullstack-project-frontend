import { GetCartItemDto } from "@/entities/cart-item";

import CartIcon from "@/shared/icons/cart.svg";
import { Button } from "@/shared/ui";

import "./CartButton.scss";

interface CartButtonProps {
  cartItems: GetCartItemDto[];
}

export const CartButton = ({ cartItems }: CartButtonProps) => {
  return (
    <Button as="a" href="/cart" className="cart-button" aria-label="Open cart">
      <CartIcon className="cart-button__icon" />
      {cartItems.length > 0 && (
        <span className="cart-button__product-counter">{cartItems.length}</span>
      )}
    </Button>
  );
};
