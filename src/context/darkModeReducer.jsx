const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT": {
      return {
        darkMode: false,
      };
    }
    case "DARK": {
      return {
        darkMode: true,
      };
    }
    case "TOGGLE": {
      return {
        darkMode: !state.darkMode,
      };
    }
    case "FETCH_PRODUCTS_START": {
      return {
        ...state,
        productsLoading: true,
        productsError: { val: false, msg: "" },
      };
    }
    case "FETCH_PRODUCTS_SUCCESS": {
  return {
    ...state,
    productsLoading: false,
    productsError: { val: false, msg: "" },
    allProducts: action.payload
  };
}

    case "FETCH_PRODUCTS_ERROR": {
      return {
        ...state,
        productsLoading: false,
        productsError: { val: true, msg: action.payload },
        allProducts: [],
      };
    }
    default:
      return state;
  }
};

export default DarkModeReducer;
