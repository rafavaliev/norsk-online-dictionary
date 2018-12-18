import { combineReducers } from "redux";

import dictionary from "./DictionaryReducer";
import search from "./SearchReducer";

export default combineReducers({
  dictionary,
  search
});
