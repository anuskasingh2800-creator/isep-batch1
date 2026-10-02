const mongoose = require('mongoose');

const tcsMeetingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  guestName: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  notes: { type: String },
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('TCSMeeting', tcsMeetingSchema);
