import React from "react";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
      <div className="container">
        <div className="navbar-brand">
          <a href="/" className="nav-link">
            Social Network for Developers
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/project/list" className="nav-link">
                Project
              </a>
            </li>
            <li className="nav-item">
              <a href="/study/list" className="nav-link">
                Study
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
