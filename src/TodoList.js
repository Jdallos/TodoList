import React, { Component } from 'react';
import Todo from './Todo.js';
import TodoForm from './TodoForm.js';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { task: 'This is task 1', id: uuidv4(), isEditing: false, isCompleted: false },
                { task: 'This is task 2', id: uuidv4(), isEditing: false, isCompleted: false },
                { task: 'This is task 3', id: uuidv4(), isEditing: false, isCompleted: false },
            ]
        }
        this.addTodo = this.addTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.remove = this.remove.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    addTodo(taskText) {
        // Could add uuid in the form component also....
        let fullTask = { ...taskText, id: uuidv4(), isEditing: false, isCompleted: false };
        this.setState((st) => ({
            todos: [...st.todos, fullTask]
        }));
    }

    updateTodo(id, updatedTask) {
        const updatedTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                // this takes the existing todo inc id etc, but updates the task
                return { ...todo, task: updatedTask };
            }
            else {
                return todo;
            }
        });
        this.setState({
            todos: updatedTodos
        });

        // Todo and ID to edit the individual task, how to slect?

    }

    // DEMO PURPOSES ONLY
    componentDidUpdate(prevProps, prevState){
        console.log('Inside componentDidUpdate');
        console.log(prevState.todos);
        console.log(this.state.todos);
    }


    // remove(id){
    //     this.setState((st) => ({
    //         todos: [...st.todos.filter((todo) => todo.id !== id)]
    //     }));
    // }
    remove(id) {
        this.setState({
            todos: this.state.todos.filter((todo) => todo.id !== id)
        });
    }

 

    toggleComplete(id) {
        const completedTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                // this takes the existing todo inc id etc, but updates the task
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            else {
                return todo;
            }
        });
        this.setState({
            todos: completedTodos
        });
    }

    makeTodos() {
        return this.state.todos.map(todo => (
            <Todo
                task={todo.task}
                key={todo.id}
                id={todo.id}
                remove={this.remove}
                isEditing={todo.isEditing}
                update={this.updateTodo}
                isCompleted={todo.isCompleted}
                toggleComplete={this.toggleComplete}
            />
        ));
    }

    render() {
        return (
            <div className="TodoList">
                <h1>Todo List
                    <span>A Simple React Todo List App.</span>
                </h1>
                {/* Could have todo as an li in a ul */}
                <ul>
                    {this.makeTodos()}
                </ul>
                <TodoForm
                    addTodo={this.addTodo}
                />
            </div>
        )
    }
}

export default TodoList;