import './App.css'
import { Route , Routes } from 'react-router-dom'
import Login from './views/auth/Login'
import Home from './views/Home'
import Register from './views/auth/Register'
import AddHostInfo from './views/profile/AddHostInfo'
import Addlisting from './views/addlistings/Addlisting'
import ListingDetail from './components/listing/listingDetail/ListingDetail'
import HostProfile from './views/profile/HostProfile'
import GuestProfile from './views/profile/GuestProfile'
import ListingImage from './components/listing/listingDetail/ListingImage'
import HostListingPage from './views/profile/components/HostProfilePages/HostListingPage'
import HostBookingPage from './views/profile/components/HostProfilePages/HostBookingPage'
import HostBookingDetailsPage from './views/profile/components/HostProfilePages/HostProfileDetailsPage/HostBookingDetailsPage'
import GuestBookingPage from './views/profile/components/GuestProfilePages/GuestBookingPage'
import MessageRoom from './views/messages/MessageRoom';
import MessageHostRoom from './views/messages/MessageHostRoom';
import GuestBookingDetailsPage from './views/profile/components/GuestProfilePages/GuestProfileDetailPages/GuestBookingDetailsPage'

function App() {
  return (
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/login' element= {<Login/>} />
       <Route path='/register' element= {<Register/>} />
       <Route path='/add-listing' element= {<Addlisting/>} />
       <Route path='/add-host-info' element={<AddHostInfo />} />
       <Route path='/listing/:id' element= {<ListingDetail/>} />
       <Route path='listing/images' element= {<ListingImage/>} />
       <Route path='/host-profile' element= {<HostProfile/>} />
       <Route path='/guest-profile' element= {<GuestProfile/>} />
       <Route path='/host-profile-listings' element= {<HostListingPage/>} />
       <Route path='/host-profile-bookings' element= {<HostBookingPage/>} />
       <Route path='/host-profile-booking/:id' element= {<HostBookingDetailsPage/>} />
       <Route path='/guest-profile-bookings/:id' element= {<GuestBookingDetailsPage/>} />
       <Route path='/guest/messages/:id' element= {<MessageRoom/>} />
       <Route path='/host/messages/:id' element= {<MessageHostRoom/>} />
       <Route path='/guest-profile-bookings' element = {<GuestBookingPage/>}/>
    </Routes>
  )
}

export default App
