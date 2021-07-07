import React from "react";
import Head from "next/head";
import i18n from "../i18n";




class LayoutGlobal extends React.Component{
  constructor(props){
    super(props);

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
                  <link
                      rel="stylesheet"
                      type="text/css"
                      href="/static/style/navbar.css"
                  />

                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
              </Head>

              {this.props.children}




          </div>
      )
    }
}




export default LayoutGlobal;
