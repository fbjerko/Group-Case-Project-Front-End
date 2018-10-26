import React, {Component} from 'react';

class SearchField extends Component {

    constructor(props){
        super(props);
        this.state={
            type:this.props.type,
            search:'',
            data:[],
            filteredData:[],
            url:this.chooseUrl(this.props.type),
            active:false,
            id:-1

        }

        this.chooseUrl(this.props.type);
        this.getData=this.getData.bind(this);

    }
    getData(){

        fetch(this.state.url).then(
            (res)=>res.json().then(
                (res)=>{
                    if(res.length>0){
                        let data =[];

                        for(let dataElement of res){
                            data.push({
                                id:dataElement[0],
                                name:dataElement[1]
                            });
                        }
                        console.log("Data loaded");
                        this.setState({data:data,filteredData:data});

                    }

                }

            ));



    };
    chooseUrl = (type)=>{
        let url = '';
        switch (type) {
            case 'address':
                url = 'http://localhost:5000/api/address/all';
                break;
            case 'season':
                url = 'http://localhost:5000/api/season/all';
                break;
            case 'location':
                url = 'http://localhost:5000/api/location/all';
                break;
            case 'team':
                url = 'http://localhost:5000/api/team/all';
                break;
            case 'player':
                url = 'http://localhost:5000/api/player/all';
                break;
            case 'person':
                url = 'http://localhost:5000/api/person/all';
                break;
            case 'association':
                url = 'http://localhost:5000/api/association/all';
                break;
            case 'coach':
                url = 'http://localhost:5000/api/coach/all';
                break;
            case 'owner':
                url = 'http://localhost:5000/api/owner/all';
                break;
        }
        return url;
    };
    updateSearch = (event)=>{
        this.setState({search: event.target.value.substr(0,20)});
        this.setState({id:-1});


    };
    componentDidMount(){
        this.getData();
    };
    handleClick = (event)=>{
        this.setState({search:event.target.value,id:event.target.id,active:false});
        this.props.handleChange(event.target.id);
    };

    styles={
        width:200
    }

    getId=()=>{
        return this.state.id;
    }


    activate = ()=>{


            this.setState({active:!this.state.active});




    }
    disable = ()=>{
        this.setState({active:!this.state.active});
        this.props.handleChange(this.state.id);
    }


    render() {


        let filteredData = this.state.data.filter((element)=>{

            return element.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        let searchResult=filteredData.map((element)=>{
            return <option onDoubleClick={this.handleClick} key={element.id} id={element.id} value={element.name}>{element.name}</option>;
        });


        if(this.state.active){
            return (
                <div >

                    <input style={this.styles} value={this.state.search} placeholder={'Search for '+this.state.type} onChange={this.updateSearch}/>
                    <br></br>
                        <select onBlur={this.disable} size={filteredData.length>10?10:filteredData.length+1} style={this.styles} >
                            {searchResult}</select>


                </div>
            );
        }else{
            return (
                <div>
                    <input  onFocus={this.activate} style={this.styles} value={this.state.search} placeholder={'Search for '+this.state.type} onChange={this.updateSearch}/>
                </div>
            );
        }




    }
}

export default SearchField;