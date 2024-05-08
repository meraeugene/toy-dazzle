import React from "react";
import ProductCard from "../components/ProductCard";
import { categoriesBanner, products } from "../data/products";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  // Get the category parameter from url
  const { category } = useParams();

  // Filter products based on the category
  const filteredProducts = products.filter(
    (product) => product.category?.toLowerCase() === category.toLowerCase()
  );

  // Filter banner for the current category
  const banner = categoriesBanner.find(
    (banner) => banner.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="">
      {banner && (
        <div className="category-banner  py-10 lg:px-16 2xl:px-40 mx-auto">
          <img
            src={banner.image}
            alt={`Banner for ${category}`}
            className="object-cover"
          />
        </div>
      )}
      <div className="grid grid-cols-4 gap-8 lg:px-16 2xl:px-40 py-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
