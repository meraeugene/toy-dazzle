import React from "react";

import Featured from "../components/Featured";
import Voucher from "../components/Voucher";

import { products } from "../data/products";
import Products from "../components/Products";
import ShopBrands from "../components/ShopBrands";

const Home = () => {
  const bestSellers = products.filter(
    (product) => product.tag && product.tag.includes("Best Seller")
  );

  const newArrivals = products.filter(
    (product) => product.tag && product.tag.includes("New Arrivals")
  );

  return (
    <div>
      <Featured />
      <Voucher />
      <Products title="Best Selling" data={bestSellers} />
      <Products title="New Arrivals" data={newArrivals} />
      <ShopBrands />
    </div>
  );
};

export default Home;
