const initialState = {
  bookList: {
    books: [],
    isLoading: true,
    error: null,
  },

  shoppingCart: {
    cartItems: [],
    orderTotal: 0
  }
}

const updateCartItems = (cartItems, item, idx) => {
  if (idx === -1) {
    return [
      ...cartItems, item
    ]
  }

  if (!item.count) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1),
    ]
  }


  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ]
};

const updateCartItem = (book, item = {}, quantity) => {

  const {
    id = book.id, 
    title = book.title, 
    count = 0, 
    total = 0
  } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  }
}

const updateOrder = (state, bookId, quantity) => {
  const {books, cartItems} = state;

  const book = books.find(({id}) => id === bookId);
  const itemIndex = cartItems.findIndex(({id}) => id === bookId);
  const item = cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quantity);
  return {
    ...state,
    cartItems:  updateCartItems(cartItems, newItem, itemIndex)
  }
}

const updateBooklist = (state, action) => {
  
}

const updateShoppingCart = (state, action) => {

}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case `FETCH_BOOKS_REQUEST`:
      return {
        ...state,
        books: [],
        isLoading: true,
        error: null
      }
    case `FETCH_BOOKS_SUCCESS`:
      return {
        ...state,
        books: action.payload,
        isLoading: false,
        error: null
      }
    case `FETCH_BOOKS_FAILURE`:
      return {
        ...state,
        books: [],
        isLoading: false,
        error: action.payload
      }
    case `BOOK_ADDED_TO_CART`:
      return updateOrder(state, action.payload, 1);

    case `BOOK_DELETED_FROM_CART`:
      const item = state.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.count)

    case `BOOK_DECREASED_FROM_CART`:
      return updateOrder(state, action.payload, -1);
    
    default:
      return state;
  }
};

export default reducer;