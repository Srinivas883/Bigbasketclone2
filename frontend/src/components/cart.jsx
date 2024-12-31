import banana from "../assets/fruitvegbig1.webp"
import cauliflower from "../assets/fruitvegbig2.webp"
import carrot from "../assets/fruitvegbig3.webp"
import chili from "../assets/fruitvegbig4.webp"

import babywipes0 from "../assets/babywipesbig0.webp"
import babywipes1 from "../assets/babywipesbig1.webp"
import babywipes2 from "../assets/babywipesbig2.webp"
import babywipes3 from "../assets/babywipesbig3.webp"

import { useParams, useNavigate } from "react-router-dom"

import Navbar from "./navbar"
import grocerybasket from '../assets/grocerybasket.png'

import './cart.css'
import { useEffect, useState } from "react"
import auth from "../config"
import axios from "axios"

function Cart() {

    const products = [
        { id: 1, image: banana, name: "Banana - Yelakki", price: 64, originalPrice: 109 },
        { id: 2, image: carrot, name: "Carrot - Orange (Loose)", price: 40, originalPrice: 104 },
        { id: 3, image: cauliflower, name: "Cauliflower", price: 31, originalPrice: 47 },
        { id: 4, image: chili, name: "Green Chili", price: 81, originalPrice: 107 },
        { id: 5, image: babywipes0, name: "Baby Wipes - Fresh", price: 275, originalPrice: 280 },
        { id: 6, image: babywipes1, name: "Skincare Wipes", price: 275, originalPrice: 280 },
        { id: 7, image: babywipes2, name: "Baby Wipes with Aloe Vera", price: 297, originalPrice: 450 },
        { id: 8, image: babywipes3, name: "Baby Wipes - With Aloe", price: 418, originalPrice: 598 }
    ]

    // const [addbtnval, setaddbtnval] = useState()
    const [currentuseremail, setcurrentuseremail] = useState()
    const [bsktvalue, setbsktvalue] = useState(0)

    const [removebtn, setremovebtn] = useState([])

    const [subtotal, setsubtotal] = useState(0)


    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setcurrentuseremail(user.email)
                axios.post("http://localhost:5000/backend", { loggedemail: user.email })
                    .then((data) => {
                        // setaddbtnval(data.data)
                        const setremovebtns = []
                        const subtotallist = []
                        data.data.map((data) => {
                            if (data.addbtnstatus == "Remove") {
                                // console.log(data.key)
                                setremovebtns.push(data.key)
                                subtotallist.push(products[data.key - 1].price)
                                console.log(data.key)
                            }

                        })
                        setremovebtn(setremovebtns)
                        setbsktvalue(setremovebtns.length)
                        let subtotallistsum = 0
                        subtotallist.forEach(number => { subtotallistsum += number })
                        console.log(subtotallist)
                        console.log(subtotallistsum)
                        setsubtotal(subtotallistsum)

                    })
                    .catch((err) => { console.log(err) })

            }

        })


    }, [])

    const navigate = useNavigate()

    // const numericId = (Number(useParams().id) - 1);



    // const percentageoff = (100 - ((products[numericId].price / products[numericId].originalPrice) * 100)).toFixed(0)

    function handleremovebtn(id) {

        axios.post("http://localhost:5000/updateaddbtnstatus", { key: id, emailid: currentuseremail, addbtnstatus: "Add" })
            .then(() => {
                axios.post("http://localhost:5000/backend", { loggedemail: currentuseremail })
                    .then((data) => {
                        // setaddbtnval(data.data)
                        const setremovebtns = []
                        const subtotallist = []
                        data.data.map((data) => {
                            if (data.addbtnstatus == "Remove") {
                                // console.log(data.key)
                                setremovebtns.push(data.key)
                                subtotallist.push(products[data.key - 1].price)
                                console.log(data.key)
                            }

                        })
                        setremovebtn(setremovebtns)
                        setbsktvalue(setremovebtns.length)
                        let subtotallistsum = 0
                        subtotallist.forEach(number => { subtotallistsum += number })
                        console.log(subtotallist)
                        console.log(subtotallistsum)
                        setsubtotal(subtotallistsum)


                    })
                    .catch((err) => { console.log(err) })

            }
            ).catch((err) => console.log(err))

        // axios.post("http://localhost:5000/setbasketvalue", { addbtnstatus: "Add" })
        //     .then((data) => {
        //         console.log(data.data)
        //         setbsktvalue(data.data)
        //     }).catch((err) => { console.log(err) })


    }

    function setcheckoutbtn() {
        axios.post("http://localhost:5000/backend", { trigger: "alltrue", emailfromcart: currentuseremail })
            .then(() => {
                setremovebtn(0)
                setsubtotal(0)
                // setbsktvalue(0)
            }).catch((err) => console.log(err))

        navigate('/thankyou')

    }

    return (<>
        <Navbar basketvalue={bsktvalue} />

        <section className="filledcart">

            {removebtn.length > 0 ?
                <>
                    <div className="checkoutbox">
                        <p>Subtotal: <span> ₹ {subtotal}</span></p>
                        <button onClick={setcheckoutbtn}>Checkout</button>
                    </div>
                    {removebtn.map((d, index) => (
                        <div className="productlist" key={index} >
                            <div className="productlistsec0">
                                <img src={products[d - 1].image} alt="" />
                                <div className="productlistsec1">
                                    <p className="productname">{products[d - 1].name}</p>
                                    <div className="productnamesec1">
                                        <p>₹{products[d - 1].price}</p>
                                        <p className="orgprice">₹{products[d - 1].originalPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="productlistsec2" >
                                <button onClick={() => handleremovebtn(d)}>Remove</button>
                                <p className="price">₹{products[d - 1].price}</p>
                            </div>

                        </div>)
                    )}
                </> : <section className="emptycart">
                    <img src={grocerybasket} alt="grocerybasket" />
                    <p>Let's fill the empty <span>Basket</span></p>
                    <button onClick={() => { navigate('/') }}>Continue Shopping</button>
                </section>}





        </section>

    </>)

}

export default Cart