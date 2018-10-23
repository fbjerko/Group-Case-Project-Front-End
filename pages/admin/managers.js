import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import IndexReturn from "../../components/IndexReturn";

import AdminReturn from "../../components/AdminReturn";

class Managers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          createCoach: false,
    
        };
    
        this._createCoach = this._createCoach.bind(this);
      }
    
      _createCoach() {
        this.setState({
          createCoach: !this.state.createCoach
        });
    
        console.log(this.state.createCoach + " ");
      }
    
      componentDidMount() {}
    
      render() {
        if (this.state.createCoach === true) {
          return (
            <div>
              <LayoutGlobal />
             
              <div className="container">
                <h1>Coaches</h1>
    
                <div className="btn-admin-create-top">
                  <button className="btn-create" onClick={this._createCoach}>
                    Create
                  </button>
    
                  <button className="btn-create" onClick={this._matches}>
                    Update
                  </button>
    
                  <button className="btn-create" onClick={this._teams}>
                    Delete
                  </button>
                </div>
    
                <div className="btn-admin-create-bottom">
                  <button className="btn-create" onClick={this._createCoach}>
                    Back
                  </button>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <LayoutGlobal />
           
    
              <div className="container">
                <h1>Coaches</h1>
    
                <div className="btn-admin-config">
              <button className="btn-create" onClick={this._createCoach}>
                Configure
              </button>
              <AdminReturn />
            </div>

                <div className="btn-admin-create-bottom">
                <AdminReturn />
                </div>
    
               
    
                {this.state.createCoach ? <CreateUser /> : null}
    
                <IndexReturn />
              </div>
            </div>
          );
        }
      }
}

export default Managers;