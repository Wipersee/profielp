import { combineReducers } from "redux";
import testReducer from "./testReducer";
const rootReducer = combineReducers({
  //here would be reducers
  test: testReducer,
});

export default rootReducer;
