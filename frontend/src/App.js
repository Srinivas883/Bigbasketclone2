import { BrowserRouter, Routes, Route } from "react-router-dom"
import Loggedout from "./components/loggedout";
import Login from "./components/login";
import SignUp from "./components/signup";
import Productdetail from "./components/productdetail"
import Cart from "./components/cart";
import Thankyou from "./components/thankyou";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loggedout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/Productdetail/:id" element={<Productdetail />}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/thankyou" element ={<Thankyou/>}></Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App