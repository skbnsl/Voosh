const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
          ID: {
                    type: String,
                    required: true
          },
          sub_total:{
                    type: Number,
                    required: true,
          },
          number: {
                    type: String,
                    required: true
          }
},{
          timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

