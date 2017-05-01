import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';
import ErrorMessage from './ErrorMessage';

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <ErrorMessage message={this.props.error} />
        {this.props.loading
          ? <h2>Loading todos...</h2>
          : (
            <TodoTextInput
              newTodo
              onSave={this.handleSave}
              placeholder="What needs to be done?"
            />
          )
        }
      </header>
    );
  }
}
