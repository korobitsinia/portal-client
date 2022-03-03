const initialState = {
  loading: false,
  access: {
    username: "viewer",
    phonebook: 1,
    orders: 0,
    statistics: 0,
    calendar: 0,
    park: 0,
    reserve: 0,
  },
  token: "",
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      let { token, access } = action.payload;
      return {
        ...state,
        token,
        access,
      };

    case "LOGOUT":
      return {
        ...initialState,
      };

    case "AUTH_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return { ...state };
  }
};

export default authentication;
