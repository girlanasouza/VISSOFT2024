import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="navbar navbar-dark bg-dark mt-auto">
        <div className="container">
          <p className="text-white mx-auto" style={{ textAlign: "center" }}>
            © 2024 Memory Tracer from <a href="https://swperfi.icomp.ufam.edu.br" className="text-white" target="_blank" rel="noopener noreferrer">SWPERFI Project</a> (BR), partneship between UFAM/IComp and Motorola Mobility. All rights reserved.
          </p>
          <p className="text-white mx-auto" style={{ textAlign: "center" }}>
          Developed by <a href="https://github.com/girlanasouza" className="text-white" target="_blank" rel="noopener noreferrer">Girlana Souza</a>.
          </p>
        </div>
      </footer>
    </>
  );
};
