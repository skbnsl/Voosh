const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT_SECRET_KEY = "THiS_IS_a__JWT_sECrET_kEY";
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cookieParser());

//For SignUp the New USer
 async function Signup(req, res) {
  try {
    const { name, number, password} = req.body;
    const existUser = await User.findOne({ number });
    if (existUser) {
      return res.send("user already exists");
    }

    if (!name || !number || !password) {
      return res.status(400).send("name or number or password is missing");
    }


    const HashedPassword = await bcrypt.hash(password, 10);
    console.log(HashedPassword);
    User.create(
      { name, number, password: HashedPassword },
      async function (err, user) {
        console.log(user);
        const Save_user = await User.findOne({ number: number });
        const token = jwt.sign({ userId: Save_user._id }, JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
         return res.send({"status":"success","message" : "registration success", "value":token});

        }
    );
  } catch (error) {
    if (error) {
      console.log("error in creating User", error);
      return res.status(400).send("error in creating User");
    }
  }
}






async function signIn(req, res) {
          try {
            const { number, password } = req.body;
            if (!number || !password) {
              return res.send("all fields are required");
            }
            User.findOne({ number }, async function (err, data) {
              if (err) {
                console.log("error in signIn", err);
                return res.send("error in signIn");
              }
              const HashPassword = await bcrypt.compare(password, data.password);
        
              if (!HashPassword) {
                // console.log(data);
                return res.send("number and Password not match");
              }
        
              const token = jwt.sign({ name: data.name }, JWT_SECRET_KEY, {
                expiresIn: "1d",
              });
        
              const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
              };
         
          res
                .status(200)
                .cookie("value", token, option)
                .send({ status: "success", message: "logged In", value: token });
            });
          } catch (error) {
            console.log("error in sign in", error);
            return res.json(400).send("error in sign in");
          }
        }


module.exports = {
          Signup,
          signIn
}