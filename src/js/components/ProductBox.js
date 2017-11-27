import React from "react";
import ReactDOM from 'react-dom';

export const ProductBox = (props) => {
    const imgStyle = {
        background: `url(${ props.product.imageUrl }) no-repeat center bottom`,
    }

    return (
        <div className="productBox">
            <div className="productBox-inner">
                <h2 className="productName">{ props.product.name }</h2>
                <p className="productPoint">{ props.product.points } pts</p>
                <div className="productImage" style={ imgStyle }></div>
            </div>
        </div>
    );
};