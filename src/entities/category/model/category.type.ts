export interface Category {
  id: number;
  name: string;
  categoryImage: string;
  parentCategoryId: number | null;
}
