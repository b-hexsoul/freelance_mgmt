const mongoose = require("mongoose");

const Project = require("./Project");

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

ClientSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function () {
    await Project.deleteMany({ clientId: this.getQuery()._id });
  }
);

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
