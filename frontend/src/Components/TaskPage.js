import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskPage.css'; // Import the CSS file

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    if (e.target.value === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === e.target.value);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="task-page-container">
      <h1>Task Management</h1>
      <div className="filter-container">
        <label htmlFor="statusFilter" className="filter-label">Filter by status:</label>
        <select id="statusFilter" value={statusFilter} onChange={handleFilterChange} className="filter-select">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id} className="task-row">
              <td>{task.name}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskPage;
