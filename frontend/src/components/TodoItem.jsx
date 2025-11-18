import React from 'react';
import api from '../api.js';

const TodoItem = ({ todo, fetchTodos, setTodoToEdit }) => {
    const handleDelete = async () => {
        await api.delete(`/todos/${todo._id}`);
        fetchTodos();
    };

    return (
        <div className="todo-item">
            <h3>{todo.title}</h3>
            <p>{todo.discription}</p>
            <p>Status: {todo.status}</p>

            <div className="actions">
            <button onClick={() => setTodoToEdit(todo)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;
