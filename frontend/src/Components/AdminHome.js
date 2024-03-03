import React from 'react';
import './adminHome.css';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className='admin_bg'>
        <div className='admin_cont'>
            <Link to='/employee-form'><button className='admin_btn'>Add Employee</button></Link>
            <Link to='/employees'><button className='admin_btn'>Employee Details</button></Link>
            <Link to='/task-form'><button className='admin_btn'>Add Task</button></Link>
            <Link to='/track-task'><button className='admin_btn'>Track Task</button></Link>
        </div>


    </div>
  )
}

export default AdminHome