import "./loggedout.css"
import axios from 'axios'
import Navbar from "./navbar"
import bigblogo from "../assets/BigBasket_Logo.svg.png"

import scroll1 from "../assets/scroll1.webp"
import scroll2 from "../assets/scroll2.webp"
import scroll3 from "../assets/scroll3.webp"
import scroll4 from "../assets/scroll4.webp"
import scroll5 from "../assets/scroll5.webp"

import banana from "../assets/banana yelakki.webp"
import carrot from "../assets/carrot.webp"
import cauliflower from "../assets/cauliflower.webp"
import chili from "../assets/greenchilli.webp"

import babywipes0 from "../assets/babywipes0.webp"
import babywipes1 from "../assets/babywipes1.webp"
import babywipes2 from "../assets/babywipes2.webp"
import babywipes3 from "../assets/babywipes3.webp"

import fruit0 from "../assets/fruitsandveg0.webp"
import fruit1 from "../assets/fruitsandveg1.webp"
import fruit2 from "../assets/fruitsandveg2.webp"
import fruit3 from "../assets/fruitsandveg3.webp"

import snack1 from "../assets/snack1.webp"
import snack2 from '../assets/snack2.webp'
import snack3 from '../assets/snack3.webp'
import snakc4 from '../assets/snack4.webp'

import pamperbanner from "../assets/pamper banner.webp"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import auth from "../config"

function Loggedout() {
    const products = [
        { id: 1, image: banana, name: "Banana - Yelakki", price: 64, originalPrice: 109 },
        { id: 2, image: carrot, name: "Carrot - Orange (Loose)", price: 40, originalPrice: 104 },
        { id: 3, image: cauliflower, name: "Cauliflower", price: 31, originalPrice: 47 },
        { id: 4, image: chili, name: "Green Chili", price: 81, originalPrice: 107 },
        { id: 5, image: babywipes0, name: "Baby Wipes - Fresh", price: 275, originalPrice: 280 },
        { id: 6, image: babywipes1, name: "Skincare Wipes", price: 275, originalPrice: 280 },
        { id: 7, image: babywipes2, name: "Baby Wipes with Aloe Vera", price: 297, originalPrice: 450 },
        { id: 8, image: babywipes3, name: "Baby Wipes - With Aloe", price: 418, originalPrice: 598 }
    ];

    const [loginstatus, setloginstatus] = useState(false)
    const [addbtnval, setaddbtnval] = useState()
    const [currentuseremail, setcurrentuseremail] = useState()
    const [bsktvalue, setbsktvalue] = useState()

    const [filterdproduct, setfilterdproduct] = useState([])

    function handlesearchbartext(newtext) {
        console.log("Search text:", newtext);

        const filter = products.filter((product) => {
            return product.name.toLowerCase().includes(newtext.toLowerCase());
        });

        // console.log("Filtered Products:", filter);

        setfilterdproduct(filter); // Update the state with the filtered products

        setTimeout(() => console.log("Filtered Products:", filterdproduct), 3000)
    }




    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                // console.log("logged in")
                setloginstatus(true)
                navigate('/')
                setcurrentuseremail(user.email)
                axios.post("https://bigbasketclone2.onrender.com/backend", { loggedemail: user.email })
                    .then((data) => {
                        setaddbtnval(data.data)
                        const setremovebtns = []
                        data.data.map((data) => {
                            if (data.addbtnstatus == "Remove") {
                                setremovebtns.push(data.key)
                            }

                        })
                        setbsktvalue(setremovebtns.length)
                        console.log(setremovebtns.length)
                    })
                    .catch((err) => { console.log(err) })

            } else {
                console.log("logged out")
                setloginstatus(false)

            }

            setfilterdproduct(products)
        })

    }, [])

    console.log(addbtnval)



    const navigate = useNavigate()

    // function handleaddbtn1(id) {
    //     if (loginstatus === false) {
    //         navigate('/login');
    //     } else {
    //         const newStatus = addbtnval[id - 1].addbtnstatus === "Add" ? "Remove" : "Add";

    //         axios.post("https://bigbasketclone2.onrender.com/updateaddbtnstatus", {
    //             key: id,
    //             emailid: currentuseremail,
    //             addbtnstatus: newStatus
    //         })
    //             .then(() => {
    //                 axios.post("https://bigbasketclone2.onrender.com/backend", { loggedemail: currentuseremail })
    //                     .then((data) => {https://bigbasketclone2.onrender.com
    //                         setaddbtnval(data.data); // Update the state with the latest data
    //                     })
    //                     .catch((err) => { console.log(err); });
    //             })
    //             .catch((err) => {
    //                 console.error("Failed to update button status:", err);
    //             });
    //     }
    // }



    function handleaddbtn1(id) {
        if (loginstatus == false) {
            navigate('/login')
        } else {
            if (addbtnval[id - 1].addbtnstatus == "Add") {
                axios.post("https://bigbasketclone2.onrender.com/updateaddbtnstatus", { key: id, emailid: currentuseremail, addbtnstatus: "Remove" })
                    .then(() => {
                        axios.post("https://bigbasketclone2.onrender.com/backend", { loggedemail: currentuseremail })
                            .then((data) => {
                                setaddbtnval(data.data)
                                const setremovebtns = []
                                data.data.map((data) => {
                                    if (data.addbtnstatus == "Remove") {
                                        // console.log(data.key)
                                        setremovebtns.push(data.key)
                                    }

                                })
                                setbsktvalue(setremovebtns.length)

                            })
                            .catch((err) => { console.log(err) })
                    })
                // axios.post("https://bigbasketclone2.onrender.com/setbasketvalue", { addbtnstatus: "Remove" })
                //     .then((data) => {
                //         console.log(data.data)
                //         setbsktvalue(data.data)
                //     }).catch((err) => { console.log(err) })

            }
            else {
                axios.post("https://bigbasketclone2.onrender.com/updateaddbtnstatus", { key: id, emailid: currentuseremail, addbtnstatus: "Add" })
                    .then(() => {
                        axios.post("https://bigbasketclone2.onrender.com/backend", { loggedemail: currentuseremail })
                            .then((data) => {
                                setaddbtnval(data.data)
                                const setremovebtns = []
                                data.data.map((data) => {
                                    if (data.addbtnstatus == "Remove") {
                                        // console.log(data.key)
                                        setremovebtns.push(data.key)
                                    }

                                })
                                setbsktvalue(setremovebtns.length)
                            })
                            .catch((err) => { console.log(err) })
                    })
                // axios.post("https://bigbasketclone2.onrender.com/setbasketvalue", { addbtnstatus: "Add" })
                //     .then((data) => {
                //         console.log(data.data)
                //         setbsktvalue(data.data)
                //     }).catch((err) => { console.log(err) })

            }
        }

    }




    return (
        <div className="loggedout">

            <Navbar basketvalue={bsktvalue} onsearchchange={handlesearchbartext} />

            {/* Section 2 */}

            <section className="loggedoutsec2">

                <div className="imgscroll">
                    <img src={scroll1} alt="" />
                    <img src={scroll2} alt="" />
                    <img src={scroll3} alt="" />
                    <img src={scroll4} alt="" />
                    <img src={scroll5} alt="" />
                </div>

            </section>

            {/* Section 3 */}

            <section className="loggedoutsec3">
                <div className="smartbasket">
                    <p className="p1" >My Smart Basket</p>
                    <p className="p2" >View All</p>
                </div>



                <div className="smartbasketcards">

                    {filterdproduct.filter(product => product.id <= 4).map((product) => {
                        return (
                            <div className="smartbasketcard" key={product.id}>
                                <img src={product.image} onClick={() => { navigate(`/Productdetail/${product.id}`) }} alt="" />

                                <div>
                                    <p className="productnames">{product.name}</p>
                                    <p className="smartcardprice">₹{product.price} <span>₹{product.originalPrice}</span></p>
                                </div>

                                <div className="smartcardbtn">
                                    {addbtnval && addbtnval.length > (product.id - 1) ? (
                                        <button onClick={() => handleaddbtn1(product.id)}>
                                            {addbtnval[product.id - 1].addbtnstatus}
                                        </button>
                                    ) : (
                                        <button onClick={() => handleaddbtn1(product.id)}>Login to Add</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}


                </div>

            </section>

            {/* Sction 4 */}

            <section className="loggedoutsec3">
                <div className="smartbasket">
                    <p className="p1" >BestSellers</p>
                    <p className="p2" >View All</p>
                </div>
                <div className="smartbasketcards">

                    {filterdproduct.filter(product => product.id > 4).map((product) => {
                        return (
                            <div className="smartbasketcard" key={product.id}>
                                <img src={product.image} onClick={() => { navigate(`/Productdetail/${product.id}`) }} alt="" />

                                <div>
                                    <p className="productnames">{product.name}</p>
                                    <p className="smartcardprice">₹{product.price} <span>₹{product.originalPrice}</span></p>
                                </div>

                                <div className="smartcardbtn">
                                    {addbtnval && addbtnval.length > (product.id - 1) ? (
                                        <button onClick={() => handleaddbtn1(product.id)}>
                                            {addbtnval[product.id - 1].addbtnstatus}
                                        </button>
                                    ) : (
                                        <button onClick={() => handleaddbtn1(product.id)}>Login to Add</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}


                </div>

            </section>

            {/* Section 5 */}
            <section className="loggedoutsec5">
                <p style={{ fontSize: "25px" }}>Fruits and Vegetables</p>
                <div className="fruitsandveg">
                    <img src={fruit0} alt="" />
                    <img src={fruit1} alt="" />
                    <img src={fruit2} alt="" />
                    <img src={fruit3} alt="" />
                </div>
            </section>

            {/* Section 6 */}
            <section className="loggedoutsec5">
                <p style={{ fontSize: "25px" }}>Snacks Store</p>
                <div className="fruitsandveg">
                    <img src={snack1} alt="" />
                    <img src={snack2} alt="" />
                    <img src={snack3} alt="" />
                    <img src={snakc4} alt="" />
                </div>
            </section>

            {/* section 7 */}

            <section className="loggedoutsec2">

                <div className="imgscroll">
                    <img src={pamperbanner} alt="" />

                </div>

            </section>

            {/* section 8 */}

            <section className="loggedoutsec8">

                <div className="footer1">
                    <h4>Bigbasket</h4>
                    <p>About Us</p>
                    <p>Become A bigbasket Rider</p>
                    <p>In News</p>
                    <p>Green bigbasket</p>
                    <p>Privacy Policy</p>
                    <p>Terms and Conditions</p>
                </div>
                <div className="footer2">
                    <h4>Help</h4>
                    <p>Contact Us</p>
                    <p>bb Wallet FAQs</p>
                    <p>bb Wallet T&Cs</p>
                    <p>Vendor Connect</p>
                </div>

            </section>

            {/* section 9 */}

            <section className="loggedoutsec9">

                <div className="footer1">
                    <p>Copyright © 2023-2025 Supermarket Grocery Supplies Pvt Ltd</p>
                </div>
                <div className="footer2">
                    <img src={bigblogo} alt="" />
                </div>

            </section>
        </div>
    )
}

export default Loggedout