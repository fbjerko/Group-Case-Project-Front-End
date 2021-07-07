import React from "react";

function getMatchInfo(){
  const Http = new XMLHttpRequest();
  const url=process.env.API_URL+"/api/match";
  Http.open("GET", url);
  Http.withCredentials=true;
    Http.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
  Http.send();
  Http.onreadystatechange=(e)=>{
  console.log(Http.responseText)

  var matchInfo = Http.responseText;

  return JSON.stringify(matchInfo);

  
  }


}

const MatchInfo = () => (
  <div className="showMatchInfo">
    <p>{getMatchInfo}</p> 
  </div>
);

export default MatchInfo;