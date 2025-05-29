import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Poll from './pages/Poll'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poll/:id" element={<Poll />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/*only for  admin */}
      </Routes>
    </div>
  )
}

export default App
