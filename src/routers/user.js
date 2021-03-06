const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");

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

router.post("/users", upload.single("avatar"), async (req, res) => {
  req.body.avatar = req.file.path;
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      token
    });
  } catch (e) {
    console.log("failsed");
    res.status(400).send(e);
  }
});

router.get("/users", auth.auth, auth.checkRole, async (req, res) => {
  try {
    const users = await User.find({}).select("_id email first_name last_name address phone role");
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth.auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/get-token", auth.auth, async (req, res) => {
  res.send({
    token: req.token
  });
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({
      user,
      token
    });
  } catch (e) {
    res.status(422).send({
      message: "Login Gagal"
    });
  }
});

router.post("/users/logout", auth.auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({
      message: "Logout Success"
    });
  } catch (e) {
    res.status(500).send({
      message: "Logout Gagal"
    });
  }
});

router.post("/users/logoutAll", auth.auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({
      message: "Logout berhasil"
    });
  } catch (e) {
    res.status(500).send({
      message: "Logout Gagal"
    });
  }
});

router.delete("/users/me", auth.auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send({
      message: "gagal delete"
    });
  }
});

router.post(
  "/users/me/avatar",
  auth.auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send({
      message: "berhasil di upload"
    });
  },
  (error, req, res) => {
    res.status(400).send({
      error: error.message
    });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send({
      message: "image not found"
    });
  }
});

router.patch("/users/:id", auth.auth, auth.checkRole, async (req, res) => {
  try {
    var update = req.body;
    var id = req.params.id;

    const users = await User.findOneAndUpdate({ _id: id }, { $set: update });
    if (users) {
      res.status(201).send({
        success: true,
        message: "User has been Updated!"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Updated failed"
    });
  }
});

module.exports = router;
