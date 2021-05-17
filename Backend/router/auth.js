const { Users} = require("../modules/users");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const express = require("express");
const Joi=require("joi");
const router = express.Router();

router.post("/", async (req, res) => {

  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validpassword = await bcrypt.compare(req.body.password,user.password);
  if(!validpassword) return res.status(400).send("Invalid email or password")

  const token=user.genAuthToken();
  const resp={
    token,
    name:user.name
  }
  res.send(resp)



});


function Validate(req){
    const Schema={
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(req,Schema)
}

module.exports = router;