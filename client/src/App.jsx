import { Route, Routes } from 'react-router-dom';
import AccommodationDetail from './views/Detail/AccommodationDetail/AccommodationDetail';
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';
import AccountPage from './views/UserPanel/AccountPage';
import Footer from './components/Footer/Footer.jsx';
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<AccommodationDetail />} />
        <Route path="account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;