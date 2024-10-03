import { Button } from "@/shared/ui";

import { useCartQuery } from "../../get-cart";
import { useDeleteCartItemMutation } from "../lib/hooks/use-delete-cart-item-mutation";

interface DeleteCartItemButtonProps {
  cartItemId: number;
  userId: number;
}

export const DeleteCartItemButton: React.FC<DeleteCartItemButtonProps> = ({
  cartItemId,
  userId,
}) => {
  const { refetch } = useCartQuery({
    userId,
    page: 1,
    perPage: 10,
  });

  const mutation = useDeleteCartItemMutation({ cartItemId });

  const handleDelete = () => {
    void mutation.mutate(void 0, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  return <Button onClick={() => handleDelete()}>Delete</Button>;
};
