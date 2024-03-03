import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css'; // Import the CSS file

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        employee_id: '',
        department: '',
        dob: '',
        gender: 'Male', // Default to Male
        designation: '',
        salary: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/employees', formData);
            alert('Employee added successfully!');
            setFormData({
                name: '',
                employee_id: '',
                department: '',
                dob: '',
                gender: 'Male', // Reset to Male after submission
                designation: '',
                salary: ''
            });
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee. Please try again.');
        }
    };

    return (
        <div className="employee-form-container">
            <h2 className="form-title">Add New Employee</h2>
            <form className="employee-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    className="form-input"
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleChange}
                    placeholder="Employee ID"
                    required
                />
                <select
                    className="form-input"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    {/* Add more options as needed */}
                </select>
                <input
                    type="text"
                    className="form-input"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    required
                />
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </div>
                <select
                    className="form-input"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Accountant">Accountant</option>
                    {/* Add more options as needed */}
                </select>
                <input
                    type="number"
                    className="form-input"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    required
                />
                <button type="submit" className="submit-btn">Add Employee</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
