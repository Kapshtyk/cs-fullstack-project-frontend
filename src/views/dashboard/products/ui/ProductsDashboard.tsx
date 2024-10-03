"use client";

import Image from "next/image";
import { useState } from "react";

import { CreateCategory } from "@/widgets/categories/add-category-form";
import { CreateProduct } from "@/widgets/products/add-product-form";
import { DeleteProduct } from "@/widgets/products/delete-product-button";
import { EditProduct } from "@/widgets/products/edit-product-form";

import { useProductsQuery } from "@/features/product/get-products";

import { getAbsoluteUrl } from "@/shared/lib";
import { Input, Section } from "@/shared/ui";

const ProductsDashboard = () => {
  const [search, setSearch] = useState("");

  const {
    data: products,
    error: productsError,
    isLoading,
  } = useProductsQuery({
    params: {
      page: 1,
      perPage: 1000,
      categoryId: null,
    },
  });

  if (isLoading) {
    return <Section title="Loading...">Loading...</Section>;
  }

  if (productsError) {
    return <Section title="Error">{productsError.message}</Section>;
  }

  const filteredProducts =
    products?.items.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.price.toString().includes(search) ||
        product.stock.toString().includes(search),
    ) ?? [];

  return (
    <Section title="Products" isHeading>
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="search"
        label="Search"
      />
      {filteredProducts.length === 0 && <div>No products found</div>}
      {filteredProducts.length > 0 && (
        <table className="responsive">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td data-label="Title">{product.title}</td>
                <td data-label="Price">{product.price}</td>
                <td data-label="Stock">{product.stock}</td>
                <td data-label="Image">
                  <Image
                    src={getAbsoluteUrl(product.productImage[0]!.url)}
                    alt={product.title}
                    width="100"
                    height="100"
                  />
                </td>
                <td data-label="Edit">
                  <EditProduct product={product} />
                </td>
                <td data-label="Delete">
                  <DeleteProduct product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <CreateProduct />
      <CreateCategory />
    </Section>
  );
};

export default ProductsDashboard;
