const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            foods: currentUser.pantry
        });
    } catch (error) {
        res.status(400).send({ msg: error.message })
        res.redirect('/')
    }
});

// NEW
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
});

// CREATE 
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body)
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        res.status(400).send({ msg: error.message })
        res.redirect('/')
    }
});


// DELETE
router.delete('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.pantryId).deleteOne();
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch {
        res.status(400).send({ msg: error.message });
        res.redirect('/');
    }
});

// EDIT
router.get('/:pantryId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.pantryId);
        console.log(food)
        res.render('foods/edit.ejs', {
          food: food  
        })
    } catch (error) {
        res.status(400).send({ msg: error.message });
        res.redirect('/')
    }
});

router.put('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.pantryId);
        pantry.set(req.body);
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: error.message });
        res.redirect('/')
    }
})
module.exports = router;