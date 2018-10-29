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

  showFirst(id, index) {
    console.log("huhuhuhu" + index);
    this.setState({
      activeId: id,
      display: index
    });
    console.log(this.state.display);
  }



  close() {
    this.setState({
      activeId: "",
      display: 99
      
    });
  }

  render() {
    const data = this.props.data.map(data => {
      if(this.props.contentFields.length > 2){
        return (
          <tr key={data[0]} className="tr-admin-get-all">
            <td
              className="td-admin-get-all"
              onClick={() => this.showFirst(data[0], 0)}
            >
              {data[1]}{" "}
            </td>
  
            <td
              className="td-admin-get-all"
              key={data[2]}
              onClick={() => this.showFirst(data[2], 1)}
            >
              {data[3]}{" "}
            </td>

             <td
              className="td-admin-get-all"
              key={data[4]}
              onClick={() => this.showFirst(data[4], 2)}
            >
              {data[6]}{" "}
            </td>
          </tr>
        );
    x
      }
      return (
        <tr key={data[0]} className="tr-admin-get-all">
          <td
            className="td-admin-get-all"
            onClick={() => this.showFirst(data[0], 0)}
          >
            {data[1]}{" "}
          </td>

          <td
            className="td-admin-get-all"
            key={data[2]}
            onClick={() => this.showFirst(data[2], 1)}
          >
            {data[3]}{" "}
          </td>
        </tr>
      );
    });

    const fields = this.props.contentFields.map(function(field, index)  {
      console.log(index + " INDEX");
      console.log("DATA: " + data[index * 2]);
      return (
       
          <th 
            key={index}
            className="th-admin-get-all"
            onClick={() => this.showFirst(data[index * 2], index)}
          >
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
    }else if (this.state.display === 2) {
       
      return (
        <div>
          <GatewayInfo
            id={this.state.activeId}
            close={this.close}
            content={this.props.content[2]}
          />
        </div>
      );
    }
     else {
      return (
        <div>
          <h1>{this.props.content[0]}</h1>
          <div className="div-admin-get-all">
            <table className="table-admin-get-all">
              <tbody>
              <tr key='Attr' className="tr-admin-get-all">
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
