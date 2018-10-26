import React, {Component} from 'react';
import {Router} from "../routes"

class Popupp extends Component {

    constructor(props){
        super(props);
        this.state={
            text:this.props.text,
            redirect:this.props.redirect
        }
    }

    redirectTo = ()=>{
         //Start the timer
            console.log(this.state.redirect);
            window.location.reload();

    }
    componentDidMount(){
        //Timer 3 sec
        //then fade out and redirect
        setTimeout(this.redirectTo, 1000)
    }

    styles={
        zIndex:-1
    }

    render() {
        return (
            <div >

                <h1>{this.state.text}</h1>
            </div>
        );
    }
}



export default Popupp;