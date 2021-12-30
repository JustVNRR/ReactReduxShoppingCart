import productReducer from "./product.reducer";
import { combineReducers } from 'redux'

import auth from "./auth.reducer";
import message from "./message.reducer";

export default combineReducers({
    productReducer,
    auth,
    message,
})


