import React, {Component} from 'react';


class Loading extends Component {
    constructor(){
        super();
        this.state={
            show:true
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({show:true});
        setTimeout(()=>this.setState({show:false}),2000);
    }


    componentDidMount(){
        setTimeout(()=>this.setState({show:false}),2000);
    }

    render() {
        if(this.state.show==true){
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
        }else{
            return(<div>

            </div>);

        }


    }
}

export default Loading;