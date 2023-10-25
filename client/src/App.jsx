import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home';


function App() {
  return (
      <div>
        <Header/>
        <Routes>
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
  )
}

export default App
