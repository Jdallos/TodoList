import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            edit: this.props.task
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    handleRemove() {
        this.props.remove(this.props.id);
    }

    toggleForm() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    handleUpdate(evt) {
        evt.preventDefault();
        // two parameters go in as need id to selectively update the todo.
        this.props.update(this.props.id, this.state.edit);
        this.setState({
            isEditing: false
        });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleToggleComplete() {
        this.props.toggleComplete(this.props.id);
    }

     // DEMO PURPOSES ONLY
    //  Multiple triggers as form onChange updates state, also toggle form is changing state
    // and this runs every time state is changed (and thus re rendering occurs)
    componentDidUpdate(prevProps, prevState){
        console.log('Inside componentDidUpdate Todo');
        console.log(prevProps.task);
        console.log(this.props.task);
    }

    componentWillUnmount(){
        console.log('In componentWillUNMOUNT!');
    }

    render() {
        let result;
        if (this.state.isEditing) {
            result = (
                <div className="Todo">
                    <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
                        <label>Edit:</label>
                        <input
                            name="edit"
                            id="name"
                            placeholder="Edit Todo"
                            onChange={this.handleChange}
                            value={this.state.edit}
                            type="text"
                        />
                        <button>Save</button>
                    </form>
                </div>

            )
        } else {
            result = (
                <div className="Todo">
                    {/* This p could be an li */}

                    {/* Refactor the class names out into seperate variables that are selected above... */}
                    <li onClick={this.handleToggleComplete} className={this.props.isCompleted ? "Todo-task completed" : 'Todo-task'}> {this.props.task}</li>

                    <div className="Todo-buttons">
                        <button onClick={this.handleRemove}><i className='fas fa-trash' /></button>
                        <button onClick={this.toggleForm}><i className='fas fa-pen' /></button>
                    </div>
                </div >
            )
        }
        return (
            //  will put in curly brackets when its coming from a function
            result
        )
    }
}

export default Todo;