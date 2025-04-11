import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import { Outlet } from "react-router-dom";
import './App.scss';

function App() {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />

      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          {/** outlet nested routes 
           * giúp route cha hiển thị route con bên trong nó.
           */}
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default App
