const router = require('express').Router();
let User = require('../models/user.model');

// get users endpoint
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// post users endpoint
router.route('/add').post((req, res) => {
    const username = req.body.username;

    // create and save new user
    const newUser = new User({username});
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;