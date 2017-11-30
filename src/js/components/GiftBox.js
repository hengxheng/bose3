import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as gifts from '../actions/GiftAction';

class GiftBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }

    handleClick(e){
        e.preventDefault();
        const s = !this.state.selected;
        this.setState ({
            selected: s
        });
        if(s){
            this.props.AddGift( this.props.product.name);
        }
        else{
            this.props.RemoveGift( this.props.product.name );
        }
    }

    render(){
        return (
            <div className="giftBox">
                <div className="giftBox-inner">
                    <div className="giftBoxImage">
                        <img src={ this.props.product.imageUrl } alt={ this.props.product.name } />
                    </div>
                    <div className="giftBoxText">
                        <h2 className="giftBoxName">{ this.props.product.name }</h2>
                        <p className="giftBoxPoint">{ this.props.product.points } pts</p>
                        <div className="giftBoxCTA">
                            <a href="#" className={"giftBox-btn"+(this.state.selected?" added":"")} onClick={ (e) => this.handleClick(e) } >
                                { this.state.selected?"REMOVE":"ADD"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
};

const mapStateToProps = (state) => {
    return {
        // gifts : state.selectedGifts
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        AddGift: (name) => {
            dispatch(gifts.addGift(name));
        },
        RemoveGift: (name) => {
            dispatch(gifts.removeGift(name));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftBox);