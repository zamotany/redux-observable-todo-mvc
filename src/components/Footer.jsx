import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../modules/visibilityFilter/actions';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    filterTodos: PropTypes.func.isRequired,
  }

  _renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  _renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, filterTodos } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => filterTodos(filter)}
      >
        {title}
      </a>
    );
  }

  _renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <footer className="footer">
        {this._renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this._renderFilterLink(filter)}
            </li>,
          )}
        </ul>
        {this._renderClearButton()}
      </footer>
    );
  }
}
