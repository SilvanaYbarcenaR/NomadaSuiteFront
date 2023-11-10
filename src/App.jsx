import { Route, Routes } from 'react-router-dom';
import AccommodationDetail from './views/Detail/AccommodationDetail/AccommodationDetail';
import Accommodation from './views/Register/Accommodation/Accommodation';
import Cancellation from './views/Register/Cancellation/Cancellation';
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer.jsx';
import Reservation from './views/Register/Reservation/Reservation';
import './App.css'
import Aux from './components/Modals/Photo/auxx.jsx';
function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<AccommodationDetail />} />
        <Route path="/register-accommodation" element={<Accommodation />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/aux" element={<Aux />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;