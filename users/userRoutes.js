const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');
const router = express.Router();
const restricted = require('../auth/restricted.js');

router.use(express.json());

function upperCase(req, res, next) {

    const name = req.body.name;
    // console.log(req.body);
    const modified = name;
    modified[0] = modified[0].toUpperCase();

    if (name === modified) {
        next();
    }
    else {
        res.json({ 
            message: 'User is not capitalized.',
            err: 'User is not capitalized.'
        })    
    }
}
router.use((err, req, res, next) => {
  
    res
      .status(500)
      .json({ 
          message: 'There was an error performing the required operation',
          err: err
        });
});

router.get('/', restricted, async (req, res) => {

    try {
        const users = await userDb.get();

        if (users) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json(`Users are not available.`)
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.post('/', async (req, res) => {

    const newUser = req.body;

    try {
        const added = await userDb.insert(newUser);

        if (added) {
            res.status(201).json('New User added.')
        }
        else {
            res.status(404).json('User id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }

})

router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const updatedUser = req.body;

    try {
        const updated = await userDb.update(id, updatedUser);
        console.log(updated);

        if (updated) {
            res.status(201).json('User updated.')
        }
        else {
            res.status(404).json('User id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }

})

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    const postRemoved = await postDb.removeByUser(id);
    try {
        const deleted = await userDb.remove(id);

        if (deleted) {
            res.status(200).json('User was successfully deleted');
        }
        else {
            res.status(404).json('User is not available');
        }
    }

    catch (e) {
        res.status(500).json(e);
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const user = await userDb.getById(id);

        if (user) {
            res.status(200).json(user);
        }

        else {
            res.status(404).json(`User's posts are not available.`)
        }
    }

    catch (e) {
        res.status(500).json(e)
    }
    

})

module.exports = router;
