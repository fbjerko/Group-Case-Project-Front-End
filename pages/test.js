import React,  { Component } from "react";
import LayoutGlobal from "../components/LayoutGlobal";

class TestApi extends Component {

	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      persons: []
    };
  }


	componentDidMount() {
<<<<<<< HEAD
    fetch("http://experisfotballmanager-env.qedd2mt7g3.eu-west-2.elasticbeanstalk.com/api/person")
=======
    fetch("http://localhost:8080/api/person")
>>>>>>> 9b15b1dd9647b44b47f2e2893459b77cde2a5407
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            persons: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

    render() {
    const { error, isLoaded, persons } = this.state;
    if (error) {
      return (
     
        <div>
           <LayoutGlobal/> <h1 >Error: {error.message}</h1>

        
        </div>
       );
    } else if (!isLoaded) {
      return (
      <div>
         <LayoutGlobal/> 
      
dasdsadsa
      
      </div>
      )
      ;
    } else {
      return (
        <div>
        <LayoutGlobal />
        <ul>
          {
            <li key={persons.name}>
              {persons.name} {persons.email}
            </li>
          }
        </ul>
        </div>
      );
    }
  }

}

export default TestApi;