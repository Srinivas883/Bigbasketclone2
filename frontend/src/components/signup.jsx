import "./signup.css"
import bigblogo from "../assets/BigBasket_Logo.svg.png"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import auth from "../config"
import axios from "axios"


function SignUp() {

    const [user, setuser] = useState("")
    const [pass, setpass] = useState("")
    const [repass, setrepass] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            console.log(user)
            if (user) {

                console.log("logged in")
                navigate('/')
            } else {
                console.log("logged out")

            }
        })
    }, [])

    // function signupuser() {

    //     if (pass === repass) {
    //         createUserWithEmailAndPassword(auth, user, pass).then(() => {
    //             alert("User registered successfully")
    //             navigate("/login")
    //             setuser("")
    //             setpass("")
    //         })
    //     } else {
    //         alert("Passwords does not match")
    //     }
    // }


    function signupuser() {
        if (pass === repass) {
            createUserWithEmailAndPassword(auth, user, pass)
                .then(() => {
                    alert("User registered successfully");
                    navigate("/login");
                    setuser("");
                    setpass("");

                    // sending emailid to backend
                    axios.post("http://localhost:5000/backend", { user: user.toLowerCase() })
                        .then(() => { console.log("email sent to backend") })
                        .catch((err) => { console.log(err) })


                })
                .catch((error) => {
                    if (error.code === "auth/invalid-email") {
                        alert("Please enter a valid email address");
                    } else if (error.code === "auth/weak-password") {
                        alert("Password should be at least 6 characters long");
                    } else if (error.code === "auth/email-already-in-use") {
                        alert("This email is already registered");
                    } else {
                        alert("All fields are required");
                    }
                });
        } else {
            alert("Passwords do not match");
        }
    }


    return (
        <div className="signuppageimgbackgroud">
            <div className="signupagebackground" onClick={() => { navigate("/") }}>

                <div className="signupage" onClick={(e) => e.stopPropagation()} >
                    <img src={bigblogo} alt="" />
                    <h2>Signup</h2>
                    <input type="text" placeholder="Email" onChange={(e) => { setuser(e.target.value) }} />
                    <input type="password" placeholder="Password" onChange={(e) => { setpass(e.target.value) }} />
                    <input type="password" placeholder="Re-Password" onChange={(e) => { setrepass(e.target.value) }} />
                    <button onClick={signupuser}>SignUp</button>
                    <p className="xbtn" onClick={() => { navigate("/") }}>X</p>
                    <p>Registerd user?<span onClick={() => { navigate('/login') }}> Click Here..</span></p>
                </div>

            </div>
        </div>
    )
}

export default SignUp