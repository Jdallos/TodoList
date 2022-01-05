import React, { Component } from 'react';
import './NewTodoForm.css';


class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.addTodo(this.state);
        this.setState({
            task: ""
        });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render() {
        return (
            <form className="NewTodoForm" onSubmit={this.handleSubmit}>
                <label htmlFor="task">Task:</label>
                <input
                    type="text"
                    value={this.state.task}
                    onChange={this.handleChange}
                    name="task"
                    id="task"
                    placeholder="New Todo"
                />
                <button>Add</button>
            </form>
        )
    }
}

export default TodoForm;