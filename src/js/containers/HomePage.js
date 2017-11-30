import React from "react";
import FormBlock from "../components/FormBlock"
import ProductStrip from "../components/ProductStrip";
import * as productsData from "../productData";

export default class Home extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div className="product-page">
                <div className="page-header">
                    <div className="site-inner">
                        <div className="page-header-inner">
                            <h2>Be rewarded for every Lifestyle® system you sell.*</h2>
                            <p>For a limited time, eligible participant who sells a Lifestyle® system in the nominated range during the promotion period will earn points. These points can then be accrued and have the opportunity to claim on redeemable gifts.</p>
                        </div>
                    </div>
                </div>
                <div className="page-section" id="s1">
                    <div className="site-inner">
                        <div className="section-title">
                            <h2>Earn Points by Selling the Below Range of Lifestyle® Home Entertainment Systems</h2>
                        </div>
                        <div className="section-content">
                            <div className="flex-row">
                                <div className="col3">
                                    <div className="points-block"> 
                                        <div id="pc1" className="points-circle">
                                            <h2>20 pts.</h2>
                                        </div>
                                        <div className="points-text">
                                            <p>for every</p>
                                            <h3>Lifestyle® 650</h3>
                                            <p>(Black or White)</p>
                                            <p>you sell</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col3">
                                    <div className="points-block">
                                        <div id="pc2" className="points-circle">
                                            <h2>10 pts.</h2>
                                        </div>
                                        <div className="points-text">
                                            <p>for every</p>
                                            <h3>Lifestyle® 600</h3>
                                            <p>(Black or White)</p>
                                            <p>you sell</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col3">
                                    <div className="points-block">
                                        <div id="pc3" className="points-circle">
                                            <h2>10 pts.</h2>
                                        </div>
                                        <div className="points-text">
                                            <p>for every</p>
                                            <h3>Lifestyle® 600</h3>
                                            <p>(Flush Black or White)</p>
                                            <p>you sell</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-section">
                    <div className="site-inner">
                        <div className="section-title">
                            <h2>FREE Redeemable Products</h2>
                        </div>
                    </div>
                    <div className="product-slider-block" id="psb1">
                        <div className="site-inner-big">
                            <div className="product-slider-name">
                                <h3>HEADPHONES</h3>
                            </div>
                            <div className="product-slider">
                                <ProductStrip products={ productsData.headphones } />
                            </div>
                        </div>
                    </div>
                    <div className="product-slider-block" id="psb2">
                        <div className="site-inner-big">
                            <div className="product-slider-name">
                                <h3>SPEAKERS</h3>
                            </div>
                            <div className="product-slider">
                                <ProductStrip products={ productsData.speakers } />
                            </div>
                        </div>
                    </div>
                    <div className="product-slider-block" id="psb3">
                        <div className="site-inner-big">
                            <div className="product-slider-name">
                                <h3>SYSTEMS</h3>
                            </div>
                            <div className="product-slider">
                                <ProductStrip products={ productsData.systems } />
                            </div>
                        </div>
                    </div>
                    <div className="product-slider-block" id="psb4">
                        <div className="site-inner-big">
                            <div className="product-slider-name">
                                <h3>OTHER PRODUCTS</h3>
                            </div>
                            <div className="product-slider">
                                <ProductStrip products={ productsData.others } />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="page-form" className="page-form">
                    <div className="site-inner">
                        <h2 className="form-header">Please enter your details to redeem FREE gift using points</h2>
                        <FormBlock/>
                    </div>
                </div>
            </div>
        );
    }
} 