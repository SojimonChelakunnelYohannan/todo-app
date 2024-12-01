import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, addTodo, deleteTodo } from './store';

const Todo: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch: AppDispatch = useDispatch();

    const handleAddTodo = () => {
        if (input.trim()) {
            dispatch(addTodo(input))
            setInput("");
        }
    };

    const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodo(id))
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className='col-lg-12 todolist-wrapper'>
            <h1 className='todo-title'>Todo List</h1>
            <div className='todolist-div'>
                {!todos.length && "No records found!"}
                {todos.map(todo => (
                    <div key={todo.id} className='row todolist-item'>
                        <div className='col-lg-10 col-md-5 col-sm-2'>{todo.text}</div>
                        <div className='col-lg-2 col-md-5 col-sm-2'>
                            <button onClick={() => handleDeleteTodo(todo.id)}
                                className='btn btn-danger'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-group mb-3 todo-input">
                <input type="text"
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a todo"
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default Todo;
