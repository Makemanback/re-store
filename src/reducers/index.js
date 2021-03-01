import updateBooklist from './book-list';
import updateShoppingCart from './shopping-cart';

const reducer = (state, action) => {
  return {
    bookList: updateBooklist(state, action),
    shoppingCart: updateShoppingCart(state, action)
  }
};

export default reducer;