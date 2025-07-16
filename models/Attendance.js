const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: String,
    date: String, // YYYY-MM-DD
    status: String // Present or Absent
});

module.exports = mongoose.model('Attendance', attendanceSchema);