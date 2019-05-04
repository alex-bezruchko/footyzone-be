const express = require('express');
const postDb = require('./../data/helpers/postDb.js');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary');
const router = express.Router();
const dataUri = require('datauri');
const path = require('path');
const newUri = new dataUri();

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

router.get('/', async (req, res) => {

    const posts = await postDb.get(req.query);

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

router.get('/category/:id', async (req, res) => {

    try {
        const posts = await postDb.getByCategoryId(req.params.id);
        if (posts.length > 0) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('Category Id is invalid.')
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

router.post('/', upload.single('postMainImg'), (req, res) => {
    const post = req.body;
    
    const imageUri = req => newUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

    const file = imageUri(req).content;
    
    cloudinary.uploader.upload(file, result => {

        post.postMainImg = result.secure_url;

        postDb.insert(post)
        .then(res => {
            if (res) {
                res.status(201).json('Item Added.');
            }
            else {
                res.status(404).json('Please enter title and body.');
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })

    })
});

router.put('/:id', upload.single('postMainImg'), (req, res) => {

    const id = req.params.id;
    const post = req.body;
    
    const imageUri = req => newUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

    const file = imageUri(req).content;
    
    cloudinary.uploader.upload(file, result => {

        post.postMainImg = result.secure_url;

        postDb.update(id, post)
        .then(res => {
            if (res) {
                res.status(201).json('Item updated.');
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