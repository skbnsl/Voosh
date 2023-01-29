const express = require("express");
const User = require("../models/user");
const Order = require("../models/order");

async function addOrder(req, res) {
  try {
    
    const {ID, sub_total, number } = req.body;
    const existUser = await User.findOne({ ID });
    if (!existUser) {
      return res.send("user not exists");
    }

    if (!ID || !sub_total || !number) {
      return res.status(400).send("sub_total or number is missing");
    }

    Order.create({ ID, sub_total, number }, async function (err, order) {
      console.log(ID);
      console.log(sub_total);
      console.log(number);
      console.log(order);

      return res.send({
        status: "success",
        message: "Order add successfully",
        other: order,
      });
    });
  } catch (error) {
    if (error) {
      console.log("error in creating User", error);
      return res.status(400).send("error in creating order");
    }
  }
}

async function getOrder(req, res) {
  try {
    const obj = {};
    const ID = req.params.id;
    const save_user = await User.findById({_id:ID});
    if(!save_user){
      return res.send("user not exist");
    }
    const orders = await Order.find({ ID:ID });
    obj.Order = orders;
    res.json(obj);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  addOrder,
  getOrder,
};
