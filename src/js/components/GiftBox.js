import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as gifts from '../actions/GiftAction';

class GiftBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: false,
            inputVal: 0,
            selectVal: "",
            inputError: false,
            selectError: false
        }
    }

    handleClick(e){
        e.preventDefault();
        const s = !this.state.selected;
        this.setState ({
            selected: s
        });

        if(this.state.inputVal < 1 || this.state.inputVal == ""){
            this.setState({
                inputError: true
            });
        }
        else{
            this.setState({
                inputError: false
            });
        }

        if(this.state.selectVal == ""){
            this.setState({
                selectError: true
            })
        }
        else{
            this.setState({
                selectError: false
            });
        }

        if(s){
            this.props.AddGift( this.props.product.name);
        }
        else{
            this.props.RemoveGift( this.props.product.name );
        }
    }

    handleInputChange(e){
        this.setState({ inputVal: parseInt(e.target.value) });
    }

    handleSelectChange(e){
        this.setState({ selectVal: e.target.value });
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
                        <div className="giftBoxOptions">
                            <input name={ this.props.product.name + '-qty' } placeholder="Qty" onChange={ (e) => this.handleInputChange(e) } className={ this.state.inputError? "error": "" }/>
                            <select className={ (this.props.product.color.length>0 ? "hasColor": " ") + (this.state.selectError? " error": " ") } onChange={ (e) => this.handleSelectChange(e) }>
                                <option value="">Color</option>
                                {
                                  this.props.product.color.map((i,k)=>{
                                    return <option key={k} value={i}>{i}</option>;
                                  })
                                }
                            </select>
                        </div>
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