import { Link } from "react-router-dom";
import avatar from "../assets/free-avatar-370-456322.webp";

const Nav = () => {
  return (
    <nav className="titleBar">
      <Link to="/" className="logo">
        IMDB
      </Link>

      <ul className="navBar">
        <div className="img">
          <Link to="/u">
            <img src={avatar} alt="avatar" />
          </Link>
        </div>
        <li>
          <Link to="/movie">AddMovie</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/login">LogIn</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
