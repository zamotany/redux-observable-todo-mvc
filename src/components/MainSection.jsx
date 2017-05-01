import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../modules/visibilityFilter/actions';

const filters = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
};

export default class MainSection extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    todos: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
    removeCompleted: PropTypes.func.isRequired,
    filterTodos: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  }

  _removeCompletedHandler = () => {
    this.props.removeCompleted();
  }

  _handleShow = (filter) => {
    this.props.filterTodos(filter);
  }

  _renderToggleAll(completedCount) {
    const { todos } = this.props;
    if (todos.data.length) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.data.length}
        />
      );
    }
    return null;
  }

  _renderFooter(completedCount) {
    const { todos, filter } = this.props;
    const activeCount = todos.data.length - completedCount;
    if (todos.data.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this._removeCompletedHandler}
          filterTodos={this._handleShow}
        />
      );
    }
    return null;
  }

  render() {
    const { todos, filter } = this.props;

    const filteredTodos = todos.data.filter(filters[filter]);
    // eslint-disable-next-line no-confusing-arrow
    const completedCount = todos.data.filter(filters[SHOW_COMPLETED]).length;

    return todos.pending && !todos.data.length ? null : (
      <section className="main">
        {this._renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={this.props.editTodo}
              deleteTodo={this.props.deleteTodo}
              completeTodo={this.props.completeTodo}
            />
          ))}
        </ul>
        {this._renderFooter(completedCount)}
      </section>
    );
  }
}
