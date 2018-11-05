import React, { Component } from "react";
import GatewayInfo from "./GatewayInfo";

class ListInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      display: 99,
      userId: ""
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

 

  render() {
    /* Code for checking wether even values are number/id, pretty weak as for now as it just checks one row ahead for a number value */
    
    const data = this.props.data.map(data => {
      var i = 0;

      while (data[i] !== undefined) {
        if (i % 2 === 0) {
          if (typeof data[i] === "string" || data[i] === null) {
            if(data[i+1] == undefined) {
              data[i+1] = data[i];
              break;
            }
            for(var j = 0; j < 5; j++){
              data[i+j] = data[i + j + 1];
            }
          }
        }
        i++;
      }

      /* Creating columns with rows */

      const columns = [];

      for (var i = 0; i < this.props.contentFields.length; i++) {
        let id = data[i * 2];
        let action = i;

        columns.push(
          <td
            key={data[i * 2 + 1]}
            className="td-admin-get-all"
            onClick={() => this.showFirst(id, action)}
          >
            {data[i * 2 + 1]}{" "}
          </td>
        );
      }

      /* Assining each row from each column in tr tag */

      for (var k = 0; k < this.props.contentFields.length; k++) {
        return (
          <tr key={data[k * k]} className="tr-admin-get-all">
            {columns}
          </tr>
        );
      }
    });

    /* Assigning header values */

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
      return (
        <div>
          <GatewayInfo
            id={this.state.activeId}
            close={this.close}
            content={this.props.content[0]}
            canEdit={this.props.canEdit}
            userId={this.props.userId}
            edit={this.props.edit}
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
            canEdit={this.props.canEdit}
            userId={this.props.userId}

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
            canEdit={this.props.canEdit}

            
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
            <h2>Page {this.props.currentPage + 1}</h2>
          </div>
          
        </div>
      );
    }
  }
}

export default ListInfo;
