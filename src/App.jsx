import React from 'react'
import { RouterProvider } from "react-router-dom";

import './index.css';
import './App.css'
import Router from './components/Router';


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
  
  return (
    <div className="App">
        <RouterProvider router={Router} />
    </div>
  );
}

export default App;
