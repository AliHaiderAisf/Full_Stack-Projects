import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Stats from "./components/Stats";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/user" element={<Stats />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
