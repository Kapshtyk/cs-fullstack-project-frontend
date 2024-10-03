"use client";

import Image from "next/image";

import { CreateCategory } from "@/widgets/categories/add-category-form";
import { EditCategory } from "@/widgets/categories/edit-category-form";

import { useCategoriesQuery } from "@/features/category/get-categories";

import { getAbsoluteUrl } from "@/shared/lib";
import { Section } from "@/shared/ui";

export const CategoriesDashboard = () => {
  const {
    data: categories,
    error: categoriesError,
    isLoading,
  } = useCategoriesQuery({
    params: {
      page: 1,
      perPage: 1000,
      parentCategoryId: null,
    },
  });

  if (isLoading) {
    return <Section title="Loading...">Loading...</Section>;
  }

  if (categoriesError) {
    return <Section title="Error">{categoriesError.message}</Section>;
  }

  return (
    <Section title="Categories" isHeading>
      {categories?.items.length === 0 && <div>No categories found</div>}
      {categories?.items && categories.items.length > 0 && (
        <table className="responsive">
          <thead>
            <tr>
              <th>Title</th>
              <th>Parent Category</th>
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {categories?.items.map((category) => (
              <tr key={category.id}>
                <td data-label="Name">{category.name}</td>
                <td data-label="ParentCategory">
                  {
                    categories.items.find(
                      (cat) => cat.id === category.parentCategoryId,
                    )?.name
                  }
                </td>
                <td data-label="Image">
                  <Image
                    src={getAbsoluteUrl(category.categoryImage)}
                    alt={category.name}
                    width="100"
                    height="100"
                  />
                </td>
                <td data-label="Edit">
                  <EditCategory category={category} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <CreateCategory />
    </Section>
  );
};
