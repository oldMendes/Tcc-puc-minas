import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import Routes from "./routes";
import "../custom.css";
import NavBar from "../components/NavBar";
import ProvedorAutenticao from "./provedorAutenticacao";
export const App = () => {
  return (
    <>
      <ProvedorAutenticao>
        <NavBar />
        <div className="container">
          <Routes />
        </div>
      </ProvedorAutenticao>
    </>
  );
};

export default App;
