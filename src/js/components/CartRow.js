import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as gifts from '../actions/GiftAction';

class CartRow extends React.Component {
    constructor(props){
        super(props);
    }

    removeItem(e, i){
        e.preventDefault();
        this.props.removeItem(i);
    }

    render(){
        return (
            <div className="tableRow">
                <div className="tableCell">
                    <strong>{ this.props.product.name }</strong>
                </div>
                <div className="tableCell">
                    { this.props.product.qty }
                </div>
                <div className="tableCell">
                    { this.props.product.color? this.props.product.color: "N/A" }
                </div>
                <div className="tableCell">
                    { this.props.product.point }
                </div>
                <div className="tableCell">
                    <a href="#" className="ItemRemove" onClick={ (e) => { this.removeItem(e, this.props.ikey) }} >REMOVE</a>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        // products: state.GiftReducer.selectedGifts,
        // show: state.GiftReducer.newAdded
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (i) => {
            dispatch(gifts.removeGift(i));
        }
    }
}

 export default connect(mapStateToProps, mapDispatchToProps)(CartRow);