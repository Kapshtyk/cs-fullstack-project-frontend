"use client";

import { useOrdersQuery } from "@/features/order/get-orders";

import { OrderCard } from "@/entities/order";
import { GetUserDto } from "@/entities/user";

interface OrderListForUserProps {
  user: GetUserDto;
}

export const OrderListForUser: React.FC<OrderListForUserProps> = ({ user }) => {
  const {
    data: orders,
    isError,
    isLoading,
  } = useOrdersQuery({
    params: {
      page: 1,
      perPage: 10,
      userId: user.id,
    },
  });

  return (
    <div>
      <h2>Orders</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {orders?.items.length === 0 && <p>No orders found</p>}
      {orders?.items && orders.items.length > 0 && (
        <ul>
          {orders?.items.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
