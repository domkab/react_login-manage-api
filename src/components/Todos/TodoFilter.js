import React from 'react'

export const FilterOption = {
  All: 'all',
  Active: 'active',
  Completed: 'completed'
}

export const TodoFilter = ({
  onFilter,
  onResetSearch,
  sortOptionChange,
  searchQuery
}) => {
  return (
    <form className='field has-addons'>
      <div className='control'>
        <div className='select is-fullwidth'>
          <select onChange={sortOptionChange}>
            <option value={FilterOption.All}>All</option>
            <option value={FilterOption.Active}>Active</option>
            <option value={FilterOption.Completed}>Completed</option>
          </select>
        </div>
      </div>
      <div className='control is-expanded has-icons-left has-icons-right'>
        <input
          data-cy='searchInput'
          type='text'
          className='input'
          placeholder='Search...'
          value={searchQuery}
          onChange={e => onFilter(e.target.value)}
        />
        <span className='icon is-small is-left'>
          <i className='fas fa-search'></i>
        </span>
        {searchQuery && (
          <span
            className='icon is-small is-right'
            style={{ pointerEvents: 'all' }}
          >
            <button
              aria-label='Clear Search'
              type='button'
              className='delete is-small'
              onClick={onResetSearch}
            />
          </span>
        )}
      </div>
    </form>
  )
}
