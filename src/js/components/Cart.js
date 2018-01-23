import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as gifts from '../actions/GiftAction';

class AddtoCart extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show: false
        }
    }

    componentDidUpdate(){
        if(this.props.products.length>0){
            this.setState({
                show: true
            });
        }
        else{
            this.setState({
                show: false
            });
        }
    }
    
    render(){
        return (
            <div id="cart-block" className={ this.props.show?"show": "" }>
                <h2>Your item has been successfully added to your cart</h2>
                <h3>{ this.props.product.name }</h3>
                <p>QTY: <strong>{ this.props.product.qty }</strong></p>
                <p className={ (this.props.product.color != "")? "HasColor":"" } >COLOR: <strong>{ this.props.product.color }</strong></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.GiftReducer.selectedGifts,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: () => {
            dispatch(gifts.removeItem());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);