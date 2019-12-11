const express = require("express");
const auth = require("../middleware/auth");
const Book = require("../models/book");

const router = new express.Router();

router.post("/books", auth.auth, auth.checkRole, async (req, res, next) => {
    try {
        const books = new Book(req.body)
        console.log(books)

        await books.save()
        res.status(201).send({
            success: true,
            message: "Book has been Created!"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
})

router.get("/books", auth.auth, auth.checkRole, async (req, res) => {
    try {
        const books = await Book.find({}).select("_id book_name genre desc qty price");
        res.status(200).send(books);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/books", auth.auth, auth.checkRole, async (req, res) => {
    try {
        const books = await Book.findOneAndDelete(req.body); // null
        if(books){
            res.status(201).send({
                success: true,
                message: "Book has been Deleted!"
            })
        }
    } catch (e) {
        res.status(500).send({
            message: "Delete failed"
        });
    }
});

router.patch('/books/:id', auth.auth, auth.checkRole, async (req, res) => {
    
    try {
        var update = req.body
        var id = req.params.id
        console.log(id)
        console.log(update)

        const books = await Book.findOneAndUpdate({_id  : id}, {$set: update});  
        if(books){
            res.status(201).send({
                success: true,
                message: "Book has been Updated!"
            })
        }  
    } catch (error) {
        res.status(500).send({
            message: "Updated failed"
        });
    }
});

module.exports = router;