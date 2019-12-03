import React, { Component } from "react";
import Slider from "react-slick";
import imageOne from "../../assets/images/carousel1D.svg";
import imageTwo from "../../assets/images/carousel2D.svg";
import imageThree from "../../assets/images/carousel3D.svg";
import imageFour from "../../assets/images/carousel4D.svg";
import imageFive from "../../assets/images/carousel5D.svg";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay:true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false,
      pauseOnDotsHover:true,
      pauseOnFocus:true
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
      <img width="100%" src={imageOne} alt="" />
     
    </div>
    <div>
      <img width="100%"src={imageTwo} alt="" />
      
    </div>
    <div>
      <img width="100%"src={imageThree} alt="" />
      
    </div>
    <div>
      <img width="100%"src={imageFour} alt="" />
   
    </div>
    <div>
      <img width="100%"src={imageFive} alt="" />
   
    </div>
   
        </Slider>
      </div>
    );
  }
}


