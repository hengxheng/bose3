import React from "react";
import ReactDOM from 'react-dom';
import CartRow  from './CartRow';

export default class Cart extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div id="cart-block" className={ (this.props.products.length>0)?"show": "" }>
                <h2>Your Cart</h2>
                <div className="cart-table">
                    <div className="tableRow">
                        <div className="tableCell th">
                            PRODUCT
                        </div>
                        <div className="tableCell th">
                            QTY
                        </div>
                        <div className="tableCell th">
                            COLOR
                        </div>
                        <div className="tableCell th hideMB">
                            POINTS
                        </div>
                        <div className="tableCell th">
                            &nbsp;
                        </div>
                    </div>
                    {
                        this.props.products.map((i,k) => {
                            return <CartRow key={k} product={i} ikey={k}/>
                        })
                    }
                </div>
                <div className="tableBottom">
                    TOTAL POINTS <strong>{ this.props.total }</strong>
                </div>
            </div>
        );
    }
}