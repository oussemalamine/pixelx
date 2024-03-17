import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import ToDoContainer from './ToDoContainer';


function DashboardPage() {
  const [todos, setTodos] = useState([]);


  return (
    
    <div>
        
        <ToDoContainer/>
    </div>
  );
}
export default DashboardPage ;