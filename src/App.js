import React, { useState } from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import Main from "./components/Main";
import OrderForm from "./components/OrderForm";
import Success from "./components/Success";

export default function App() {
  const [pizzas, setPizzas] = useState([]);

  function addPizza(newPizza) {
    setPizzas([...pizzas, newPizza]);
  }

  return (
    <div className="App">
      <div className="content">
        <header>
          <h2>Teknolojik Yemekler</h2>
          <nav className="nav">
            <button>
              <NavLink activeClassName="active" exact to="/">
                Anasayfa
              </NavLink>
            </button>
            <br></br>
            <button>
              <NavLink
                activeClassName="active"
                className="order"
                to="/OrderForm"
              >
                Sipariş Oluştur
              </NavLink>
            </button>
          </nav>
        </header>
        <div className="content-container">
          <h1>Teknolojik Yemekler</h1>
          <Switch>
            <Route exact path="/" component={Main}>
              <section className="main">
                {" "}
                <Main />
              </section>
            </Route>
            <Route path="/OrderForm" component={OrderForm}>
              <section className="orderForm">
                {" "}
                <OrderForm addPizza={addPizza} />
              </section>
            </Route>
            <Route path="/Success" component={Success}>
              <section className="success">
                {" "}
                <Success />
              </section>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
