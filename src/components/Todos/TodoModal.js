import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Loader } from './Loader'
import { getUser, updateTodo } from '../../api/api'

export const TodoModal = ({ todo, onTodoSelect, onTodoUpdate }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [editTitle, setEditTitle] = useState(todo?.title)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (todo) {
      setIsLoading(true)
      getUser(todo.userId)
        .then(fetchedUser => setUser(fetchedUser))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [todo])

  const handleUpdate = () => {
    const updatedTodo = { ...todo, title: editTitle }
    const todoId = todo.id

    updateTodo(todoId, updatedTodo)
      .then(() => {
        onTodoUpdate(updatedTodo)
        setIsEditing(false)
        onTodoSelect(null)
      })
      .catch(error =>
        console.error('There was an error updating the todo:', error)
      )
  }

  return (
    <div className='modal is-active' data-cy='modal'>
      <div className='modal-background' />

      {isLoading ? (
        <Loader />
      ) : (
        <div className='modal-card'>
          <header className='modal-card-head'>
            <div
              className='modal-card-title has-text-weight-medium'
              data-cy='modal-header'
            >
              {`Todo #${todo?.id}`}
            </div>

            <button
              type='button'
              className='delete'
              data-cy='modal-close'
              aria-label='Close modal'
              onClick={() => {
                onTodoSelect(null)
              }}
            />
          </header>

          <div className='modal-card-body'>
            {isEditing ? (
              <>
                <input
                  type='text'
                  className='input'
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <button
                  type='button'
                  className='button is-info'
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  type='button'
                  className='button'
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className='block' data-cy='modal-title'>
                  {todo?.title}
                  <span
                    className='icon has-text-info'
                    onClick={() => setIsEditing(true)}
                  >
                    <i className='fas fa-pencil-alt'></i>
                  </span>
                </p>
              </>
            )}

            <p className='block' data-cy='modal-user'>
              <strong
                className={cn({
                  'has-text-success': todo?.completed,
                  'has-text-danger': !todo?.completed
                })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
