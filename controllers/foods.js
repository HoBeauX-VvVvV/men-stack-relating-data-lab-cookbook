const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// INDEX
router.get('/users/:userId/foods', async (req, res) => {
    try {
        const foundFoods = await Food.find({})
        res.render('foods/index.ejs', {
            foods: foundFoods
        })
    } catch (error) {
       res.status(400).send({ msg: error.message })
    }
});

// NEW
router.get('/users/:userId/foods/new', (req, res) => {
    res.render('foods/new.ejs')
});

// CREATE 
router.post('/users/:userId/foods', async (req, res) => {
    try {
     const createdFood = await Food.create(req.body)
     res.redirect('foods/index.ejs')
    } catch (error) {
     res.status(400).send({ msg: error.message })
     res.redirect('foods/index.ejs')
    }
});

module.exports = router;