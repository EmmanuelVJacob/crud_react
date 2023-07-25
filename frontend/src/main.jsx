import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import HomeScreen from "./Screens/HomeScreen.jsx";
import LoginScreen from "./Screens/LoginScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";
import store from "./Store.js";
import { Provider } from "react-redux";
import ProfileScreen from "./Screens/ProfileScreen.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import AdminLogin from './Screens/AdminLogin.jsx'
import AdminDash from './Screens/AdminDash.jsx'
import AdminAddUser from "./Screens/AdminAddUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path="/" element={<HomeScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/register" element={<RegisterScreen/>}/>
      <Route path="" element = {<PrivateRoute/>}>
      <Route path="/profile" element={<ProfileScreen/>}/>
      <Route path="/adminDash" element={<AdminDash/>}/>
      <Route path="/adminDash/AdminAddUser" element={<AdminAddUser/>}/>
      </Route>

      <Route path="/admin" element={<AdminLogin/>}/>
  
    

      
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
);
