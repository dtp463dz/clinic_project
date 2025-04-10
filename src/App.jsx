import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header/Header.jsx'
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <div>
          test Link
          <div>
            <button >
              <Link to="/users">Go to user page</Link>
            </button>
            <button >
              <Link to="/admin">Go to admin page</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
