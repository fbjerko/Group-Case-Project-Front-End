import React from "react";

function getMatchInfo(){
  const Http = new XMLHttpRequest();
  const url='http://localhost:5000/api/match';
  Http.open("GET", url);
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