import React, {Component} from 'react';

class SearchField extends Component {

    constructor(props){
        super(props);
        this.state={
            type:this.props.type,
            search:'',
            data:[],
            url:this.chooseUrl(this.props.type)
        }

        this.chooseUrl(this.props.type);
        this.getData=this.getData.bind(this);
    }
    getData(){

        fetch(this.state.url).then(
            (res)=>res.json().then(
                (res)=>{
                    if(res.length>0){
                        let searchResult =[];

                        for(let data of res){
                            searchResult.push({
                                id:data[0],
                                name:data[1]
                            });
                        }
                        console.log("Data loaded");
                        return searchResult;

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
            case 'season':
                url = 'http://localhost:5000/api/season/all';
                break;
            case 'player':
                url = 'http://localhost:5000/api/player/all';
                break;
        }
        return url;
    };
    updateSearch = (event)=>{
        this.setState({search: event.target.value.substr(0,20)});
    };
    componentDidMount(){
        this.getData();
    };


    render() {
        let searchResult=<option key={1}>Hey</option>;
        
        return (
            <div>
                <input className="search" value={this.state.search} placeholder={'Search for '+this.state.type} onChange={this.updateSearch}/>
                <select>{searchResult}</select>
            </div>
        );
    }
}

export default SearchField;