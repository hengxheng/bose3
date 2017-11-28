import React from "react";
import { ProductBox } from "./ProductBox";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';

export default class ProductStrip extends React.Component{
    render() {
        var settings = {};
        if(this.props.products.length>4){
            settings = {
                infinite: false,
                speed: 1500,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                // autoplay: true,
                responsive: [ 
                    { 
                        breakpoint: 700, 
                        settings: { slidesToShow: 1 } 
                    }, 
                    { 
                        breakpoint: 900, 
                        settings: { slidesToShow: 2 } 
                    }
                ]
            };
        }
        else{
            settings = {
                infinite: false,
                speed: 1500,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: false,
                // autoplay: true,
                responsive: [ 
                    { 
                        breakpoint: 700, 
                        settings: { 
                            slidesToShow: 1,
                            arrows: true
                        } 
                    }, 
                    { 
                        breakpoint: 900, 
                        settings: { 
                            slidesToShow: 2,
                            arrows: true 
                        } 
                    }
                ]
            };
        }

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