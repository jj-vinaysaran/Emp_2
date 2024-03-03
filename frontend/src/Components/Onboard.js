import React from 'react'
import {Link} from 'react-router-dom';
import './Onboard.css';

const Onboard = () => {
  return (
    <div className='bg'>
        <div className='ondiv'>
        <h1 className='text'>Employee Management System</h1>
    
        <Link to='adminlogin'><button className='onboard_btn'>Admin</button></Link>
        <Link to='employeelogin'><button className='onboard_btn'>Employee</button></Link>
        </div>

    </div>
  )
}

export default Onboard