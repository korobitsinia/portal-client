const initialState = {
  responses: [],
};

const responseLog = (state = initialState, action) => {
  switch (action.type) {
    case "RESPONSE_LOG_ADD":
      let withNewResponse = [...state.responses, action.payload];
      return { ...state, responses: withNewResponse };
    default:
      return state;
  }
};

export default responseLog;
