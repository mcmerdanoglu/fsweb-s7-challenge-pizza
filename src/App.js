import React, { useState } from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import Main from "./components/Main";
import OrderForm from "./components/OrderForm";

export default function App() {
  return (
    <div className="App">
      <div className="content">
        <header>
          <h2>Teknolojik Yemekler</h2>
          <nav>
            <button>
              <NavLink activeClassName="active" exact to="/">
                <p>Anasayfa</p>
              </NavLink>
            </button>
            <br></br>
            <button>
              <NavLink
                activeClassName="active"
                className="order"
                to="/OrderForm"
              >
                <p>Sipariş Ver</p>
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
                <OrderForm />
                Sipariş Ver
              </section>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
