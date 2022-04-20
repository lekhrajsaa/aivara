import { combineReducers } from "redux";
import { user } from "./dataReducer";

const reducers = combineReducers({
    userdata:user
})

export default reducers;