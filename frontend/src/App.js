import React from "react";
import "./App.css";
import Header from "./Component/layout/Header/Header.jsx";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import 'react-icons/all'
import webFont from "webfontloader";
import Footer from "./Component/layout/Footer/Footer";
import Home from "./Component/Home/Home.jsx";
import ProductDetails from "./Component/Product/ProductDetails.jsx";
import Products from "./Component/Product/Products";
import Search from "./Component/Product/Search";
import SignInOut from "./Component/User/SignInOut";

import store from './store';
import { loadUser } from "./Actions/userActions";
import { useSelector } from "react-redux";
import UserOptions from "./Component/layout/Header/UserOptions";
import Profile from "./Component/User/Profile";
import ProtectedRoute from "./Component/Routes/ProtectedRoute";
import UpdateProfile from "./Component/User/UpdateProfile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPassword from "./Component/User/ForgotPassword";

function App() {
  
  const {isAuthenticated, user} = useSelector(state => state.user)
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Fredoka", "Roboto", "Merriweather"],
      },
    });
    
    store.dispatch(loadUser());
  }, []);
  return (
    <>

      <Router>
        <Header />
        
        {isAuthenticated && <UserOptions user={user}/>}
        <Routes>

        <Route exact path='/' element={<Home/>} />
        <Route exact path='/product/:id' element={<ProductDetails/>} />
        <Route exact path='/products' element={<Products/>} />
        <Route path='/products/:keyword' element={<Products/>} />
        <Route exact path='/search' element={<Search/>} />
        <Route exact path='/login' element={<SignInOut/>} />
        <Route exact path='/password/forgot' element={<ForgotPassword/>} />
        <Route exact path='/account' element={<ProtectedRoute Component={Profile}/>} />
        <Route exact path='/me/update' element={<ProtectedRoute Component={UpdateProfile}/>} />
        <Route exact path='/password/update' element={<ProtectedRoute Component={UpdatePassword}/>} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
