export interface CreateReviewDto {
  title: string;
  description: string;
  productId: number;
  userId: number;
  rating: number;
}
