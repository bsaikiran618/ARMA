const mongoose = require("mongoose");
const validator = require("validator");

const forum = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [
      process.env.MIN_NAME_LENGTH,
      `Name must be minimum ${process.env.MIN_NAME_LENGTH} characters`,
    ],
    maxLength: [
      process.env.MAX_NAME_LENGTH,
      `Name must be max ${process.env.MAX_NAME_LENGTH} characters`,
    ],
  },
  forumHeads: [
    {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    },
  ],
  facultyCoordinatorID: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
  },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`,
    },
  },
  description: {
    type: String,
    maxLength: [2048, "Forum description too lengthy!"],
  },
  dashboardCoverFilePath: {
    type: String,
  },
  profilePictureFilePath: {
    type: String,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  phone: {
    type: Number,
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(String(value), "en-IN");
      },
      message: `{VALUE} is not a valid Indian contact number.`,
    },
  },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles" }],
});

const forums = mongoose.model("forums", forum);
module.exports = forums;
