const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

// Notes: ref under clientId with string of the model that the path refers to... When you run .populate() then mongo looks at that ref
// to deteremine the foreign collection it should query.
