import React, { useState, useEffect } from 'react';
import api from '../api.js';

const TodoForm = ({ fetchTodos, todoToEdit, setTodoToEdit }) => {
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDiscription(todoToEdit.discription);
            setStatus(todoToEdit.status);
        }
    }, [todoToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (todoToEdit) {
                await api.put(`/todos/${todoToEdit._id}`, { title, discription, status });
                setTodoToEdit(null);
            } else {
                await api.post('/todos/', { title, discription });
            }
            setTitle('');
            setDiscription('');
            setStatus('Pending');
            fetchTodos();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input placeholder="Discription" value={discription} onChange={(e) => setDiscription(e.target.value)} />
            {todoToEdit && (
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Pending</option>
                    <option>In-Progress</option>
                    <option>Completed</option>
                </select>
            )}
            <button type="submit">{todoToEdit ? 'Update Todo' : 'Add Todo'}</button>
        </form>
    );
};

export default TodoForm;
