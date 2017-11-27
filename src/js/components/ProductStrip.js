import React from "react";
import { ProductBox } from "../components/ProductBox";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';

export default class ProductStrip extends React.Component{
    render() {
        var settings = {
            infinite: true,
            speed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            dots: true,
            dotsClass: "sliderDots",
        };

        return(
            <div className="product-strip">
                <Slider {...settings}>
                    {
                        this.props.products.map( (i, key) => {
                            return <div key={key}><ProductBox product={i} /></div>
                        })
                    }
                </Slider>
            </div>
        );
    }
}