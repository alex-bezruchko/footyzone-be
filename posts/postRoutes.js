const express = require('express');
const postDb = require('./../data/helpers/postDb.js');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary');
const router = express.Router();
const dataUri = require('datauri');
const path = require('path');
const newUri = new dataUri();
const restricted = require('./../auth/restricted.js');

router.use(express.json());
// Multer Storage
const storage = multer.memoryStorage();
// Multer Filter
const imageFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
        cb(null, true)
    } else {
        cb(new Error('Only jpeg, jpg, png files are allowed.'), false);
    }
}

// Multer Upload Config
const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
        ,
        fileFilter: imageFilter
    }
});

// Cloudinary Config

cloudinary.config({
    cloud_name: 'htg1iqq1p',
    api_key: '915419188456665',
    api_secret: 'M7938KD1Akyo8XBTmf7jF68jiHA'
})

router.get('/welcome', async (req, res) => {

    const posts = await postDb.welcomePosts();

    try {
        if (posts) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('There are no available posts.')
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

router.get('/', async (req, res) => {

    const posts = await postDb.fetchAll();

    try {
        if (posts) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('There are no available posts.')
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

router.get('/latest', async (req, res) => {

    const posts = await postDb.latest();

    try {
        if (posts) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('There are no available posts.')
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

router.get('/categories', async (req, res) => {

    const categories = await postDb.fetchAllCategories();

    try {
        if (categories) {
            res.status(200).json(categories);
        }
        else {
            res.status(404).json('There are no available categories.')
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

router.get('/category/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const posts = await postDb.getByCategoryId(id);
        if (posts.length > 0) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('Category is invalid.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const post = await postDb.getById(id);
        console.log(post);
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json('Post id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }

})

router.post('/', restricted, upload.single('postMainImg'), (req, res) => {
    const newPost = req.body;
    const postImageFile = req.file.buffer;
    const postImageName = req.file.originalname;

    if (postImageFile && postImageName) {
        const imageUri = req => newUri.format(path.extname(postImageName).toString(), postImageFile);

        const file = imageUri(req).content;
        
        cloudinary.uploader.upload(file, result => {

            newPost.postMainImg = result.secure_url;

            postDb.insert(newPost)
            console.log(newPost)
            .then(addedPost => {
                if (addedPost) {
                    res.status(201).json({addedPost, message: 'Post was successfully added.'});
                }
                else {
                    res.status(404).json('Please enter title and body.');
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err);
            })

        }) 
    } else {
        postDb.insert(newPost)
            console.log(newPost)
            .then(addedPost => {
                if (addedPost) {
                    res.status(201).json({addedPost, message: 'Post was successfully added.'});
                }
                else {
                    res.status(404).json('Please enter title and body.');
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err);
            })
    }
    
});

router.put('/:id', restricted, upload.single('postMainImg'), (req, res) => {

    const id = req.params.id;
    const updatedPost = req.body;
    
    const imageUri = req => newUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

    const file = imageUri(req).content;
    
    cloudinary.uploader.upload(file, result => {

        updatedPost.postMainImg = result.secure_url;

        postDb.update(id, updatedPost)
        .then(post => {
            if (post) {
                res.status(201).json({post, message: 'Post was updated.'});
            }
            else {
                res.status(404).json('Please enter title and body.');
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })


    })
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {
    const deleted = await postDb.remove(id);

        if (deleted) {
            res.status(200).json('Post successfully deleted.');
        }
        else {
            req.status(400).json('Post id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
});


module.exports = router;