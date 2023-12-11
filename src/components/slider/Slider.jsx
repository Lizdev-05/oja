import React, { useState } from "react";
import { sliderData } from "./Slider-data";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLenght = sliderData.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLenght - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt={heading} className="image" />
                <div className="info">
                  <div className="content">
                    <h2>{heading}</h2>
                    <p>{desc}</p>
                    <hr />
                    <a href="#product" className="--btn --btn-primary">
                      Shop now
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Slider;
