import React from "react";
import { useState } from "react";
import ScoreBoard from "./ScoreBoard";


const Header = () => {
  const [ scoreDisplay, setScoreDisplay ] = useState(0);
    return (
      <header className="header">
        <div className="desktop-header">
          <nav className="nav-component">
            <ul>
              <li>
                <a className="log-in">Log in</a>
              </li>
              <li>
                <a className="sign-up">Sign up</a>
              </li>
              <li>
                <a className="log-out">Log out</a>
              </li>
              <li>
                <a className="best-score">Best scores</a>
              </li>
            </ul>
          </nav>
          <div className="main-component">
            <div className="logo">
              <img className="logo-image" src='/mang-logo.png'/>
            <div className="score-box">
            <ScoreBoard score={scoreDisplay} />
            </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

export default Header;