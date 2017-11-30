import React from "react";
import ReactDOM from 'react-dom';
import headerLogo from "../../images/logo.jpg";

export const Footer = (props) => {
    return (
        <footer className="site-footer">
            <div className="site-inner">
                <div className="site-footer-inner">
                    <div className="footer-logo">
                        <img src={ headerLogo } alt="BOSE" />
                    </div>
                    <div className="site-copy">
                    <p>Phone number: AU: <a href="tel: 1800 023 367">1800 023 367</a>/NZ: <a href="tel: 1800 061 046">1800 061 046</a> or email: <a href="mailto:ausinfo@bose.com">ausinfo@bose.com</a></p>
                        <p>&copy; Bose Corporation 2017</p>
                    </div>
                    <div className="terms">     
                        <p><a href="/Bose.pdf" target="_blank">Terms & Conditions</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};