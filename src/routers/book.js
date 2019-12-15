const express = require("express");
const auth = require("../middleware/auth");
const Book = require("../models/book");
const multer = require("multer");


const router = new express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + "-" + file.originalname);
    }
  });
  
  const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: imageFilter
  });

router.post("/books", auth.auth, auth.checkRole ,upload.single("cover"), async (req, res, next) => {
    try {
        req.body.cover = req.file.path;
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

router.get("/books", async (req, res) => {
    try {
        await Book.find({})
        .select("_id book_name desc cover author qty price")
        // ..and populate all of the notes associated with it
        .populate("genre" , "_id genre")
        .exec(function (err, books) {
          if (err) return handleError(err);
            res.status(200).send(books);
          })
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/book/:id", async (req, res) => {
    var id = req.params.id
    try {
        await Book.find({ _id : id})
        .select("_id book_name desc cover author qty price")
        // ..and populate all of the notes associated with it
        .populate("genre" , "_id genre")
        .exec(function (err, books) {
          if (err) return handleError(err);
            res.status(200).send(books);
          })
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