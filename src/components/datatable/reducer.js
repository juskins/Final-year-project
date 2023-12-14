export function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, data: action.payload };
    case "SET_MODAL":
      return { ...state, modalOpen: action.payload };
    case "DELETE_PRODUCT":
      const { data } = state;
      const id = action.payload;
      const itemsLeft = data.filter((item) => item.id !== id);
      return { ...state, data: itemsLeft , productToDelete: action.payload };
    case "HANDLE_EDIT_PRODUCT":
      return { ...state,productToDelete:false, productToEdit: action.payload };
    case "EDIT_PRODUCT": {
      const index = state.data.findIndex((p) => p.id === action.payload.id);
      if (index === -1) {
        // If the product with the specified ID is not found, give error
        throw new Error(`index not found`);
      }
      const newData = [...state.data];
      newData.splice(index, 1, action.payload); // Replace the product at the specified index
      return { ...state, data: newData };
    }
    case "ADD_PRODUCT":
      return { ...state, data: [...state.data, action.payload] };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
}
