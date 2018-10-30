import React, { Component } from "react";

import GatewayInfo from "./GatewayInfo";

class ListInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      display: 99
    };

    this.showFirst = this.showFirst.bind(this);

    this.close = this.close.bind(this);
  }

  showFirst(id, action) {
    this.setState({
      activeId: id,
      display: action
    });
  
  }

  close() {
    this.setState({
      activeId: "",
      display: 99
    });
  }

  componentDidUpdate() {
    
  }

  render() {
 
    /* Code for checking wether even values are number/id, pretty weak as for now as it just checks one row ahead for a number value */

    const data = this.props.data.map(data => {
    
        var i=0;

      while (data[i] !== undefined) {
        
        if (i % 2 === 0) {
          if (typeof data[i] === "string") {
           
            data[i-1] = data[i];
          }
        }
        i++;
    }

    const columns = [];
  
    for(var i = 0; i<this.props.contentFields.length; i++) {

      let id = data[i*2];
      let action = i;
      
     console.log(id + " ID");
        columns.push(
          <td
            key={data[i*2+1]}
            className="td-admin-get-all"
            onClick={() => this.showFirst(id, action )}
          >
            {data[i*2+1]}{" "}
          </td>
        );
 
    };

    for(var k = 0; k<this.props.contentFields.length; k++) {

      return(
     
      <tr key={data[k*k]} className="tr-admin-get-all">
      
          {columns}
      </tr>
    );
    }
  });

    const fields = this.props.contentFields.map(function(field) {
      return (
        <th key={field} className="th-admin-get-all">
          {field}{" "}
        </th>
      );
    });


    if (this.props.ready === false) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else if (this.state.display === 0) {
      console.log(this.state.display + " DISPLAY")
      return (
        <div>
          <GatewayInfo
            id={this.state.activeId}
            close={this.close}
            content={this.props.content[0]}
          />
        </div>
      );
    } else if (this.state.display === 1) {
      return (
        <div>
          <GatewayInfo
            id={this.state.activeId}
            close={this.close}
            content={this.props.content[1]}
          />
        </div>
      );
    } else if (this.state.display === 2) {
      return (
        <div>
          <GatewayInfo
            id={this.state.activeId}
            close={this.close}
            content={this.props.content[2]}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h1>{this.props.content[0]}</h1>
          <div className="div-admin-get-all">
            <table className="table-admin-get-all">
              <tbody>
                <tr key="Attr" className="tr-admin-get-all">
                  {fields}
                </tr>

                {data}
              </tbody>
            </table>

            <table className="table-admin-but">
              <tbody>
                <tr>
                  <td className="td-admin-but" onClick={this.props.firstPage}>
                    First Page
                  </td>
                  <td
                    className="td-admin-but"
                    onClick={this.props.previousPage}
                  >
                    Previous Page
                  </td>
                  <td className="td-admin-but" onClick={this.props.nextPage}>
                    Next Page
                  </td>
                  <td className="td-admin-but" onClick={this.props.lastPage}>
                    Last Page
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default ListInfo;

/*


 onClick={this.showFirst}
   



     
      */
