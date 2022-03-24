import { combineReducers } from "redux";

import authentication from "./authentication/reducer";
import responseLog from "./responseLog/reducer";
import phonebook from "./phonebook/reducer";
import orders from "./orders/reducer";

const rootReducer = combineReducers({
  phonebook,
  authentication,
  responseLog,
  orders,
});

export default rootReducer;
