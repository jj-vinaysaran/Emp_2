import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css'; // Import the CSS file

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [searchBy, setSearchBy] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        employee_id: '',
        department: '',
        dob: '',
        gender: '',
        designation: '',
        salary: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, [sortBy, filterBy, searchBy]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`/api/admin/employees?sortBy=${sortBy}&filterBy=${filterBy}&searchBy=${searchBy}`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchBy(e.target.value);
    };

    const handleDelete = async (employeeId) => {
        try {
            await axios.delete(`/api/admin/employees/${employeeId}`);
            fetchEmployees(); // Fetch employees again after deletion
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleOpenUpdateForm = (employee) => {
        setSelectedEmployee(employee);
        setUpdateFormData(employee);
        setShowUpdateForm(true);
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
    };

    const handleUpdateFormChange = (e) => {
        setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/admin/employees/${selectedEmployee.id}`, updateFormData);
            fetchEmployees(); // Fetch employees again after update
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="employees-container">
            <h2 className="employees-title">Employee List</h2>
            <div className="filters">
                <select className="filter-select" onChange={handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="employee_id">Employee ID</option>
                    <option value="department">Department</option>
                    <option value="salary">Salary</option>
                </select>
                <select className="filter-select" onChange={handleFilterChange}>
                    <option value="all">All Departments</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={searchBy}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="employees-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.employee_id}</td>
                            <td>{employee.department}</td>
                            <td>{employee.dob}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button className="update-btn" onClick={() => handleOpenUpdateForm(employee)}>
                                    Update
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(employee.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showUpdateForm && (
                <div className="update-form-container">
                    <h3 className="update-form-title">Update Employee Details</h3>
                    <form className="update-form" onSubmit={handleUpdate}>
                        <input
                            type="text"
                            className="update-input"
                            name="name"
                            value={updateFormData.name}
                            onChange={handleUpdateFormChange}
                            required
                        />
                        <input
                            type="text"
                            className="update-input"
                            name="employee_id"
                            value={updateFormData.employee_id}
                            onChange={handleUpdateFormChange}
                            required
                        />
                        <input
                            type="text"
                            className="update-input"
                            name="department"
                            value={updateFormData.department}
                            onChange={handleUpdateFormChange}
                            required
                        />
                        <input
                            type="text"
                            className="update-input"
                            name="dob"
                            value={updateFormData.dob}
                            onChange={handleUpdateFormChange}
                            required
                        />
                        <input
                            type="text"
                            className="update-input"
                            name="gender"
                            value={updateFormData.gender}
                            onChange={handleUpdateFormChange}
                            required
                        />
                        <input
                            type="text"
                            className="update-input"
                            name="designation"
                            value={updateFormData.designation}
                            onChange={handleUpdateFormChange}
                            required
                        />
                        <input
                            type="number"
                            className="update-input"
                            name="salary"
                            value={updateFormData.salary}
                            onChange={handleUpdateFormChange}
                            required
                        />
                        <button className="update-submit-btn" type="submit">Update</button>
                        <button className="update-cancel-btn" type="button" onClick={handleCloseUpdateForm}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Employees;
