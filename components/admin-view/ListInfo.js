import React, { Component } from "react";
import GatewayInfo from "./GatewayInfo";
import i18n from "../../i18n";

class ListInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "",
      display: 99,
      userId: "",
      lng: i18n.language, 
      score: "",
      search: '',
      filteredPlayers: ''
    };

    this.showFirst = this.showFirst.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    i18n.on("languageChanged", this.onLanguageChanged);
  }
  onLanguageChanged = lng => {
    this.setState({ lng: lng });
  };

  async showFirst(id, action, score) {
    if (this.props.canLoad === undefined) {
      await this.setState({
        activeId: id,
        display: action,
        score: score

      });
    }
  }

  close() {
    this.setState({
      activeId: "",
      display: 99
    });
  }

  updateSearch(event){
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    /* Code for checking wether even values are number/id, pretty weak as for now as it just checks one row ahead for a number value */
    const rows = [];
    let lng = this.state.lng;

    let backButton;

    if(this.props.canLoad === undefined) {
      backButton = ( <button
        className="btn-dashboard-back"
        onClick={() => this.props.close("")}
      >
        Back
      </button>);
    } else {
      backButton = (<br/>);
    }

    if(this.props.content.length === 3){
      this.state.filteredPlayers = this.props.data.filter((match) =>{
        
        return match[1].toLowerCase().includes(this.state.search.toLowerCase()) + match[3].toLowerCase().includes(this.state.search.toLowerCase()) +match[5].toLowerCase().includes(this.state.search.toLowerCase());
      });

    } else if(this.props.content.length === 2){
      this.state.filteredPlayers = this.props.data.filter((player) =>{
        return player[1].toLowerCase().includes(this.state.search.toLowerCase()) + player[3].toLowerCase().includes(this.state.search.toLowerCase());
      });
    } else if(this.props.content.length === 1){
      this.state.filteredPlayers = this.props.data.filter((player) =>{
        return player[1].toLowerCase().includes(this.state.search.toLowerCase());
      });
    } else if(this.props.content.length === 5){
      this.state.filteredPlayers = this.props.data.filter((player) =>{
        return player[1].toLowerCase().includes(this.state.search.toLowerCase()) + player[3].toLowerCase().includes(this.state.search.toLowerCase()) + 
        player[5].toLowerCase().includes(this.state.search.toLowerCase()) + player[7].toLowerCase().includes(this.state.search.toLowerCase()) + 
        player[9].toLowerCase().includes(this.state.search.toLowerCase());
      });
    }

    let filtered = this.state.filteredPlayers.slice(
      this.props.currentPage * 10,
      (this.props.currentPage+1) * 10
    );


    filtered.map(data => {
      var i = 0;
      var temp = 0;

      while (data[i] !== undefined) {
        if (i % 2 === 0) {
          if (typeof data[i] === "string" || data[i] === null) {
            if (data[i + 1] == undefined) {
              data[i + 1] = data[i];
              break;
            }
            for (var j = 0; j < 5; j++) {
              data[i + j] = data[i + j + 1];
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

        if (data.length === 2) {
          id = data[i];
          console.log(data[i] + " | " + data[i + 1]);

          columns.push(
            <td
              key={data[i]}
              className="td-admin-get-all-persons"
              onClick={() => this.showFirst(id, action)}
            >
              {data[i+1]}
            </td>
          );
        } else if (this.props.contentFields.length === 5) {
          if (i === 2) {
            let score = data[i * 2 + 1];
            columns.push(
              <td
                key={data[i * 2] + data[3] + i}
                className="td-admin-get-all-matches-result"
                onClick={() => this.showFirst(id, action, score)}
              >
                {data[i * 2 + 1]}
              </td>
            );
          } else {
              
            columns.push(
              <td
                key={data[i * 2] + data[3] + i}
                className="td-admin-get-all-matches"
                onClick={() => this.showFirst(id, action)}
              >
                {data[i * 2+1]}
              </td>
            );
          }
        } else if (this.props.contentFields.length === 3) {
          if (i === 1) {
          
            let score = data[i * 2 + 1];
            columns.push(
              <td
                key={data[i * 2] + data[3] + i}
                className="td-admin-get-all-matches-result"
                onClick={() => this.showFirst(id, action, score)}
              >
                {data[i * 2 + 1]}
              </td>
            );
          } else {
            
            let score = data[i * 2 + 1];
            columns.push(
              <td
                key={data[i * 2] + data[3] + i}
                className="td-admin-get-all-matches-result"
                onClick={() => this.showFirst(id, action, score)}
              >
                {data[i * 2 + 1]} 
              </td>
            );

          }} else {
        
          columns.push(
            <td
              key={data[i * 2] + data[3] + i}
              className="td-admin-get-all"
              onClick={() => this.showFirst(id, action)}
            >
              {data[i * 2+1]}
            </td>
          );
        }
      }

      /* Assining each row from each column in tr tag */

      rows.push(
        <tr key={rows.length} className="tr-admin-get-all">
          {columns}
        </tr>
      );
    });

    /* Assigning header values */

    const fields = this.props.contentFields.map(field => {
      if (this.props.contentFields.length === 5) {
        if (field === "Result") {
          return (
            <th key={field} className="th-admin-get-all-matches-result">
              {field}{" "}
            </th>
          );
        }
        return (
          <th key={field} className="th-admin-get-all-matches">
            {field}{" "}
          </th>
        );
      } else if (this.props.contentFields.length === 3) {
        if (field === "Result") {
          return (
            <th key={field} className="th-admin-get-all-matches-result-smaller">
              {field}{" "}
            </th>
          );
        }
        return (
          <th key={field} className="th-admin-get-all-matches-result-small">
            {field}{" "}
          </th>
        );
      } else {
        return (
          <th key={field} className="th-admin-get-all">
            {field}{" "}
          </th>
        );
      }
    });

    let table;

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
            updateWatchList={this.props.updateWatchList}
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
            updateWatchList={this.props.updateWatchList}
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
            score={this.state.score}
            updateWatchList={this.props.updateWatchList}
          />
        </div>
      );
    } else {
      if (this.props.contentFields.length === 5 && this.state.display === 99) {
        table = (
          <table key="table" className="table-admin-get-all-matches">
            <tbody key="tbody">
              <tr key="Attri" className="tr-admin-get-all">
                {fields}
              </tr>
              {rows}
            </tbody>
          </table>
        );
      } else if (this.props.contentFields.length === 3 && this.state.display === 99) {
        table = (
          <table key="table" className="table-admin-get-all-matches-front-page">
            <tbody key="tbody">
              <tr key="Attri" className="tr-admin-get-all">
                {fields}
              </tr>
              {rows}
            </tbody>
          </table>
        );
        } else if (this.props.contentFields.length === 1 && this.state.display === 99) {
        table = ( <table key="table" className="table-admin-get-all-persons">
        <tbody key="tbody">
          <tr key="Attri" className="tr-admin-get-all">
            {fields}
          </tr>
          {rows}
        </tbody>
      </table>
        );
      } else {

        table = (
          <table key="table" className="table-admin-get-all">
            <tbody key="tbody_1">
              <tr key="Attr" className="tr-admin-get-all">
                {fields}
              </tr>
              {rows}
            </tbody>
          </table>
        );
      }

      if (this.state.display === 0) {
        return (
          <div>
            <GatewayInfo
              id={this.state.activeId}
              close={this.close}
              content={this.props.content[0]}
              canEdit={this.props.canEdit}
              userId={this.props.userId}
              updateWatchList={this.props.updateWatchList}
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
              updateWatchList={this.props.updateWatchList}
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
              score={this.state.score}
              updateWatchList={this.props.updateWatchList}
            />
          </div>
        );
      } else if (this.state.display === 3) {
        return (
          <div>
            <GatewayInfo
              id={this.state.activeId}
              close={this.close}
              content={this.props.content[3]}
              canEdit={this.props.canEdit}
              updateWatchList={this.props.updateWatchList}
            />
          </div>
        );
      } else if (this.state.display === 4) {
        return (
          <div>
            <GatewayInfo
              id={this.state.activeId}
              close={this.close}
              content={this.props.content[4]}
              canEdit={this.props.canEdit}
              updateWatchList={this.props.updateWatchList}
            />
          </div>
        );
      } else {
        return (
          <div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end"}}>
            <h1>{this.props.name}</h1>

            <input style={{height:"32px",margin:"1rem"}} type="text" className="" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search"></input>

            </div>

           
            <div className="div-admin-get-all">
              {table}

              <table className="table-admin-but">
                <tbody>
                  <tr>
                    <td
                      className="td-admin-but"
                      onClick={() => this.props.changePage(0)}
                    >
                      {i18n.t("FIRSTP", { lng }) +
                        " " +
                        i18n.t("PAGE", { lng })}
                    </td>

                    <td
                      className="td-admin-but"
                      onClick={() => this.props.changePage(1)}
                    >
                      {i18n.t("PREV", { lng }) + " " + i18n.t("PAGE", { lng })}
                    </td>
                    <td
                      className="td-admin-but"
                      onClick={() => this.props.changePage(2)}
                    >
                      {i18n.t("NEXT", { lng }) + " " + i18n.t("PAGE", { lng })}
                    </td>
                    <td
                      className="td-admin-but"
                      onClick={() => this.props.changePage(3)}
                    >
                      {i18n.t("LASTP", { lng }) + " " + i18n.t("PAGE", { lng })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2>
                {i18n.t("PAGE", { lng })} {this.props.currentPage + 1}
              </h2>

            </div>
          </div>
        );
      }
    }
  }
}

export default ListInfo;
