import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <ul class="nav m-1">
          <li class="nav-item m-1">
            <Link to="/">Translate</Link>
          </li>
          <li class="nav-item m-1">
            <Link to="/dictionary">My words</Link>
          </li>
          <li class="nav-item m-1">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
