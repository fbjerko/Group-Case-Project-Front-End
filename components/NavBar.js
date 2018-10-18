
import { Router } from "../routes";

const NavBar = () => (
  <div>
    <div class="sidenav">
      <a href="#" onClick={() => Router.pushRoute("/admin/users")}>
        Users
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/teams")}>
        Teams
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/matches")}>
        Matches
      </a>
      <a href="#" onClick={() => Router.pushRoute("/admin/create")}>
        Create
      </a>
    </div>
  </div>
);

export default NavBar;
