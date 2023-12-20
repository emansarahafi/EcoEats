const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  inquiry: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CustomerService = mongoose.model('CustomerService', customerServiceSchema);

module.exports = CustomerService;
