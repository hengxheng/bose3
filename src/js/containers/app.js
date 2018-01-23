import React from "react";
import PropTypes from "prop-types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { renderRoutes } from 'react-router-config';
import AddtoCart from "../components/AddtoCart";

export default class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <Header/>
                    <div className="page-container">
                        { renderRoutes( this.props.route.routes )}
                    </div>
                <Footer/>
                <AddtoCart/>
            </div>
        );
    }
} 
