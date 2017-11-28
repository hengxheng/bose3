import React from "react";
import ReactDOM from 'react-dom';

export const ProductBox = (props) => {
    const imgStyle = {
        background: `url(${ props.product.imageUrl }) no-repeat center bottom`,
    }

    return (
        <div className="productOptions">
            <div className="productOptions-inner">
                <div className="productOptionsImage" style={ imgStyle }></div>
                <div className="productOptionsText">
                    <h2 className="productOptionsName">{ props.product.name }</h2>
                    <p className="productOptionsPoint">{ props.product.points } pts</p>
                    <a href="#" className="productBtn">ADD</a>
                </div>
            </div>
        </div>
    );
};