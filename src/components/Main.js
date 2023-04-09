import "./Main.css";
import React from "react";
import { Link } from "react-router-dom";

function Main(props) {
  return (
    <div>
      <div className="main-container">
        <h1>Haydi müthiş pizzalarımızı tadın.</h1>
        <p>
          Acıktıysanız ve yiyecek değişik birşey arıyorsunuz doğru yerdesiniz.
          <strong>Lütfen çeşitlerimize bir göz atın.</strong>
        </p>
        <br />
        <button className="order-button">
          <Link to="/OrderForm" className="hungry">
            ACIKTIM!
          </Link>
        </button>
        <img src="https://thumbs.dreamstime.com/b/pizza-rustic-italian-mozzarella-cheese-basil-leaves-35669930.jpg" />
      </div>
    </div>
  );
}

export default Main;
