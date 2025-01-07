const mongoose = require("mongoose");

const assignmentsTestsSchema = new mongoose.Schema({
  assignments: [
    {
      name: { type: String, required: true },
      marks: { type: Number, required: true },
      score: { type: Number, required: true },
      submissionDate: { type: String, required: true },
      remark: { type: String },
    },
  ],
  tests: [
    {
      name: { type: String, required: true },
      marks: { type: Number, required: true },
      score: { type: Number, required: true },
    },
  ],
});

const scoreSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: [true, "Student must have a rollNo"],
  },
  acadYear: {
    type: String,
    required: [true, "Student should fall into an academic year"],
    index: true,
  },
  class: {
    type: String,
    required: [true, "Student must belong to a class"],
  },
  english: { type: assignmentsTestsSchema, required: true },
  hindi: { type: assignmentsTestsSchema, required: true },
  telugu: { type: assignmentsTestsSchema, required: true },
  mathematics: { type: assignmentsTestsSchema, required: true },
  science: { type: assignmentsTestsSchema, required: true },
  socialStudies: { type: assignmentsTestsSchema, required: true },
});

// Model creation
const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;
