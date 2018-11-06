import React from "react";
import Head from "next/head";
import i18n from "../i18n";

i18n.changeLanguage('en',(err,t)=>{
    console.log(err);
});


class LayoutGlobal extends React.Component{
  constructor(props){
    super(props);
    this.state={
        language:'en'
      }
  }

  changeLanguage = (event)=>{
        console.log(event.target.value);
      this.setState({language:event.target.value});
      i18n.changeLanguage(event.target.value,(err,t)=>{
          if(err==null){

          }else{
              console.log(err);
          }

      })

  }


  render(){

      return (
          <div>
              <Head>
                  <link
                      rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                  />
                  <link
                      rel="stylesheet"
                      type="text/css"
                      href="/static/style/global.css"
                  />
                  <link
                      rel="stylesheet"
                      type="text/css"
                      href="/static/style/admin.css"
                  />

                  <link
                      rel="stylesheet"
                      type="text/css"
                      href="/static/style/index.css"
                  />
                  <link
                      rel="stylesheet"
                      type="text/css"
                      href="/static/style/user.css"
                  />
                  <link
                      rel="stylesheet"
                      type="text/css"
                      href="/static/style/loading.css"
                  />

                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
              </Head>

              <img src="../static/images/logo.png" alt="" className="logo" />
              <button value={'no'} onClick={this.changeLanguage}>Norsk</button>
              <button value={'en'} onClick={this.changeLanguage}>English</button>

              {this.props.children}



          </div>
      )
    }
}




export default LayoutGlobal;
