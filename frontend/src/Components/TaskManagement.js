import React, { useState } from 'react';
import axios from 'axios';
import './TaskManagement.css'; // Import the CSS file for styling

const TaskManagement = () => {
    const [formData, setFormData] = useState({
        task_name: '',
        task_description: '',
        deadline: '',
        employee_id: ''
    });
    const [taskId, setTaskId] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/tasks', formData);
            alert('Task added successfully!');
            setFormData({
                task_name: '',
                task_description: '',
                deadline: '',
                employee_id: ''
            });
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        }
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/admin/tasks/${taskId}`, formData);
            alert('Task updated successfully!');
            setFormData({
                task_name: '',
                task_description: '',
                deadline: '',
                employee_id: ''
            });
            setTaskId('');
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/admin/tasks/${taskId}`);
            alert('Task deleted successfully!');
            setTaskId('');
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task. Please try again.');
        }
    };

    return (
        <div className="task-management-container">
            <div className="add-task-section">
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmitAdd} className="task-form">
                    <input
                        type="text"
                        name="task_name"
                        value={formData.task_name}
                        onChange={handleChange}
                        placeholder="Task Name"
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        name="task_description"
                        value={formData.task_description}
                        onChange={handleChange}
                        placeholder="Task Description"
                        className="form-input"
                        required
                    />
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        placeholder="Employee ID"
                        className="form-input"
                        required
                    />
                    <button type="submit" className="submit-btn">Add Task</button>
                </form>
            </div>

            <div className="update-task-section">
                <h2>Update Task</h2>
                <form onSubmit={handleSubmitUpdate} className="task-form">
                    <input
                        type="text"
                        name="task_name"
                        value={formData.task_name}
                        onChange={handleChange}
                        placeholder="Task Name"
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        name="task_description"
                        value={formData.task_description}
                        onChange={handleChange}
                        placeholder="Task Description"
                        className="form-input"
                        required
                    />
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        placeholder="Employee ID"
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Task ID"
                        value={taskId}
                        onChange={(e) => setTaskId(e.target.value)}
                        className="form-input"
                        required
                    />
                    <button type="submit" className="submit-btn">Update Task</button>
                </form>
            </div>

            <div className="delete-task-section">
                <h2>Delete Task</h2>
                <input
                    type="text"
                    placeholder="Task ID"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    className="form-input"
                    required
                />
                <button onClick={handleDelete} className="delete-btn">Delete Task</button>
            </div>
        </div>
    );
};

export default TaskManagement;


