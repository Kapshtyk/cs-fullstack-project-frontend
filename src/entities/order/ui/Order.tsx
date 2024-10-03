import Image from "next/image";
import React, { ReactNode } from "react";

import { currencyFormatter, dateFormatter, getAbsoluteUrl } from "@/shared/lib";

import "./Order.scss";

import { GetOrderDto } from "../dto/get-order.dto";

interface OrderProps {
  order: GetOrderDto;
  actionsComponent?: ReactNode;
  additionalInfo?: ReactNode;
}

export const Order: React.FC<OrderProps> = ({ order, actionsComponent }) => {
  const orderDate = dateFormatter.format(new Date(order.orderDate));
  const totalAmount = order.orderItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <div className="order">
      <div className="order__header">
        <h2 className="order__title">Order {order.id}</h2>
        <p className="order__date">{orderDate}</p>
      </div>
      <div className="order__info">
        <p className="order__user-id">User ID: {order.userId}</p>
        <p className="order__total-amount">
          Total: {currencyFormatter.format(totalAmount)}
        </p>
      </div>
      <ul className="order__items">
        {order.orderItems.map((orderItem) => (
          <li key={orderItem.id} className="order__item">
            <div className="order__item-image">
              {orderItem.product.productImage[0]?.url && (
                <Image
                  src={getAbsoluteUrl(orderItem.product.productImage[0].url)}
                  alt={orderItem.product.title}
                  fill={true}
                />
              )}
            </div>
            <div className="order__item-info">
              <h3 className="order__item-title">{orderItem.product.title}</h3>
              <p className="order__item-quantity">
                Quantity: {orderItem.quantity}
              </p>
              <p className="order__item-price">
                Order price per item:{" "}
                {currencyFormatter.format(orderItem.price)}
                {orderItem.price != orderItem.product.price && (
                  <p>
                    Current price:{" "}
                    {currencyFormatter.format(orderItem.product.price)}
                  </p>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {actionsComponent}
    </div>
  );
};
