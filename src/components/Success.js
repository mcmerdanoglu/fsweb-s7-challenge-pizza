import React from "react";
import { useHistory } from "react-router-dom";
import "./Success.css";

function Success() {
  const history = useHistory();

  const returnMain = () => {
    history.push("/");
  };
  return (
    <div className="success">
      <div className="congrats">
        TEBRİKLER <br /> SİPARİŞİNİZ ALINDI!
        <br />
        <button className="toMain" onClick={returnMain}>
          ANASAYFAYA DÖN
        </button>
      </div>
    </div>
  );
}

export default Success;
