"use client";

import { DeleteOrderButton } from "@/features/order/delete-order";
import { useOrdersQuery } from "@/features/order/get-orders";

import { OrderCard } from "@/entities/order";

import { Section } from "@/shared/ui";

export const OrderListForAdmin: React.FC = () => {
  const {
    data: orders,
    isError,
    isLoading,
  } = useOrdersQuery({
    params: {
      page: 1,
      perPage: 100,
      userId: null,
    },
  });

  return (
    <Section title="Orders" isHeading>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {orders?.items.length === 0 && <p>No orders found</p>}
      {orders?.items && orders.items.length > 0 && (
        <ul>
          {orders?.items.map((order) => (
            <li key={order.id}>
              <OrderCard
                order={order}
                actionsComponent={<DeleteOrderButton order={order} />}
              />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
};
