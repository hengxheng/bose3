import React from "react";
import ReactDOM from 'react-dom';

export const GiftBox = (props) => {
    return (
        <div className="giftBox">
            <div className="giftBox-inner">
                <div className="giftBoxImage">
                    <img src={ props.product.imageUrl } alt={ props.product.name } />
                </div>
                <div className="giftBoxText">
                    <h2 className="giftBoxName">{ props.product.name }</h2>
                    <p className="giftBoxPoint">{ props.product.points } pts</p>
                    <div className="giftBoxCTA">
                        <a href="#" className="giftBox-btn">ADD</a>
                    </div>
                </div>
            </div>
        </div>
    );
};