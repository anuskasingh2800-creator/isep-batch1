const express = require('express');
const router = express.Router();
const TCSMeeting = require('../models/TCSMeeting');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// @route   GET /api/tcs-meetings
router.get('/', auth, async (req, res) => {
  try {
    const meetings = await TCSMeeting.find().sort({ date: -1 });
    res.json(meetings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error while fetching TCS meetings' });
  }
});

// @route   GET /api/tcs-meetings/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const meeting = await TCSMeeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'TCS meeting not found' });
    }
    res.json(meeting);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'TCS meeting not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tcs-meetings
router.post('/', [auth, roleCheck('admin')], async (req, res) => {
  try {
    const { title, date, guestName, description, notes, images } = req.body;
    const newMeeting = new TCSMeeting({
      title,
      date,
      guestName,
      description,
      notes,
      images: images || []
    });
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: 'Invalid request data', error: err.message });
  }
});

// @route   PUT /api/tcs-meetings/:id
router.put('/:id', [auth, roleCheck('admin')], async (req, res) => {
  try {
    const { title, date, guestName, description, notes, images } = req.body;
    let meeting = await TCSMeeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'TCS meeting not found' });
    }
    meeting.title = title || meeting.title;
    meeting.date = date || meeting.date;
    meeting.guestName = guestName || meeting.guestName;
    meeting.description = description || meeting.description;
    meeting.notes = notes !== undefined ? notes : meeting.notes;
    meeting.images = images !== undefined ? images : meeting.images;

    const updatedMeeting = await meeting.save();
    res.json(updatedMeeting);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'TCS meeting not found' });
    }
    res.status(400).json({ message: 'Server error during update' });
  }
});

// @route   DELETE /api/tcs-meetings/:id
router.delete('/:id', [auth, roleCheck('admin')], async (req, res) => {
  try {
    const meeting = await TCSMeeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'TCS meeting not found' });
    }
    await meeting.deleteOne();
    res.json({ message: 'TCS meeting removed successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'TCS meeting not found' });
    }
    res.status(500).json({ message: 'Server error during deletion' });
  }
});

module.exports = router;
