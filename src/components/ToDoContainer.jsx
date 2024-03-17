import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';

function ToDoContainer() {
  const [todos, setTodos] = useState({
    1: [],
    2: [],
    3: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/todos/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        const todosByStatus = { 1: [], 2: [], 3: [] };
        data.todos.forEach(todo => {
          todosByStatus[todo.urgency].push(todo);
        });
        setTodos(todosByStatus);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;
    const draggableId = result.draggableId;

    if (sourceDroppableId === destinationDroppableId) {
      const updatedTodos = {
        ...todos,
        [sourceDroppableId]: reorder(todos[sourceDroppableId], sourceIndex, destinationIndex)
      };
      setTodos(updatedTodos);
    } else {
      const sourceColumn = todos[sourceDroppableId].filter(todo => todo._id !== draggableId);
      const destinationColumn = todos[destinationDroppableId];
      const draggableTodo = todos[sourceDroppableId].find(todo => todo._id === draggableId);

      const updatedTodos = {
        ...todos,
        [sourceDroppableId]: sourceColumn,
        [destinationDroppableId]: [...destinationColumn, draggableTodo]
      };

      setTodos(updatedTodos);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p>Error fetching todos: {error.message}</p>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='container'>
        <div className='row'>
          {/* Status 1 */}
          <Droppable droppableId="1">
            {(provided) => (
              <div className='col-lg-4 col-md-6 mb-4' ref={provided.innerRef}>
                <div className='todo-section'>
                  <h1>New To dos</h1>
                  <div className='todoCard-container'>
                    {todos[1].map((todo, index) => (
                      <Draggable key={todo._id} draggableId={todo._id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TodoCard todo={todo} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              </div>
            )}
          </Droppable>

          {/* Status 2 */}
          <Droppable droppableId="2">
            {(provided) => (
              <div className='col-lg-4 col-md-6 mb-4' ref={provided.innerRef}>
                <div className='todo-section'>
                  <h1>Ongoing to dos</h1>
                  <div className='todoCard-container'>
                    {todos[2].map((todo, index) => (
                      <Draggable key={todo._id} draggableId={todo._id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TodoCard todo={todo} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              </div>
            )}
          </Droppable>

          {/* Status 3 */}
          <Droppable droppableId="3">
            {(provided) => (
              <div className='col-lg-4 mb-4' ref={provided.innerRef}>
                <div className='todo-section'>
                  <h1>Done to dos</h1>
                  <div className='todoCard-container'>
                    {todos[3].map((todo, index) => (
                      <Draggable key={todo._id} draggableId={todo._id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TodoCard todo={todo} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default ToDoContainer;
