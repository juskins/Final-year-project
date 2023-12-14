export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "LOAD_DATA":
      return { ...state, ...action.payload };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
