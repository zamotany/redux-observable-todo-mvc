import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
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
