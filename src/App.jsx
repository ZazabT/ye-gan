import './App.css'
import { Route , Routes } from 'react-router-dom'
import Login from './views/auth/Login'
import Home from './views/Home'
import AddListing from './views/AddListing'
import Register from './views/auth/Register'
import AddHostInfo from './views/profile/AddHostInfo'

function App() {
  return (
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/login' element= {<Login/>} />
       <Route path='/register' element= {<Register/>} />
       <Route path='/add-listing' element= {<AddListing/>} />
       <Route path='/add-host-info' element= {<AddHostInfo/>} />
    </Routes>
  )
}

export default App
