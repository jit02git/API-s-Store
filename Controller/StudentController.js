const Student = require('../Model/StudentModel');

const getStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: 'Students retrieved successfully', data: students });
  } catch (err) {
    console.error('GetStudent Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      dob,
      email,
      phone,
      address,
      rollNo,
      class: studentClass,
      section
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !rollNo || !studentClass || !section) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await Student.findOne({ $or: [{ email }, { phone }, { rollNo }] });
    if (existing) {
      return res.status(409).json({ message: 'Student with same email/phone/roll number already exists' });
    }

    const newStudent = new Student({
      firstName,
      lastName,
      gender,
      dob,
      email,
      phone,
      address,
      rollNo,
      class: studentClass,
      section
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', data: savedStudent });

  } catch (err) {
    console.error('CreateStudent Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
  } catch (err) {
    console.error('UpdateStudent Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully', data: deletedStudent });
  } catch (err) {
    console.error('DeleteStudent Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
