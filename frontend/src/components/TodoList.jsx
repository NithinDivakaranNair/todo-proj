import React, { useState, useEffect } from 'react';
import api from '../api.js';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import ReactPaginate from 'react-paginate';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [todoToEdit, setTodoToEdit] = useState(null);

    const fetchTodos = async (pageNumber = 1) => {
        setLoading(true);
        const res = await api.get(`/todos?page=${pageNumber}&limit=5`);
        setTodos(res.data.todos);
        setPages(res.data.pages);
        setPage(res.data.page - 1);
        setLoading(false);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handlePageClick = (data) => {
        fetchTodos(data.selected + 1);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <TodoForm fetchTodos={fetchTodos} todoToEdit={todoToEdit} setTodoToEdit={setTodoToEdit} />
            {loading ? <p>Loading...</p> : todos.map(todo => <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} setTodoToEdit={setTodoToEdit} />)}
            <ReactPaginate
                pageCount={pages}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default TodoList;
