import './Components/init';
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HOME/Home";
import Navbar from "./Components/NAVBAR/Navbar";
import Create from "./Components/CREATE/Create";
import Update from './Components/UPDATE/Update';



function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path='/update/:CourseID' element={<Update/>}></Route>
      </Routes>
    </>
  )
}

export default App
