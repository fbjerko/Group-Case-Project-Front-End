import React, {Component} from 'react';
import SearchField from "../admin-create/SearchField";
import Popupp from "../popupp";
import Loading from "../buttons/loading";
import i18n from "../../i18n"

class PlayersForm extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"Nothing",
            showPop:false,
            number:'',
            position:"",
            edit:this.props.edit,
            method:this.switchMethods(this.props.edit),
            playerInfo: [],
            teamId:-1,
            personId:-1,
            ready:false,
            playerId:-1,
            loading:null,
            lng:i18n.language
        }
        this.switchMethods(this.props.edit);

    }

    componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged)
        
        }
        onLanguageChanged = (lng)=>{
        this.setState({lng:lng});
        }


    updateInput = (event)=>{
        if(event.target.id=="position"){
            this.setState({position:event.target.value});
        }else if(event.target.id=="number"){
            this.setState({number:event.target.value});
        }
    }
    updateSearchFieldPerson = (id)=>{
        this.setState({personId:id});
    }
    updateSearchFieldTeam = (id)=>{
        this.setState({teamId:id});
    }

    switchMethods = (edit)=>{
        let method = '';
        switch(edit) {
            case 'edit':
                method = "PUT";

                break;
            case 'create':
                method = "POST";
                break;
        }
        return method;
    }

    async componentWillMount() {
        if(this.state.edit == 'edit'){
            try {
                const response = await fetch(
                    process.env.API_URL+"/api/player/" + this.props.id
                );
                const json = await response.json();

                this.setState({
                  playerInfo: json,
                });
              } catch (error) {
                console.log(error);
              }
              const player = this.state.playerInfo;

              this.setState({
                  playerId:player.playerId,
                number: player.number,
                position: player.normalPosition,
                teamId: player.team.teamId,
                personId: player.person.personId,
                  ready:true
              });
        }else{
            this.setState({ready:true})
        }
     
       

      }



    sendPlayer = ()=>{
        this.setState({loading:<Loading icon={true} text={"Creating address..."}/>});
        let xhttp = new XMLHttpRequest();

        xhttp.open(this.state.method,  process.env.API_URL+"/api/player", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                playerId:this.state.playerId,
                teamId: this.state.teamId,
                personId:this.state.personId,
                normalPosition:this.state.position,
                number:this.state.number
            })
        );
        xhttp.onreadystatechange = ()=>{

            if (xhttp.readyState == XMLHttpRequest.DONE) {
                if(xhttp.status==200){

                    this.setState({status:"Created",loading:<Loading icon={false} text={"Successfull "+this.props.edit}/>});
                    setTimeout(()=>window.location.reload(), 1000);

                }else if (xhttp.status==403){


                    this.setState({status:"Failed to create",loading:<Loading icon={false} text={"Failed to "+this.props.edit}/>});
                }


            }
        }
    }

    render(){
        let lng = this.state.lng;
        if(this.state.ready){


            return(
                <div className="info-container">

                    <div className="seasons-container">
                        {this.state.loading}
                        <div className="top">
                            <h2>{i18n.t("PLAYER",{lng})  +' '+ i18n.t("INFO",{lng})}</h2>
                        </div>
                        <p>{i18n.t("PERSON",{lng})} </p>
                        <SearchField type={'person'} id={this.state.personId} handleChange={this.updateSearchFieldPerson}/>
                        <br></br>
                        <br></br>
                        <p>{i18n.t("NUMBER",{lng})}</p>
                        <input onChange={this.updateInput} value={this.state.number} type="text" placeholder="Write a number:" id="number" />
                        <br></br>
                        <br></br>
                        <p>{i18n.t("POSITION",{lng})}</p>
                        <input onChange={this.updateInput} value={this.state.position} type="text" placeholder="Write a position" id="position" />
                        <br></br>
                        <br></br>
                        <p>{i18n.t("TEAM",{lng})}</p>
                        <SearchField type={'team'} id={this.state.teamId} handleChange={this.updateSearchFieldTeam} value={this.state.teamId}/>
                        <br></br>
                        <br></br>
                        <input className="btn-index" type="button" value={i18n.t("SUBMIT",{lng})} onClick={this.sendPlayer}></input>
                    </div>

                </div>
            );
        }else{
            return(
                <div>
                    <Loading icon={true} text={"Loading player form..."}/>
                </div>
            );
        }



    }
}

export default PlayersForm;