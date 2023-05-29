import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "styled-components";

// A Carousel component that displays images in a carousel. Able to handle single and multiple images.
const Carousel = ({ media, name }) => {
  const singleChecker = media.length === 1;

  const Image = styled.img`
    width: 35vw;
    height: 35vh;
    object-fit: cover;
    border: 1px solid black;
    display: flex;
    margin: 0 auto;

    @media (max-width: 768px) {
      width: 60vw;
      height: 45vh;
    }
  `;

  return (
    <AliceCarousel
      infinite={true}
      autoPlay={!singleChecker}
      autoPlayInterval={7500}
      disableButtonsControls={singleChecker}
      touchTracking={!singleChecker}
      touchMoveDefaultEvents={!singleChecker}
    >
      {media.map((image, index) => (
        <div key={index}>
          <Image src={image} alt={name} />
        </div>
      ))}
    </AliceCarousel>
  );
};

export default Carousel;
