import React, {Component} from 'react';


class Loading extends Component {



    render() {
        if(this.props.icon){
            return (
                <div className="loadingContainer">
                    <div className="loadingIcon">

                    </div>
                    <p>{this.props.text}</p>

                </div>

            );
        }else{
            return (
                <div className="loadingContainer">

                    <p>{this.props.text}</p>

                </div>

            );
        }

    }
}

export default Loading;