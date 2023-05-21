import React from 'react';
import Card from '../Card/Card';
import Cart from '../Cart/Cart';

function ProductList({ foods, cartItems, onCheckout, onAdd, onRemove }) {
        return (
                <div>
                        <h1 className="heading">Order Food</h1>
                        <Cart cartItems={cartItems} onCheckout={onCheckout} />
                        <div className="cards__container">
                                {foods.map((food) => {
                                        return (
                                                <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
                                        );
                                })}
                        </div>
                </div>
        )
}

export default ProductList