import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';
import Login from './components/LogIn/Login.jsx';
import User from './components/RegisterUser/User.jsx';
import Welcome from './components/Modals/Welcome/Welcome.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element={<User />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
};

export default App;