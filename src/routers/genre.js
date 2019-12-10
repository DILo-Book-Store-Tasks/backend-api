const express = require("express");
const auth = require("../middleware/auth");
const Genre = require("../models/genre");

const router = new express.Router();

router.post("/genres", auth.auth, auth.checkRole, async (req, res, next) => {
    try {
        const genres = new Genre(req.body)
        console.log(genres)

        await genres.save()
        res.status(201).send({
            success: true,
            message: "Genre has been Created!"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
})

router.get("/genres", auth.auth, auth.checkRole, async (req, res) => {
    try {
        const genres = await Genre.find({}).select("_id genre");
        res.status(200).send(genres);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/genres", auth.auth, auth.checkRole, async (req, res) => {
    try {
        const genres = await Genre.findOneAndDelete(req.body); // null
        if(genres){
            res.status(201).send({
                success: true,
                message: "Genre has been Deleted!"
            })
        }
    } catch (e) {
        res.status(500).send({
            message: "Delete failed"
        });
    }
});

router.patch('/genres/:id', auth.auth, auth.checkRole, async (req, res) => {
    
    try {
        var update = req.body
        var id = req.params.id
        console.log(id)
        console.log(update)

        const genres = await Genre.findOneAndUpdate({_id  : id}, {$set: update});  
        if(genres){
            res.status(201).send({
                success: true,
                message: "Genre has been Updated!"
            })
        }  
    } catch (error) {
        res.status(500).send({
            message: "Updated failed"
        });
    }
});

module.exports = router;