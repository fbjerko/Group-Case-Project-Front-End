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
        </Head>

        <img src="../static/images/logo.png" alt="" className="logo"/>

        </div>
    );
};