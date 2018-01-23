import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as gifts from '../actions/GiftAction';

class AddtoCart extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate(){
        if(this.props.show){
            setTimeout(()=>{
                this.props.fadeOut();       
            }, 2000);
        }
    }
    
    render(){
        return (
            <div id="AddtoCart-popup" className={ this.props.show?"show": "" }>
                <h2>Your item has been successfully added to your cart</h2>
                <h3>{ this.props.product.name }</h3>
                <p>QTY: <strong>{ this.props.product.qty }</strong></p>
                <p className={ (this.props.product.color.length>0)? "":"noColor" } >COLOR: <strong>{ this.props.product.color }</strong></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.GiftReducer.newGift,
        show: state.GiftReducer.newAdded
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fadeOut: () => {
            dispatch(gifts.HidePopup());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddtoCart);