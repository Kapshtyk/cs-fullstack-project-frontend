import { OrderItem } from "./order-item.type";

export interface Order {
  id: number;
  orderDate: string;
  userId: number;
  orderItems: OrderItem[];
}
