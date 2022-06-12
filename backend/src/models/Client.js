const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
