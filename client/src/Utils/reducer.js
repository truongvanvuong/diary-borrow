export const initialState = {
  action: "",
  title: "",
  btnText: "",
  data: {},
  id: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        action: action.type,
        title: action.payload.title,
        btnText: action.payload.btnText,
        data: {},
        id: "",
      };
    case "update":
      return {
        ...state,
        action: action.type,
        title: action.payload.title,
        btnText: action.payload.btnText,
        data: action.payload.data,
        id: action.payload.id,
      };
    default:
      return state;
  }
};
