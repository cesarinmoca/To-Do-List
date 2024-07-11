// client/src/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8081/api/todos');
    setTodos(response.data);
  };

  const createTodo = async () => {
    if (newTodo.trim()) {
      const response = await axios.post('http://localhost:8081/api/todos', { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    const response = await axios.put(`http://localhost:8081/api/todos/${id}`, updatedTodo);
    setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8081/api/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={createTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => updateTodo(todo.id, { ...todo, title: e.target.value })}
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo(todo.id, { ...todo, completed: e.target.checked })}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
