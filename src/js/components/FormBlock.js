import React from "react";
import FileUploader from "./FileUploader";
import GiftBlock from "./GiftBlock";
import * as productsData from "../productData";
import { connect } from 'react-redux';
import { error } from "util";
import axios from "axios";


class FormBlock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            formValue: {
                fullname: "",
                email:"",
                phone:"",
                serial: "",
                address: "",
                city:"",
                state:"",
                postcode:"",
                country:"",
                newsletter: false
            },
            submitStatus : "",
            formMsg : "",
            files: [
                {
                   id: 1,
                   fileName: "" 
                }
            ]
        }
        this.doneUpdate = this.doneUpdate.bind(this);
    }

    componentDidMount(){

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
    

    doneUpdate(id, fileName){
        if(fileName != "" && (typeof fileName != "undefined")){
            const files = this.state.files;
            files.map( (i, k) => {
                if(i.id == id){
                    i.fileName = fileName;
                }
            });

            this.setState({
                files: files
            });
        }
    }

    addMoreUploader(e) {
        e.preventDefault();
        let s = this.state.files.length;
        const files = this.state.files;
        files.push({ id: s+1, fileName: ""} );
        this.setState({
            files : files
        });
    }


    //handle from submition
    handleSubmit(e) {
        e.preventDefault();
        let data = this.state.formValue;
        let valid = true;
        let errorMsg = [];
        let gifts = this.props.gifts;
    
        //form validation
        let checkEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let checkPhone = /^\d+$/;

        if(data.fullname == ""){
            valid = false;
            errorMsg.push("Name is required.");
        }
        if(!checkEmail.test(data.email) || data.email == ""){
            valid = false;
            errorMsg.push("Invalid Email");
        }
        if(!checkPhone.test(data.phone) || data.phone == ""){
            valid = false;
            errorMsg.push("Invalid Phone");
        }
        if(data.serial == ""){
            valid = false;
            errorMsg.push("Serial Number is required");
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
        if(gifts.length <= 0){
            valid = false;
            errorMsg.push("Please select your redeem product");
        }
        

        let _files = this.state.files;
        let files = [];
        _files.map( (k) => { 
            if(k.fileName != ""){
                files.push(k.fileName);
            }
        });


        if(files.length <= 0){
            valid = false;
            errorMsg.push("Please upload receipt(s)");
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

            data.files = files;
            data.gifts = gifts;

            // const submited_url = "/server/form.php";
            const submited_url = document.location.origin+"/bose4/server/form.php";
            const params = Object.keys(data).map( (k) => {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&');

            // const params = JSON.stringify(data);

            axios.post(submited_url, params)
                .then( res => {
                        console.log(res.data);
                        this.setState({
                            formValue: {
                                fullname: "",
                                email:"",
                                phone:"",
                                serial: "",
                                address: "",
                                city:"",
                                state:"",
                                postcode:"",
                                country:"",
                                newsletter: false
                            },
                            submitStatus: "success",
                            formMsg: "<p>Thank you for submitting a request to redeem FREE product(s). We will be in touch shortly.</p>"
                        });
                    }
                )
                .catch(error => {
                    console.log(error)
                });
        }
    }


    render(){
        return (
            <div className="form-block">
            <form id="submit-form" action="#" method="post" encType="multipart/form-data" onSubmit = { (e) => { this.handleSubmit(e) } }>
                 <div className="form-ele">
                     <div className="form-col1">
                         <label htmlFor="fullname">FULL NAME*</label>
                         <input id="fullname" type="text" value={this.state.formValue.fullname} name="fullname" 
                         onChange={ (e) => this.handleChange(e) }/>
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col2">
                         <label htmlFor="email">EMAIL*</label>
                         <input id="email" type="email" name="email" value={ this.state.formValue.email }  onChange={ (e) => this.handleChange(e) } />
                     </div>
                     <div className="form-col2">
                         <label htmlFor="phone">PHONE*</label>
                         <input id="phone" type="text" name="phone" value={ this.state.formValue.phone } onChange={ (e) => this.handleChange(e) } />
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col1">
                         <label htmlFor="serial">SERIAL NUMBER OF EACH SYSEM SOLD* <span>(Add , to seperate more than one)</span></label>
                         <input id="serial" type="text" value={this.state.formValue.serial} name="serial"  onChange={ (e) => this.handleChange(e) }/>
                     </div>
                 </div>		
                 <div className="form-ele">
                     <div className="form-col1">
                         <label htmlFor="address">DELIVERY ADDRESS*</label>
                         <textarea id="address" name="address" value={ this.state.formValue.address }  onChange={ (e) => this.handleChange(e) }placeholder="Address*"/>
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col2">
                         <input id="city" type="text" name="city" value={ this.state.formValue.city }  onChange={ (e) => this.handleChange(e) }placeholder="City/ Town"/>
                     </div>
                     <div className="form-col2">
                         <input id="state" type="text" name="state" value={ this.state.formValue.state }  onChange={ (e) => this.handleChange(e) } placeholder="State*"/>
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col2">
                         <input id="postcode" type="text" name="postcode" value={ this.state.formValue.postcode }  onChange={ (e) => this.handleChange(e) } placeholder="Postcode*"/>
                     </div>
                     <div className="form-col2">
                         <select id="country" name="country" value={ this.state.formValue.country }  onChange={ (e) => this.handleChange(e) }>
                             <option value="">Country*</option>  
                             <option value="AU">Australia</option>
                             <option value="NZ">New Zealand</option>
                         </select>
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col1">
                         <label>SUBMIT SALES RECEIPT(S)*</label>
                         {
                             this.state.files.map( (i, k) => {
                                 return <FileUploader key={k} keyid={ i.id } doneUpdate = {this.doneUpdate} />
                             })
                         }
                         
                         <div className="uploader-more">
                             <a href="#" className="more-btn" onClick={ (e) => this.addMoreUploader(e) }>ADD MORE +</a>
                         </div>
                     </div>
                     <div id="upload-output"></div>
                 </div>
                 <div className="form-ele">
                     <GiftBlock name="Headphones" show={true} products={ productsData.headphones } />
                     <GiftBlock name="Speakers" products={ productsData.speakers } />
                     <GiftBlock name="Systems" products={ productsData.systems } />
                     <GiftBlock name="Other products" products={ productsData.others } />
                 </div>
                 <div className="form-ele">
                     <div className="checkbox-wrapper">
                         <label htmlFor="newsletter"><input type="checkbox" id="newsletter" name="newsletter"  onChange={ (e) => this.handleChange(e) }/><span>Yes, I'd like email updates regarding new products and promotions from Bose®.</span></label>
                     </div>
                 </div>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
       gifts : state.GiftReducer.selectedGifts
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBlock);