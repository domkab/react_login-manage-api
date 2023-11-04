import cn from 'classnames'
import React from 'react'
import { deleteTodo } from '../../api/api'

export function TodoList ({ todos, onTodoSelect, selectedTodo, onDeleteTodo }) {
  const handleDelete = todoId => {
    deleteTodo(todoId)
      .then(() => {
        onDeleteTodo(todoId)
      })
      .catch(error => {
        console.error('There was an error deleting the todo:', error)
      })
  }

  return (
    <table className='table is-narrow is-fullwidth'>
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className='icon'>
              <i className='fas fa-check' />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr data-cy='todo' className='' key={todo.id}>
            <td className='is-vcentered'>{todo.id}</td>
            <td className='is-vcentered'>
              {todo.completed && (
                <span className='icon' data-cy='iconCompleted'>
                  <i className='fas fa-check' />
                </span>
              )}
            </td>
            <td className='is-vcentered is-expanded'>
              <p
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className='has-text-right is-vcentered'>
              <button
                type='button'
                className='button is-danger is-small'
                onClick={() => handleDelete(todo.id)}
              >
                <span className='icon'>
                  <i className='fas fa-trash-alt'></i>
                </span>
              </button>

              <button
                type='button'
                className='button'
                onClick={() => onTodoSelect(todo)}
              >
                {selectedTodo && selectedTodo.id === todo.id ? (
                  <span className='icon'>
                    <i className='fas fa-eye-slash' />
                  </span>
                ) : (
                  <span className='icon'>
                    <i className='far fa-eye' />
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
