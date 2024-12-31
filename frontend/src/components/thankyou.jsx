import { useEffect, useState } from "react"
import Navbar from "./navbar"
import thankyou from "../assets/thankyou.png"
import "./thankyou.css"
import { useNavigate } from "react-router-dom"
import grocerybasket from '../assets/grocerybasket.png'

function Thankyou() {
    const navigate = useNavigate()

    const [bsktvalue, setbsktvalue] = useState(0)

    useEffect(() => {
        setbsktvalue(0)

        setTimeout(() => {
            navigate('/')
        }, 8000);

    })

    return (<>
        <Navbar basketvalue={bsktvalue} />

        <div className="thankyoupage">
            <img className="thankyoupageimg" src={thankyou} alt="" />

        </div>
        <div className="cartboxes">
            <div className="emptycart1">
                <img src={grocerybasket} alt="grocerybasket" />
                <span>Thank You!</span>
                <p>For Shopping with us</p>
                <button onClick={() => { navigate('/') }}>Continue Shopping</button>
            </div>
        </div>

    </>)
}

export default Thankyou