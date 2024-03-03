import './App.css';
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom';
import Onboard from './Components/Onboard';
import Login from './Components/Login';
import AdminHome from './Components/AdminHome';
import Employees from './Components/Employees';
import EmployeeForm from './Components/EmployeeForm';
import TaskManagement from './Components/TaskManagement';
import TaskPage from './Components/TaskPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Onboard/>}/>
        <Route path='/adminlogin' element={<Login/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/employee-form' element={<EmployeeForm/>}/>
        <Route path='/task-form' element={<TaskManagement/>}/>
        <Route path='/track-task' element={<TaskPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
