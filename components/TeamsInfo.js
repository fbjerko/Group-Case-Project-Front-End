import React from "react";

function getTeams(){
  const Http = new XMLHttpRequest();
  const url=process.env.API_URL+"/api/teams/all";
  Http.open("GET", url);
    Http.setRequestHeader("token","Bearer "+localStorage.getItem("token"));
  Http.withCredentials=true;
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