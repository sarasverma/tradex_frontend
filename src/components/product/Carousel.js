import React from "react";
import { useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import "./carousel.css";

const Carousel = ({ data }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };
  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }
  return (
    <section className="carousel">
      <FcPrevious className="carousel-icons left-arrow" onClick={prevSlide} />
      {data.map((item, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={item.url}
          >
            {index === current && (
              <img
                src={item.url}
                alt={`index-${index}`}
                className="carousel-images"
              />
            )}
          </div>
        );
      })}
      <FcNext className="carousel-icons right-arrow" onClick={nextSlide} />
    </section>
  );
};

export default Carousel;
