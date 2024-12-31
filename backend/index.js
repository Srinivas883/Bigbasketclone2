const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://sri:123@cluster0.hk41k.mongodb.net/Bigbasketclone?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("connected to mongodb atlas server") })
    .catch(() => console.lo("failed to connect to atlas"))

const addremovebtn = mongoose.model("addremovebtn", { emailid: String, key: String, addbtnstatus: String }, "Addremovebtn")


app.post('/backend', (req, res) => {

    // emailid from signup 
    const emailid = req.body.user

    if (emailid) {
        // Insert 8 products if the user is new
        const dataToInsert = [];
        for (let i = 1; i <= 8; i++) {
            dataToInsert.push({ emailid, key: i.toString(), addbtnstatus: "Add" });
        }

        addremovebtn.insertMany(dataToInsert)
            .then(() => { console.log("Data inserted successfully") })
            .catch((err) => console.error(err));
    }

    const trigger = req.body.trigger
    const emailfromcart = req.body.emailfromcart
    if (trigger) {
        addremovebtn.updateMany(
            { emailid: emailfromcart, addbtnstatus:"Remove" },
            {$set:{addbtnstatus:"Add"}}
        ).then((result)=>console.log(result)).catch((err)=>{console.log(err)})
    }

    const loggedemail = req.body.loggedemail

    addremovebtn.find({ emailid: loggedemail })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => console.log(err))




})

app.post("/updateaddbtnstatus", (req, res) => {
    const key = req.body.key
    const emailid = req.body.emailid
    const addbtnstatus = req.body.addbtnstatus
    // console.log(key)

    addremovebtn.findOneAndUpdate(
        { emailid: emailid, key: key }, // Filter by emailid and key
        { $set: { addbtnstatus: addbtnstatus } }, // Update the addbtnstatus field
        { new: true } // Return the updated document
    ).then((updateddoc) => {
        res.json(updateddoc)
    }).catch((err) => { console.log(err) })

})

// FETCH BASKET VALUE

// const basketvalue = mongoose.model("basketvalue", { bsktvalue: Number }, "basketvalue")

// app.post('/basketvalue', (req, res) => {

//     basketvalue.find().then((data) => { res.json(data[0].bsktvalue) }).catch((err) => { console.log(err) })
// })

// app.post('/setbasketvalue', (req, res) => {

//     const addbtnstatus = req.body.addbtnstatus;

//     if (addbtnstatus == "Remove") {
//         basketvalue.updateOne({}, { $inc: { bsktvalue: 1 } })
//             .then(() => {
//                 // After updating the basket value, fetch the updated value
//                 basketvalue.find().then((data) => {
//                     res.json(data[0].bsktvalue); // Send updated basket value
//                 }).catch((err) => {
//                     console.log(err);
//                     res.status(500).send("Error fetching updated basket value");
//                 });
//             })
//             .catch((err) => {
//                 console.error(err);
//                 res.status(500).send("Error updating basket value");
//             });
//     } else if (addbtnstatus == "Add") {
//         basketvalue.updateOne({}, { $inc: { bsktvalue: -1 } })
//             .then(() => {
//                 // After updating the basket value, fetch the updated value
//                 basketvalue.find().then((data) => {
//                     res.json(data[0].bsktvalue); // Send updated basket value
//                 }).catch((err) => {
//                     console.log(err);
//                     res.status(500).send("Error fetching updated basket value");
//                 });
//             })
//             .catch((err) => {
//                 console.error(err);
//                 res.status(500).send("Error updating basket value");
//             });
//     } else {
//         // If no update request, fetch the current basket value
//         basketvalue.find().then((data) => {
//             res.json(data[0].bsktvalue); // Send current basket value
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).send("Error fetching basket value");
//         });
//     }

// });

// app.post("/setbasketproduct", (req, res) => {
//     const key = req.body.key
//     const addbtnstatus = req.body.addbtnstatus
//     if (addbtnstatus) {
//         if (addbtnstatus == "Add") { console.log(key) } else { console.log(key) }
//     }

// })


app.listen(5000, () => {
    console.log("Backend server started")
})