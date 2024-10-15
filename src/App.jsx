import './App.css'
import { Route , Routes } from 'react-router-dom'
import Login from './views/auth/Login'
import Home from './views/Home'
import AddListing from './views/AddListing'
import Register from './views/auth/Register'

function App() {
  return (
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/login' element= {<Login/>} />
       <Route path='/register' element= {<Register/>} />
       <Route path='/add-listing' element= {<AddListing/>} />
    </Routes>
  )
}

export default App
