import { Route, Routes } from 'react-router-dom';
import AccommodationDetail from './views/Detail/AccommodationDetail/AccommodationDetail';
import Accommodation from './views/Register/Accommodation/Accommodation';
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';
import AccountPage from './views/UserPanel/AccountPage';
import Footer from './components/Footer/Footer.jsx';
import './App.css'
import Checkout from './components/Checkout/Checkout';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<AccommodationDetail />} />
        <Route path="/register-accommodation" element={<Accommodation />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;