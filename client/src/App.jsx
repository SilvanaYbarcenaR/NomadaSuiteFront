import { Route, Routes } from "react-router-dom";
import "./App.css";
import CardList from "./components/CardList/CardList";
import Header from "./components/Header/Header.jsx";
import Home from "./views/Home/Home";
// const lista = [
//   {
//     name: "Registro",
//     link: "https://www.youtube.com/",
//   },
//   {
//     name: "Iniciar Sesión",
//     link: "/",
//   },
//   {
//     name: "Publica tu espacio",
//     link: "/",
//   },
//   {
//     name: "Centro de ayuda",
//     link: "",
//   },
//   {
//     name: "Otro",
//   },
//   {
//     name: "One more",
//     link: "/",
//   },
// ];
function App() {
  return (
    <div>
      <Header />
      {/* <CardList lista={lista} /> */}
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
