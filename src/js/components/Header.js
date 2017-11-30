import React from "react";
import ReactDOM from 'react-dom';
import headerLogo from "../../images/logo.jpg";
import scrollToElement from 'scroll-to-element';


export class Header extends React.Component{ 

    scrollToForm(e){
        e.preventDefault();
        scrollToElement('#page-form', {
            offset: 0,
            duration: 1000
        });
    };

    
    render(){
        return (
            <header className="site-heaader">
                <div className="site-inner">
                    <div className="site-header-inner">
                        <div className="header-logo">
                            <img src={ headerLogo } alt="BOSE" />
                        </div>
                        <div className="header-btn">
                            <a href="#" id="header-btn" className="btn-w" onClick={ (e) => this.scrollToForm(e) }>REDEEM GIFT</a>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
};