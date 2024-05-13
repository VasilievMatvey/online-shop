import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Carousel } from "react-bootstrap";

const CustomCarousel = (props) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      data-bs-theme="dark"
      variant="dark"
      activeIndex={index}
      onSelect={handleSelect}
      className="carousel"
    >
      {props.products.map((product) => (
        <Carousel.Item
          key={product.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            className="d-block w-100"
            src={process.env.REACT_APP_IMG_URL + product.image}
            alt="First slide"
          />
          <Carousel.Caption className="text-dark">
            <h3>{product.name}</h3>
            <p>Цена: {product.price} руб.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
