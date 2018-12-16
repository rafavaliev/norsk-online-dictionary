import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="nagivation">
        <div className="container">
          <div className="navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Translate</Link>
              </li>
              <li>
                <Link to="/dictionary">My words</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
