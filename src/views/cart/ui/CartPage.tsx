"use client";

import { CreateOrderButton } from "@/widgets/orders/create-order-button";

import { DeleteCartItemButton } from "@/features/cart-item/delete-cart-item";
import { EditCartForm } from "@/features/cart-item/edit-cart-item";
import { useCartQuery } from "@/features/cart-item/get-cart";
import { useCurrentUserQuery } from "@/features/user/get-me";

import { currencyFormatter } from "@/shared/lib";
import { Section } from "@/shared/ui";

import "./CartPage.scss";

export const CartPage = () => {
  const { data: currentUser } = useCurrentUserQuery();

  const {
    data: cartItems,
    isError,
    isLoading,
  } = useCartQuery({
    userId: currentUser?.id,
    page: 1,
    perPage: 10,
  });

  if (!currentUser) {
    return (
      <Section title="Cart" isHeading>
        Please log in to view cart
      </Section>
    );
  }

  return (
    <Section title="Cart" isHeading>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {cartItems?.length === 0 && <p>No items in cart</p>}
      <ul>
        {cartItems?.map((cartItem) => (
          <li className="cart-item" key={cartItem.id}>
            {cartItem.product.title} - {cartItem.quantity}{" "}
            {currencyFormatter.format(
              cartItem.quantity * cartItem.product.price,
            )}
            <div className="cart-item__controls">
              <EditCartForm
                userId={currentUser?.id}
                cartItemId={cartItem.id}
                currentQuantity={cartItem.quantity}
              />
              <DeleteCartItemButton
                cartItemId={cartItem.id}
                userId={currentUser?.id}
              />
            </div>
          </li>
        ))}
      </ul>
      {(cartItems?.length ?? 0) > 0 && (
        <CreateOrderButton userId={currentUser?.id} />
      )}
    </Section>
  );
};
