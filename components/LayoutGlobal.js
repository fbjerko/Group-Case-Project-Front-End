import React from 'react';
import Head from "next/head";


export default props => {

    return (
        <div>
        <Head>
            <link rel="stylesheet"
          type="text/css"
          href="../static/style/global.css"
          /> 
           <link rel="stylesheet"
          type="text/css"
          href="../static/style/admin.css"
          /> 
           <link rel="stylesheet"
          type="text/css"
          href="../static/style/index.css"
          /> 
            <link rel="stylesheet"
          type="text/css"
          href="../static/style/navbar.css"
          /> 
        </Head>

        <img src="../static/images/logo.png" alt="" className="logo"/>

        </div>
    );
};