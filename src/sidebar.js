import React from "react";
import { slide as Menu } from "react-burger-menu";
import DarkModeToggle from './DarkModeToggle';

export default props => {
  return (
    <Menu {...props}>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/impressum">
        Impressum
      </a>

      <DarkModeToggle />
    </Menu>
  );
};