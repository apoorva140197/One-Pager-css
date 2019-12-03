import React, { Component } from "react";
import Slider from "react-slick";
import imageOne from "../../assets/images/carousel1M.svg";
import imageTwo from "../../assets/images/carousel2M.svg";
import imageThree from "../../assets/images/carousel3M.svg";
import imageFour from "../../assets/images/carousel4M.svg";
import imageFive from "../../assets/images/carousel5M.svg";

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
      <img width="100%" src={imageOne} alt=""/>
     
    </div>
    <div>
      <img width="100%"src={imageTwo} alt=""/>
      
    </div>
    <div>
      <img width="100%"src={imageThree} alt=""/>
      
    </div>
    <div>
      <img width="100%"src={imageFour} alt=""/>
   
    </div>
    <div>
      <img width="100%"src={imageFive} alt=""/>
   
    </div>
   
        </Slider>
      </div>
    );
  }
}


