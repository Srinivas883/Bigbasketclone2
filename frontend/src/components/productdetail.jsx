import banana from "../assets/fruitvegbig1.webp"
import cauliflower from "../assets/fruitvegbig2.webp"
import carrot from "../assets/fruitvegbig3.webp"
import chili from "../assets/fruitvegbig4.webp"
import babywipes0 from "../assets/babywipesbig0.webp"
import babywipes1 from "../assets/babywipesbig1.webp"
import babywipes2 from "../assets/babywipesbig2.webp"
import babywipes3 from "../assets/babywipesbig3.webp"

import { useNavigate, useParams } from "react-router-dom"

import "./productdetail.css"

import Navbar from "./navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import auth from "../config"


function Productdetail() {

    const [addbtnval, setaddbtnval] = useState()
    const [currentuseremail, setcurrentuseremail] = useState()
    const [bsktvalue, setbsktvalue] = useState(0)
    const [loginstatus, setloginstatus] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setcurrentuseremail(user.email)
                setloginstatus(true)
                // axios.post("http://localhost:5000/backend", { loggedemail: user.email })
                //     .then((data) => {
                //         setaddbtnval(data.data)
                //     })
                //     .catch((err) => { console.log(err) })

                axios.post("http://localhost:5000/backend", { loggedemail: user.email })
                    .then((data) => {
                        setaddbtnval(data.data)
                        const setremovebtns = []
                        data.data.map((data) => {
                            if (data.addbtnstatus == "Remove") {
                                // console.log(data.key)
                                setremovebtns.push(data.key)
                            }

                        })
                        // setremovebtn(setremovebtns)
                        setbsktvalue(setremovebtns.length)
                    })
                    .catch((err) => { console.log(err) })

            }
        })

    }, [])

    const numericId = (Number(useParams().id) - 1);

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

    const percentageoff = (100 - ((products[numericId].price / products[numericId].originalPrice) * 100)).toFixed(0)

    function handleaddbtn1(id) {
        if (!loginstatus) {
            navigate("/login");
            return;
        }
        if (addbtnval[id - 1].addbtnstatus == "Add") {
            axios.post("http://localhost:5000/updateaddbtnstatus", { key: id, emailid: currentuseremail, addbtnstatus: "Remove" })
                .then(() => {
                    axios.post("http://localhost:5000/backend", { loggedemail: currentuseremail })
                        .then((data) => {
                            setaddbtnval(data.data)
                            const setremovebtns = []
                            data.data.map((data) => {
                                if (data.addbtnstatus == "Remove") {
                                    // console.log(data.key)
                                    setremovebtns.push(data.key)
                                }

                            })
                            // setremovebtn(setremovebtns)
                            setbsktvalue(setremovebtns.length)
                        })
                        .catch((err) => { console.log(err) })
                })
            // axios.post("http://localhost:5000/setbasketvalue", { addbtnstatus: "Remove" })
            //     .then((data) => {
            //         console.log(data.data)
            //         setbsktvalue(data.data)
            //     }).catch((err) => { console.log(err) })
        } else {
            axios.post("http://localhost:5000/updateaddbtnstatus", { key: id, emailid: currentuseremail, addbtnstatus: "Add" })
                .then(() => {
                    axios.post("http://localhost:5000/backend", { loggedemail: currentuseremail })
                        .then((data) => {
                            setaddbtnval(data.data)
                            const setremovebtns = []
                            data.data.map((data) => {
                                if (data.addbtnstatus == "Remove") {
                                    // console.log(data.key)
                                    setremovebtns.push(data.key)
                                }

                            })
                            // setremovebtn(setremovebtns)
                            setbsktvalue(setremovebtns.length)
                        })
                        .catch((err) => { console.log(err) })
                })
            // axios.post("http://localhost:5000/setbasketvalue", { addbtnstatus: "Add" })
            //     .then((data) => {
            //         console.log(data.data)
            //         setbsktvalue(data.data)
            //     }).catch((err) => { console.log(err) })
        }
    }


    return (
        <>
            <Navbar basketvalue={bsktvalue} />

            <section className="productdetail">
                
                <div className="prosec0">
                    <p className="fresho0"> fresho!</p>
                    <p className="productname0">{products[numericId].name}</p>
                </div>

                <div className="prosec1">
                    <img src={products[numericId].image} alt="" />
                </div>

                <div className="prosec2">
                    <p className="fresho"> fresho!</p>
                    <p className="productname">{products[numericId].name}</p>
                    <p className="productorgprice">MRP:<span>₹{products[numericId].originalPrice}</span></p>
                    <p className="productprice">Price: ₹{products[numericId].price}</p>
                    <p className="yousave">You Save: <span>{percentageoff}% OFF</span></p>
                    <p className="taxes">(inclusive of All Taxes)</p>
                    <button className="proaddbtn" onClick={() => { handleaddbtn1(products[numericId].id) }}>
                        {addbtnval
                            ? (addbtnval[products[numericId].id - 1]?.addbtnstatus === "Add"
                                ? "Add to Basket"
                                : <span style={{ fontSize: "20px" }}>Remove from basket</span>)
                            : "Login to add"}
                    </button>
                </div>

            </section>
        </>
    )
}

export default Productdetail