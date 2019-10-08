const express = require('express');

const router = express.Router();
const db = require('../data/db');

// ENDPOINT /api/posts

//GET /api/posts
router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })    
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
    
});


//GET api/posts/:id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
});


//GET api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
   db.findPostComments(req.params.id)
   .then(comments => {
       if(comments) {
           res.status(200).json(comments)
       } else {
           res.status(404).json({ message: "The post with the specified ID does not exist." })
       }
   })
   .catch(error => {
       res.status(500).json({ error: "The comments information could not be retrieved." })
   })
});


//POST api/posts
router.post('/', (req, res) => {
    const postData = req.body;

    if(!postData.title || !postData.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
    db.insert(postData)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })

    }
});


//POST api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
    const commentData = req.body;
    const id = req.params.id;
    
    if(!commentData.text){
        res.status(400).json({errorMessage: "Please provide text for the comment." })
    }
    commentData.post_id = id;
    db.insertComment(commentData)
    .then(comment => {
        if(comment) {
            res.status(201).json(comment)
        } else {
            res.status(404)
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
});


//PUT /api/posts/:id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changedData = req.body;

    if(!changedData.title || !changedData.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.update(id, changedData)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }

});


//DELETE api/posts/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(del => {
        if(del){
          res.status(200).json(del)  
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" })
    })
});



module.exports = router;