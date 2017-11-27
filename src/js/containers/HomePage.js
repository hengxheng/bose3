import 'react-day-picker/lib/style.css';

import React from "react";
import FileUploader from "../components/FileUploader";
import scrollToElement from 'scroll-to-element';
import axios from 'axios';
import ProductStrip from "../components/ProductStrip";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import * as productsData from "../productData";

console.log(productsData);

export default class Home extends React.Component {
   
    constructor(){
        super();
        this.state = {
            formValue: {
                firstname: "",
                lastname: "",
                email:"",
                phone:"",
                serialNo: "",
                date: "",
                address: "",
                city:"",
                state:"",
                postcode:"",
                country:"",
                newsletter: false,
                color: "White",
                file:""   
            },
            fileUploaded : false,
            selectedDays : new Date(),
            submitStatus : "",
            formMsg : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.doneUpdate = this.doneUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const old_state = this.state.formValue;
        Object.assign(old_state, { [name] : value });
        this.setState({
            formValue: old_state
        });
    }
    

    doneUpdate(fileName){
        if(fileName != "" && (typeof fileName != "undefined")){
            const old_state = this.state.formValue;
            Object.assign(old_state, { file: fileName });
            this.setState({
                formValue: old_state
            });
        }
    }

    scrollToForm(e){
        e.preventDefault();
        scrollToElement('#page-form', {
            offset: 0,
            duration: 1000
        });
    }

    //handle from submition
    handleSubmit(e) {
        e.preventDefault();
        let data = this.state.formValue;
        let valid = true;
        let errorMsg = [];

        //form validation
        let checkEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let checkPhone = /^\d+$/;
        let checkSerial = /^(074302|074113).*$/;

        if(data.firstname == ""){
            valid = false;
            errorMsg.push("First name is required.");
        }
        if(data.lastname == ""){
            valid = false;
            errorMsg.push("Last name is required.");
        }
        if(!checkEmail.test(data.email) || data.email == ""){
            valid = false;
            errorMsg.push("Invalid Email");
        }
        if(!checkPhone.test(data.phone) || data.phone == ""){
            valid = false;
            errorMsg.push("Invalid Phone");
        }
        if(!checkSerial.test(data.serialNo) || data.serialNo == ""){
            valid = false;
            errorMsg.push("Invalid Serial Number");
        }
        if(data.date == ""){
            valid = false;
            errorMsg.push("Purchased date is required");
        }
        if(data.address == ""){
            valid = false;
            errorMsg.push("Address is required.");
        }
        if(data.city == ""){
            valid = false;
            errorMsg.push("City is required.");
        }
        if(data.state == ""){
            valid = false;
            errorMsg.push("State is required.");
        }
        if(data.postcode == ""){
            valid = false;
            errorMsg.push("Postcode is required.");
        }
        if(data.country == ""){
            valid = false;
            errorMsg.push("Country is required.");
        }
        if(data.file == ""){
            valid = false;
            errorMsg.push("Please upload the receipt before submitting the form.");
        }

        if(!valid){
            let error = "";
            errorMsg.map( (i) =>{
                error += "<p>"+i+"</p>";
            });
            this.setState({
                submitStatus: "error",
                formMsg: error
            });
        }
        else{
            this.setState({
                submitStatus: "",
                formMsg: ""
            });

            const submited_url = "/server/form.php";
            const params = Object.keys(data).map( (k) => {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&');

            axios.post(submited_url, params)
                .then( res => {
                        console.log(res.data);
                        this.setState({
                            formValue: {
                                product: "SoundTouch® 300",
                                firstname: "",
                                lastname: "",
                                email:"",
                                phone:"",
                                serialNo: "",
                                date: "",
                                address: "",
                                city:"",
                                state:"",
                                postcode:"",
                                country:"",
                                newsletter: false,
                                color: "White",
                                file:""   
                            },
                            submitStatus: "success",
                            formMsg: "<p>Thank you for submitting a request to redeem a free product. You will receive your redeemed item within the next 30 days.</p>"
                        });
                    }
                )
                .catch(error => {
                    console.log(error)
                });
        }
    }

    render() {
        console.log(productsData);
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
                                            <p>(Fluch Black or White)</p>
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
                        <div className="product-slider-name">
                            <h3>HEADPHONES</h3>
                        </div>
                        <div className="product-slider" id="ps1">
                            <ProductStrip products={ productsData.headphones } />
                        </div>
                    </div>
                </div>
                {/* <div id="page-form" className="page-form">
                    <div className="site-inner">
                        <div className="form-block">
                           <form id="submit-form" action="#" method="post" encType="multipart/form-data">
                                <div className="form-ele">
                                    <label htmlFor="firstname">FULL NAME*</label>
                                    <input id="firstname" type="text" value={this.state.formValue.firstname} name="firstname" onChange={this.handleChange}/>
                                </div>					
                                <div className="form-ele">
                                    <div className="form-col1">
                                        <label htmlFor="address">SHIPPING ADDRESS*</label>
                                        <textarea id="address" name="address" value={ this.state.formValue.address } onChange={this.handleChange} placeholder="Address*"/>
                                    </div>
                                </div>
                                <div className="form-ele">
                                    <div className="form-col2">
                                        <input id="postcode" type="text" name="postcode" value={ this.state.formValue.postcode } onChange={this.handleChange} placeholder="Postcode*"/>
                                    </div>
                                    <div className="form-col2">
                                        <select id="country" name="country" value={ this.state.formValue.country } onChange={this.handleChange}>
                                            <option value="">Country*</option>  
                                            <option value="AU">Australia</option>
                                            <option value="NZ">New Zealand</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-ele">
                                    <div className="form-col1">
                                        <label>Submit receipt*</label>
                                        <FileUploader doneUpdate = {this.doneUpdate}/>
                                    </div>
                                </div>
                                <div id="upload-output"></div>
                                <div className="form-ele">
                                    <div className="form-col1">
                                        <input type="submit" value="SUBMIT" id="submit-btn" />
                                    </div>
                                </div>
                                <div className="form-ele">
                                    <div className="form-col1">
                                        <div className={ "msg "+ this.state.submitStatus }>
                                            <div dangerouslySetInnerHTML={{ __html: this.state.formMsg }} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
} 