import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';
import Login from './views/LogIn/Login';
import User from './views/Register/User/User.jsx';
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element={<User />} />
      </Routes>
    </div>
  )
};

export default App;