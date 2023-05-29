import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Carousel = ({ media, name }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      {media.map((image, index) => (
        <div key={index}>
          <img src={image} alt={name} width={100} height={100} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
