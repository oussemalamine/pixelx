import React from 'react';
import { FcManager } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

function TodoCard({ todo }) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='todoCard-container'>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
          <div className="manager-icon"> 
            <FcManager />
            <FaArrowRight />
            <GrUserWorker />
          </div>
          <div>Added On: {todo.addedOn}</div>
          <div>Deadline: {todo.deadline}</div>
          <div>Urgency: {todo.urgency}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
