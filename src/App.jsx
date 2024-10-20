import './App.css'
import { Route , Routes } from 'react-router-dom'
import Login from './views/auth/Login'
import Home from './views/Home'
import Register from './views/auth/Register'
import AddHostInfo from './views/profile/AddHostInfo'
import Addlisting from './views/addlistings/Addlisting'
import ListingDetail from './components/listing/listingDetail/ListingDetail'

function App() {
  return (
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/login' element= {<Login/>} />
       <Route path='/register' element= {<Register/>} />
       <Route path='/add-listing' element= {<Addlisting/>} />
       <Route path='/add-host-info' element= {<AddHostInfo/>} />
       <Route path='/listing/:id' element= {<ListingDetail/>} />
    </Routes>
  )
}

export default App
