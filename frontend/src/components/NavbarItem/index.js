import React from "react";

const NavbarItem = ({ href, label, render, ...props }) => {
  return (
    <>
      {(render && (
        <li className="nav-item">
          <a onClick={props.onClick} className="nav-link" href={href}>
            {label}
          </a>
        </li>
      )) ||
        false}
    </>
  );
};

export default NavbarItem;
