import React, { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// import Vite from './components/Vite'
import Login from './components/pages/Login';
import P404 from './components/pages/P404';
import SignUp from './components/pages/SignUp';
import './index.css';
import './App.css'
import Home from './components/pages/Home';
import { isAuthenticated } from './auth';
import ProtectedRoute from './ProtectedRoute';
import Router from './components/Router';


// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <Login/>,
//       errorElement: <P404/>
//     },
//     {
//       path: "/registro",
//       element: <SignUp/>,
//       errorElement: <P404/>
//     },
//     {
//       path: "/app",
//       element: <Home/>,
//       errorElement: <P404/>
//     },
//     // {
//     //   path: "/change-password",
//     //   element: <ResetPassword/>
//     // },
//     // {
//     //   path: "/password-gallery",
//     //   element: <PasswordGallery/>
//     // },
//     // {
//     //   path: "/dash",
//     //   element: <Dashboard/>
//     // },
//     {
//       path: "/page-not-found",
//       element: <P404/>,
//       errorElement: <P404/>
//     },
//   ]
// );

function App() {
  React.useEffect(() => {
    let pagetitle = document.title;

    window.addEventListener("blur",()=>{
      document.title = "Come back here";
    })
    window.addEventListener("focus",()=>{
      document.title = pagetitle;
    })
    
  }, []);
  

  // return (
  //   <div className="App">
  //     <RouterProvider router={router} />
  //   </div>
  // )
  return (
    <div className="App">
        <RouterProvider router={Router} />
    </div>
  );
}

export default App;
