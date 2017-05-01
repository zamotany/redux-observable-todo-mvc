import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import {
  fetchTodos,
  addTodo,
  removeCompleted,
  editTodo,
  deleteTodo,
  completeTodo,
} from '../modules/todos/actions';
import { setVisibilityFilter } from '../modules/visibilityFilter/actions';

class App extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    todos: PropTypes.object.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    filterTodos: PropTypes.func.isRequired,
    removeCompleted: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props;
    return (
      <div>
        <Header
          addTodo={this.props.addTodo}
          loading={todos.pending && !todos.data.length}
          error={todos.error ? todos.error.message : ''}
        />
        <MainSection
          todos={todos}
          filter={this.props.filter}
          filterTodos={this.props.filterTodos}
          removeCompleted={this.props.removeCompleted}
          editTodo={this.props.editTodo}
          deleteTodo={this.props.deleteTodo}
          completeTodo={this.props.completeTodo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  filter: state.visibilityFilter,
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(fetchTodos()),
  addTodo: text => dispatch(addTodo(text)),
  filterTodos: filter => dispatch(setVisibilityFilter(filter)),
  removeCompleted: () => dispatch(removeCompleted()),
  editTodo: (id, text) => dispatch(editTodo(id, text)),
  deleteTodo: id => dispatch(deleteTodo(id)),
  completeTodo: (id, completed) => dispatch(completeTodo(id, completed)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
