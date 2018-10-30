import React, {Component} from 'react';
import SearchField from "../admin-create/SearchField";
import Popupp from "../popupp";

class PlayersForm extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"Nothing",
            showPop:false,
            number:-1,
            position:"",
            teamId:-1,
            personId:-1
        }
    }


    updateInput = (event)=>{
        if(event.target.id=="position"){
            this.setState({position:this.target.value});
        }else if(event.target.id=="number"){
            this.setState({number:this.target.value});
        }
    }

    render(){
        if(this.state.showPop){
            return(<Popupp text={this.state.status}/>);
        }

        return(
            <div className="info-container">

                <div className="seasons-container">
                    <div className="top">
                        <h2>Create new person</h2>
                    </div>
                    <p>Person </p>
                    <SearchField type={'person'} handleChange={this.updateSearchFieldPerson}/>
                    <br></br>
                    <br></br>
                    <p>Number</p>
                    <input onChange={this.updateInput} value={this.state.number} type="text" placeholder="Write a number:" id="number" />
                    <br></br>
                    <br></br>
                    <p>Position</p>
                    <input onChange={this.updateInput} value={this.state.postion} type="text" placeholder="Write a position" id="position" />
                    <br></br>
                    <br></br>
                    <p>Team</p>
                    <SearchField type={'team'} handleChange={this.updateSearchFieldTeam}/>
                    <br></br>
                    <br></br>
                    <input className="btn-index" type="button" value="Submit" onClick={this.sendPlayer}></input>
                </div>

            </div>
        );

    }
}

export default PlayersForm;