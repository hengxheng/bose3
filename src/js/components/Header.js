import React from "react";
import ReactDOM from 'react-dom';
import headerLogo from "../../images/logo.jpg";

export const Header = (props) => {
    return (
        <header className="site-heaader">
            <div className="site-inner">
                <div className="site-header-inner">
                    <div className="header-logo">
                        <img src={ headerLogo } alt="BOSE" />
                    </div>
                    <div className="header-btn">
                        <a href="#" id="header-btn" className="btn-w">REDEEM GIFT</a>
                    </div>
                </div>
            </div>
        </header>
    );
};