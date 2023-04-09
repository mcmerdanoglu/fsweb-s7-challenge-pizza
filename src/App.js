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
            <NavLink activeClassName="active" exact to="/">
              Anasayfa
            </NavLink>
            <br></br>
            <NavLink activeClassName="active" to="/OrderForm">
              Sipariş Ver
            </NavLink>
          </nav>
        </header>
        <main>
          <h1>Teknolojik Yemekler</h1>
          <Switch>
            <Route exact path="/" component={Main}>
              <section className="main">
                {" "}
                <Main />
                Anasayfa
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
        </main>
      </div>
    </div>
  );
}
