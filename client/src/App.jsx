import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header.jsx";
import Home from "./views/Home/Home";

function App() {
  return (
    <div>
      <Footer />
      {/* <Header/> */}
      {/* <Routes>
          <Route path="/home" element={<Home/>} />
        </Routes> */}
    </div>
  );
}

export default App;
