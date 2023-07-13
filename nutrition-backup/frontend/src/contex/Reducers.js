

export const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
  }

  if (action.type === "REMOVE_FROM_CART") {
    return {
      ...state,
      cart: state.cart.filter((c) => c.id !== action.payload.id),
    };
  }


  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((product) => {
      if (product.id === action.payload) {
        let decQty = product.qty - 1;

        if (decQty <= 1) {
          decQty = 1;
        }

        return {
          ...product,
          qty: decQty,
        };
      } else {
        return product;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  // case "SET_INCREMENT":

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((product) => {
      if (product.id === action.payload) {
        let incQty = product.qty + 1;

        if (incQty >= 5) {
          incQty = 5;
        }

        return {
          ...product,
          qty: incQty,
        };
      } else {
        return product;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }



};

