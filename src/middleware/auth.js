const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
const Order = require("../models/order");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.KEY_AUTH);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error("user not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({
      error: "Please harus login"
    });
  }
};

const checkRole = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.KEY_AUTH);

    const check = await Role.findOne({
      _id: decoded.role
    });

    if (check.role === "admin") {
      next();
    } else {
      res.status(401).send({
        message: "No Authorization"
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error : " + error
    });
    console.log(error);
  }
};

const checkMaker = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decode = jwt.verify(token, process.env.KEY_AUTH);

  await User.findOne({ user: decode._id })
    .exec()
    .then(result => next())
    .catch(err => {
      return res.status(401).send({ message: err });
    });
};

module.exports = {
  auth,
  checkRole,
  checkMaker
};
