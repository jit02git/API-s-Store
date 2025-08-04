const Student = require('../Model/StudentModel');

exports.createStudent = async (req, res) => {
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
