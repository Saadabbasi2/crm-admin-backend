const Employee = require('../models/Employee');
const Task = require('../models/Task');
const Attendance = require('../models/Attendance');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const activeTasks = await Task.countDocuments({ status: 'active' });

        const today = new Date().toISOString().split('T')[0];
        const todayAttendanceRecords = await Attendance.find({ date: today, status: 'Present' });
        const totalPresent = todayAttendanceRecords.length;
        const totalToday = await Employee.countDocuments();
        const todaysAttendance = ((totalPresent / totalToday) * 100).toFixed(0) + '%';

        const overdueTasks = await Task.countDocuments({
            dueDate: { $lt: new Date() },
            status: { $ne: 'completed' }
        });

        res.json({
            totalEmployees,
            activeTasks,
            todaysAttendance,
            overdueTasks
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};