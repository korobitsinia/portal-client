import {combineReducers} from "redux";

import phonebook from "./phonebook/reducer"
import authentication from './authentication/reducer'
import responseLog from "./responseLog/reducer";

const rootReducer = combineReducers({phonebook, authentication,responseLog})

export default rootReducer