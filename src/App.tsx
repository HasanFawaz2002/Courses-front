import './Components/init';
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HOME/Home";
import Navbar from "./Components/NAVBAR/Navbar";
import Create from "./Components/CREATE/Create";
import Update from './Components/UPDATE/Update';
import Users from './Components/Users/Users';
import CreateUser from './Components/CreateUsers/CreateUsers';
import UpdateUser from './Components/UpdateUsers/UpdateUsers';


function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path='/update/:CourseID' element={<Update/>}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path='/updateUsers/:userId' element={<UpdateUser />}></Route>
      </Routes>
    </>
  )
}

export default App
