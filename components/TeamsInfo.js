import React from "react";

function getTeams(){
  const Http = new XMLHttpRequest();
  const url='http://localhost:5000/api/teams/all';
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange=(e)=>{
  console.log(Http.responseText)

  var teamInfo = Http.responseText;

  return JSON.stringify(teamInfo);


  }


}

const TeamsInfo = () => (
  <div className="showTeams">
    <p>{getTeams}</p> 
  </div>
);

export default TeamsInfo;