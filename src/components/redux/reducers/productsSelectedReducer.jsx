const initialState = []; // Array to store selected product IDs

const ProductsSelectedReducer = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case "add":
        if (!state.includes(action.data.id)) {
          return [...state, action.data];
        }
        return state;
      case "remove": {
        return state.filter((state) => {
          return state.id !== action.data.id;
        });
      }
      default:
        return state;
    }
  }
  return state;
};

export default ProductsSelectedReducer;
