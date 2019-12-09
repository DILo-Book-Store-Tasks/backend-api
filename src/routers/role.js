const express = require("express");
const Role = require("../models/role");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/roles", auth.checkRole, async (req, res, next) => {
  try {
    res.status(200).json({
        message: "Success"
    })
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
