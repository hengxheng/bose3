import React from "react";
import ReactDOM from 'react-dom';
import { GiftBox } from './GiftBox';

export default class GiftBlock extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: this.props.show
        };

        this.handleCollapse = this.handleCollapse.bind(this);
    }

    handleCollapse(){
        const s = this.state.open;
        this.setState({
            open: !s
        });
        console.log(this.state);
    }
    render(){
        return (
            <div className={ "giftBlock "+(this.state.open?"opened":"closed") }>
                <div className="giftBlock-name" onClick={ this.handleCollapse }>
                    { this.props.name }
                </div>
                <div className="giftBlock-inner">
                    {
                        this.props.products.map( (i,k) => {
                            return <GiftBox key={k} product={ i }/>
                        })
                    }
                </div>
            </div>
        );
    }
    
};