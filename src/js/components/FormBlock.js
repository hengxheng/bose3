import React from "react";
import FileUploader from "./FileUploader";
import GiftBlock from "./GiftBlock";
import * as productsData from "../productData";
import { connect } from 'react-redux';


class FormBlock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gifts: [],
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
            submitStatus : "",
            formMsg : "",
            files: [
                {
                   id: 1,
                   value: "" 
                }
            ]
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

    addMoreUploader(e) {
        e.preventDefault();
        let s = this.state.files.length;
        const files = this.state.files;
        files.push({ id: s+1, value: ""} );
        console.log(files);
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


    render(){
        return (
            <div className="form-block">
            <form id="submit-form" action="#" method="post" encType="multipart/form-data">
                 <div className="form-ele">
                     <div className="form-col1">
                         <label htmlFor="firstname">FULL NAME*</label>
                         <input id="firstname" type="text" value={this.state.formValue.firstname} name="firstname" onChange={this.handleChange}/>
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col2">
                         <label htmlFor="email">EMAIL*</label>
                         <input id="email" type="email" name="email" value="" />
                     </div>
                     <div className="form-col2">
                         <label htmlFor="phone">PHONE*</label>
                         <input id="phone" type="text" name="phone" value="" />
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col1">
                         <label htmlFor="serial">SERIAL NUMBER OF EACH SYSEM SOLD* <span>(Add , to seperate more than one)</span></label>
                         <input id="serial" type="text" value={this.state.formValue.firstname} name="serial" onChange={this.handleChange}/>
                     </div>
                 </div>		
                 <div className="form-ele">
                     <div className="form-col1">
                         <label htmlFor="address">DELIVERY ADDRESS*</label>
                         <textarea id="address" name="address" value={ this.state.formValue.address } onChange={this.handleChange} placeholder="Address*"/>
                     </div>
                 </div>
                 <div className="form-ele">
                     <div className="form-col2">
                         <input id="city" type="text" name="city" value={ this.state.formValue.postcode } onChange={this.handleChange} placeholder="City/ Town"/>
                     </div>
                     <div className="form-col2">
                         <input id="state" type="text" name="state" value={ this.state.formValue.postcode } onChange={this.handleChange} placeholder="State*"/>
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
                         <label htmlFor="newsletter"><input type="checkbox" id="newsletter" name="newsletter"/><span>Yes, I'd like email updates regarding new products and promotions from Bose®.</span></label>
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
        gifts : state.selectedGifts
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBlock);