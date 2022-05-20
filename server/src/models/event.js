const mongoose = require("mongoose");

const event = new mongoose.Schema({
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
  description: {
    type: String,
    minLength: [
      process.env.MIN_EVENT_DESCRIPTION_LENGTH,
      `description has to consist of minimum ${process.env.MIN_EVENT_DESCRIPTION_LENGTH} characters.`,
    ],
    maxLength: [
      process.env.MAX_EVENT_DESCRIPTION_LENGTH,
      `description has to consist of maximum ${process.env.MAX_EVENT_DESCRIPTION_LENGTH} characters.`,
    ],
  },
  eventDates: [{ type: String }],
  forumID: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "forums",
  },
  attendanceDocID: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "attendance",
  },
  eventStatus: {
    type: String,
    enum: [
      "AWAITING SAC APPROVAL",
      "CHANGES REQUESTED BY SAC",
      "AWAITING FO APPROVAL",
      "CHANGES REQUESTED BY FO",
      "APPROVED",
      "REJECTED BY SAC",
      "REJECTED BY FO",
      "CANCELLED",
      "COMPLETED"
    ],
  },
  eventCompleted: { type: Boolean, default: false },
  hasBudget: {
    type: Boolean,
    required: true,
  },
  equipment: [
    {
      equipmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipments",
      },
      quantity: { type: Number },
    },
  ],
  // halls: [{
  //   date:{type:Date},
  //   timeSlot: [{
  //     type:String,
  //     enum:["Morning","Afternoon"]
  //   }],
  //   hall:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "halls",
  //   }
  // }],
  eventProposalDocPath: {
    type: String,
    required: true,
  },
  budgetDocPath: {
    type: String,
    required: this.hasBudget,
  },
  reportDocPath: {
    type: String,
  },
  mediaFilePaths: [{ type: String }],
  FOComments: { type: String, default: "" },
  SACComments: { type: String, default: "" },
});

const events = mongoose.model("events", event);
module.exports = events;
