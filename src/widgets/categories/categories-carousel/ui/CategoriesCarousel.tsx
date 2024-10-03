import Image from "next/image";
import Link from "next/link";

import { GetCategoryDto } from "@/entities/category";

import { getAbsoluteUrl } from "@/shared/lib";

import "./CategoriesCarousel.scss";

interface CategoriesCarouselProps {
  categories: GetCategoryDto[];
}

export const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({
  categories,
}) => {
  const selectedCategories = categories.slice(0, 5);
  return (
    <ul className="categories-carousel">
      {selectedCategories.map((category) => (
        <li className="categories-carousel__item" key={category.id}>
          <Link href={`/products?categoryId=${category.id}`}>
            <div className="categories-carousel__image-wrapper">
              <Image
                src={getAbsoluteUrl(category.categoryImage)}
                alt=""
                fill={true}
                sizes="30vw"
                priority={true}
              />
            </div>
            <h3>{category.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};
