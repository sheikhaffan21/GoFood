const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
router.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisAffanAhmedSheikhSidd@22"
const Order = require('../models/Orders')



router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        console.log(req.body.name,
            req.body.password,
            req.body.email,
            req.body.location)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const userName = req.body.name
            console.log(userName)
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })

                .then(res.json({ success: true, userName : userName }));

        } catch (error) {
            console.log(error)
                .then(res.json({ success: false }));
        }

    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });

            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const userName = userData.name
            console.log(userData.name)
            console.log(userName)

            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken, userName : userName });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }

    })

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })

    if (eId === null) {
        try {
            console.log(data)
            console.log("1231242343242354", req.body.email)
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})
router.post('/myOrderData', async (req, res) => {
    try{
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ success: true, orderData :myData })

    }catch(error){
        res.send("Server Error", error.message)
    }
})

module.exports = router;