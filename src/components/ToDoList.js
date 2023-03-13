import React, { useState } from 'react';
import {
    Button,
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container
  } from "reactstrap";
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    setTodos([...todos, { text: inputValue, dueDate: dueDate }]);
    setInputValue('');
    setDueDate('');
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className='todo-list-container' style={{
        backgroundImage:
          "url(" + require("assets/img/blue-gradient-background-6517.jpeg") + ")"
      }}>
      <h1 className='presentation-title'>Weekly To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Input task..."/>
        <input type="date" value={dueDate} onChange={handleDueDateChange} />
        <Button className="btn-round"
                  color="danger">Add</Button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div>
              <span>{todo.text}</span>
            </div>
            {todo.dueDate.length > 0 &&
                <div className="due-date">
                    Due: {todo.dueDate}
                </div>
            }
            
            <Button className="btn-round"
                  color="danger" onClick={() => handleDelete(index)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;