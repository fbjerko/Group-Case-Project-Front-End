import { Router } from "../routes";

const NavBar = () => (
  <div>
    <div className="sidenav">
      <a href="#" onClick={() => Router.pushRoute("/admin/users")}>
        Users
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/players")}>
        Players
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/coaches")}>
        Coaches
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/teams")}>
        Teams
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/matches")}>
        Matches
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/stadiums")}>
        Stadiums
      </a>
     
    </div>
  </div>
);

export default NavBar;
