export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const addItemsToCart = (cartItems, firebaseCartItems) => {
  let newCart = firebaseCartItems;

  cartItems.forEach((cartItem) => {
    const existingFirebaseItem = firebaseCartItems.find(
      (firebaseCartItem) => firebaseCartItem.id === cartItem.id
    );

    if (existingFirebaseItem) {
      newCart.forEach((newCartItem) => {
        if (newCartItem.id === cartItem.id) {
          newCartItem.quantity += cartItem.quantity;
        }
      });
    } else {
      newCart.push(cartItem);
    }
  });

  return newCart;
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
