export interface CreateCategoryDto {
  name: string;
  categoryImage: File;
  parentCategoryId?: number;
}
