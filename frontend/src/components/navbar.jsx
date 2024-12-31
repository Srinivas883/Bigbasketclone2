import "./navbar.css"

import down from "../assets/down.png"
import up from "../assets/up.png"
import magnifyingglass from "../assets/magnifying-glass.png"
import cart from "../assets/trolley.png"
import { useEffect, useState } from "react"
import bigblogo from "../assets/BigBasket_Logo.svg.png"
import menubar from "../assets/menuburger.png"
import menubaar from "../assets/menu-burger.png"
import logouticon from "../assets/logout.png"
import loginicon from "../assets/login.png"
import basket from "../assets/shopping-cart.png"

import { useNavigate } from "react-router-dom"
import auth from "../config"



import { signOut } from "firebase/auth"
import axios from "axios"


function Navbar({ basketvalue, onsearchchange }) {


    const [categorybtn, setcategorybtn] = useState(false)
    const [loginstatus, setloginstatus] = useState(false)

    const [searchbartext, setsearchbartext] = useState("")
    const [currentuseremail, setcurrentuseremail] = useState()

    function handlesearchbartext(e) {

        const value = e.target.value
        setsearchbartext(value)
        if (onsearchchange) {
            onsearchchange(value)
        }
    }

    const [bsktvalue, setbsktvalue] = useState(0)
    const navigate = useNavigate()


    function logout() {
        signOut(auth).then(() => { navigate("/login") })
    }

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setcurrentuseremail(user.email)
                console.log("logged in")
                setloginstatus(true)
            } else {
                console.log("logged out")

            }
        })

        // axios.post("http://localhost:5000/setbasketvalue")
        //     .then((data) => {
        //         console.log(data)
        //         setbsktvalue(data.data)
        //     })
        //     .catch((err) => { console.log(err) })

        if (basketvalue !== null) {
            setbsktvalue(basketvalue)
        }


    }, [basketvalue])



    function handlecategorybtn() {
        setcategorybtn(!categorybtn)
    }

    const handlexbtn = () => {
        const menubarbox = document.getElementById("menubarbox")
        const navbar = document.getElementById("navbar")

        menubarbox.style.right = "-110%"
        setTimeout(() => { navbar.style.overflow = "hidden"; }, 300)

    }

    const handlemenubar = () => {
        const menubarbox = document.getElementById("menubarbox")
        const navbar = document.getElementById("navbar")

        menubarbox.style.right = "5px"
        menubarbox.style.transition = ".5s"
        navbar.style.overflow = "visible"

    }
    return (<>
        <section className="Navbar" id="navbar">
            <img className="bigblogo" src={bigblogo} alt="bigblogo" onClick={() => { navigate('/') }} />

            {categorybtn ? <div onClick={handlecategorybtn} className="categorybtn1">
                <div>
                    <p>Shop by </p>
                    <h4>Cateogry</h4></div>
                <div>
                    <img src={down} alt="downtriangle" />
                </div>
            </div> : <div onClick={handlecategorybtn} className="categorybtn">
                <div className="shoptbycateogry">
                    <p>Shop by </p>
                    <h4>Cateogry</h4>
                </div>
                <div>
                    <img src={up} alt="uptriangle" />
                </div>
            </div>}

            <div className="searchbar">
                <img src={magnifyingglass} alt="magnifyingGlass" />
                <input type="text" placeholder="Search for Products..." value={searchbartext} onChange={handlesearchbartext} />
            </div>
            {loginstatus
                ? <button style={{ fontWeight: "bold" }} className="loggedinbtn" onClick={logout}>Logout</button>
                : <button style={{ fontWeight: "bold" }} className="loginbtn" onClick={() => { navigate("/login") }}>Login / SignUp</button>
            }

            {loginstatus ? <div className="cart" onClick={() => { navigate('/cart') }}>
                <img src={cart} alt="carticon" />
                <p>{bsktvalue}</p>
            </div> : <div className="cart" onClick={() => { navigate('/login') }}>
                <img src={cart} alt="carticon" />
            </div>}
            <div className="menubar" id="menubar">
                <img src={menubar} alt="" onClick={handlemenubar} />
            </div>

            <div className="menubarbox" id="menubarbox">
                {currentuseremail ? <><h2>Hello!!</h2>
                    <span className="useremail">{currentuseremail}</span> </> : ""}
                <p>---------------------------</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>Shope By Category</p>
                    <p>Vegetables</p>
                    <p>Fruits</p>
                    <p>Snacks</p>
                </div>
                <p>---------------------------</p>
                <div className="menubarboxsec1">

                    {loginstatus ? <div className="cart1" onClick={() => { navigate('/cart') }}>
                        <img src={basket} alt="carticon" />
                        <p>{bsktvalue}</p>
                    </div> : <div className="cart1" onClick={() => { navigate('/login') }}>
                        <img src={basket} alt="carticon" />
                    </div>}
                    {loginstatus ? <img className="logout" onClick={logout} src={logouticon} alt="" /> : <img onClick={() => { navigate("/login") }} className="logout" src={loginicon} alt="" />}

                </div>
                <button onClick={handlexbtn} className="xbtn">X</button>
            </div>

        </section>



    </>)
}

export default Navbar