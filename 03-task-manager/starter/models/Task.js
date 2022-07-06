const mongoose = require("mongoose");

// in manual atlas there is no fix schema

//schema defines the structure for the document
//only those listed here will be pushed to database rest will be ignored ie if say random = 'colors' it will be ignorred

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide an Name"],
    trim: true,
    maxlength: [20, "Name cannot be longer than 20 charecters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
// now with this set up we can add empty values to our database which is not good , we neeed to validate
//Validation

module.exports = mongoose.model("Task", TaskSchema);
