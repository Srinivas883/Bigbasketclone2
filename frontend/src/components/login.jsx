import "./login.css"
import bigblogo from "../assets/BigBasket_Logo.svg.png"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import auth from "../config"
import { signInWithEmailAndPassword } from "firebase/auth"

function Login() {

    const [user, setuser] = useState("")
    const [pass, setpass] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("logged in")
                navigate('/')
            } else {
                console.log("logged out")

            }
        })
    }, [])

    function login() {
        signInWithEmailAndPassword(auth, user, pass).then(() => {
            console.log("user loggedin")
            navigate("/")

        }).catch(() => {
            console.log("Failed to login")
            alert("Incorrect Username or Password")
        })
    }


    return (
        <div className="loginpageimgbackgroud">
            <div className="loginpagebackground" onClick={() => { navigate("/") }}>

                <div className="loginpage" onClick={(e) => e.stopPropagation()} >
                    <img src={bigblogo} alt="" />
                    <h2>Login</h2>
                    <input type="text" placeholder="Email"  onChange={(e) => { setuser(e.target.value) }} />
                    <input type="password" placeholder="Password" onChange={(e) => { setpass(e.target.value) }} />
                    <button onClick={login}>Login</button>
                    <p className="xbtn" onClick={() => { navigate("/") }}>X</p>
                    <p>New user? <span onClick={() => { navigate("/signup") }}>Click here to SignUp</span></p>
                </div>

            </div>
        </div>
    )
}

export default Login