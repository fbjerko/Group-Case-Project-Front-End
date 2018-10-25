import React, {Component} from 'react';

class SearchField extends Component {

    constructor(props){
        super(props);
        this.state={
            type:this.props.type,
            searchField:'',
            searchResult:[],
            url:this.chooseUrl(this.props.type)
        }

        this.chooseUrl(this.props.type);
    }

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
        }
        return url;
    };

    render() {
        return (
            <div>
                <h2>Search</h2>
                <input />
            </div>
        );
    }
}

export default SearchField;