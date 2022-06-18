const User = require('../models/User')
const router= require('express').Router()
const bcrypt = require('bcrypt')
// REGISTER
router.post("/register", async (req, res) => {
    const {username, email, password} = req.body
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //create new user
        const newUser = new User({username, email, password: hashedPassword})

        //Save user and return response
        const user = await newUser.save()
        res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json(error)
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    
    try {
        const { email, password} = req.body
        const user = await User.findOne({email})
        !user && res.status(404).json("User not found!")

        const validPassword = await bcrypt.compare(password, user.password)
        !validPassword && res.status(400).json('Invalid password!')

        res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router