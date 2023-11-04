import React from 'react';

export const FilterOption = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
};

export const TodoFilter = ({
  onFilter,
  onResetSearch,
  sortOptionChange,
  searchQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={sortOptionChange}
          >
            <option value={FilterOption.All}>All</option>
            <option value={FilterOption.Active}>Active</option>
            <option value={FilterOption.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => onFilter(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery && (
            <button
              aria-label="Clear Search"
              type="button"
              className="delete"
              onClick={onResetSearch}
            />
          )}

        </span>
      </p>
    </form>
  );
};
