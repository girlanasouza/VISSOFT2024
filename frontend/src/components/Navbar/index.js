import React from "react";
import "../../styles/styles.css"; 


export const Navbar = () => {
  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <h1 className="text-white">Memory Tracer</h1>
        </div>
      </nav>
    </>
  );
};
