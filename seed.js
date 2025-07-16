const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/Employee');
const Task = require('./models/Task');
const Attendance = require('./models/Attendance');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('MongoDB Connected for Seeding');

    await Employee.deleteMany();
    await Task.deleteMany();
    await Attendance.deleteMany();

    const employees = await Employee.insertMany([
        { name: 'Sarah L', email: 'sarah@example.com', role: 'Manager', department: 'HR' },
        { name: 'Ali M', email: 'ali@example.com', role: 'Developer', department: 'IT' },
        { name: 'Zara K', email: 'zara@example.com', role: 'Designer', department: 'Creative' },
        { name: 'Hamza R', email: 'hamza@example.com', role: 'QA', department: 'Testing' },
        { name: 'Nida S', email: 'nida@example.com', role: 'Support', department: 'Customer Service' },
    ]);

    const tasks = await Task.insertMany([
        { title: 'Prepare Monthly Report', description: 'Report for July', assignedTo: employees[0].name, dueDate: new Date('2025-07-20'), status: 'active' },
        { title: 'Website UI Redesign', description: 'Homepage and dashboard update', assignedTo: employees[2].name, dueDate: new Date('2025-07-24'), status: 'completed' },
        { title: 'Client Issue Fix', description: 'Bug fix for client module', assignedTo: employees[1].name, dueDate: new Date('2025-07-10'), status: 'active' },
    ]);

    const today = new Date().toISOString().split('T')[0];

    await Attendance.insertMany([
        { employeeId: employees[0]._id, date: today, status: 'Present' },
        { employeeId: employees[1]._id, date: today, status: 'Present' },
        { employeeId: employees[2]._id, date: today, status: 'Absent' },
        { employeeId: employees[3]._id, date: today, status: 'Present' },
        { employeeId: employees[4]._id, date: today, status: 'Present' },
    ]);

    console.log('✅ Dummy data inserted successfully!');
    mongoose.disconnect();
}).catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
});