import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form/Form";
import ProductList from "./Components/ProductList/ProductList";

import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from 'react-router-dom';

const { getData } = require("./db/db");
const foods = getData();


function App() {

  const { tg } = useTelegram();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tg.ready();
  });

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  // const onCheckout = () => { };
  const onCheckout = () => {
    tg.MainButton.text = "Pay :)";
    tg.MainButton.show();
  };

  return (
    <>
      <Routes>
        <Route index element={
          <ProductList
            foods={foods}
            onAdd={onAdd}
            onRemove={onRemove}
            onCheckout={onCheckout}
            cartItems={cartItems}
          />
        } />
        <Route path={'/form'} element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
