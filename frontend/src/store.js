import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./Reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./Reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails:productDetailReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
