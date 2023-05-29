import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Carousel = ({ media, name }) => {
  const singleChecker = media.length === 1;

  const imageStyles = {
    width: "35vw",
    height: "35vh",
    objectFit: "cover",
    border: "1px solid black",
    display: "flex",
    margin: "0 auto",
  };

  return (
    <AliceCarousel
      infinite={true}
      autoPlay={!singleChecker}
      autoPlayInterval={7500}
      disableButtonsControls={singleChecker}
    >
      {media.map((image, index) => (
        <div key={index}>
          <img src={image} alt={name} style={imageStyles} />
        </div>
      ))}
    </AliceCarousel>
  );
};

export default Carousel;
