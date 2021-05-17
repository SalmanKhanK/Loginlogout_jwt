const { Users, validate } = require("../modules/users");
const author=require("../middleware/auth")
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.get("/me",author,async(req,res)=>{
  const user=await Users.findById(req.user._id).select("-password")
  const token=user.genAuthToken();
  res.header("Authorization",token).send(user);
})


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");

  user = new Users(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token=user.genAuthToken();
  res.header("Authorization",token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;