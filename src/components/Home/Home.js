import React from "react";
import "./Home.css";
import Product from "./Product";

const product = {
  name: "Shirt",
  images: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Blue_Tshirt.jpg",
    },
  ],
  price: "₹100",
  _id: "sample_id",
};

const Home = () => {
  return (
    <div className="container">
      <h2 className="heading">Featured products</h2>
      <div className="productsContainer">
        <Product product={product} />
      </div>
    </div>
  );
};

export default Home;
