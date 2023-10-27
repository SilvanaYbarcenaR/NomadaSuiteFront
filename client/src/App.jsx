import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';
import AccommodationDetail from './views/Detail/AccommodationDetail/AccommodationDetail';

function App() {
  return (
      <div>
        <Header/>
        <Routes>
          <Route path="/accdetail" element={<AccommodationDetail />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
        <Footer></Footer>
      </div>
  )
}

export default App
