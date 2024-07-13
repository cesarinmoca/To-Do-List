// client/src/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {
    const [todos, setTodos] = useState([]); //JSON
    const [newTodo, setNewTodo] = useState(''); //Todo Title

    useEffect(() => {
        fetchTodos();
    }, []);
    
    async function fetchTodos() {
        const response = await axios.get('http://localhost:8081/api/todos');
        setTodos(response.data);
    }

    async function createTodo() {
        if (newTodo.trim()) {
            const response = await axios.post('http://localhost:8081/api/todos', { title: newTodo});
            setTodos([...todos, response.data]);
            setNewTodo('');
        }
    }

    async function updateTodo(id, updatedTodo) {
        try {
            const response = await axios.put(`http://localhost:8081/api/todos/${id}`, updatedTodo);
            setTodos(todos.map((todo) => {
                if (todo.id === id) {
                    return response.data;
                } else {
                    return todo;
                }
            }));
        } catch (err) {
            console.error({ error: err.message });
        }
    }

    async function deleteTodo(id) {
        try {
            await axios.delete(`http://localhost:8081/api/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error(`Error deleting todo with ID ${id}:`, error);
        }
    }

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <div className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                />
                <button onClick={createTodo}>Add</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
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
}