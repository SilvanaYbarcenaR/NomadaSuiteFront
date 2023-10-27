import { Route, Routes } from 'react-router-dom';
import AccommodationDetail from './views/Detail/AccommodationDetail/AccommodationDetail';
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';
import Login from './components/Modals/Login/Login.jsx';
import Photo from './components/Modals/Photo/Photo.jsx';
import User from './components/Modals/RegisterUser/User.jsx';
import Welcome from './components/Modals/Welcome/Welcome.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<AccommodationDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element={<User />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/photo" element={<Photo />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
};

export default App;