const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name.'],
    trim: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name.'],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: [true, "Duplicate email addresses are not allowed."],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address.'
    }
  },
  gender: {
    type: String,
    required: [true, 'Please provide a gender.'],
    enum: ['male', 'female', 'non-binary'],
    default: 'non-binary',
    trim: true,
    lowercase: true
  },
  salary: {
    type: Number,
    required: [true, 'Please provide a salary value greater than or equal to zero.'],
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: 'Salary value must be greater than or equal to zero.'
    }
  }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
