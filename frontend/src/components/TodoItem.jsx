import React from 'react';
import api from '../api.js';

const TodoItem = ({ todo, fetchTodos, setTodoToEdit }) => {
    const handleDelete = async () => {
        await api.delete(`/todos/${todo._id}`);
        fetchTodos();
    };

    return (
        <div style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
            <h3>{todo.title}</h3>
            <p>{todo.discription}</p>
            <p>Status: {todo.status}</p>
            <button onClick={() => setTodoToEdit(todo)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;
