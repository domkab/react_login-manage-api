import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/css/bulma.css'
import React, { useCallback, useEffect, useState } from 'react'

import { getTodos, createTodo, getUsers } from '../../api/api'
import { TodoFilter } from './TodoFilter'
import { TodoList } from './TodoList'
import { TodoModal } from './TodoModal'
import { debounce } from '../../_utils/debounce_generic'
import { Loader } from './Loader'

export const Todos = () => {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])
  const [users, setUsers] = useState([])
  const [showAddTodoModal, setShowAddTodoModal] = useState(false)
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [newTodoUserId, setNewTodoUserId] = useState('')
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [currentFilterOption, setFilterOption] = useState('All')
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const loadTodos = async () => {
    setLoading(true)

    try {
      const loadedTodos = await getTodos()

      setTodos(loadedTodos)
      setFilteredTodos(loadedTodos)
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  const updateFilteredTodos = useCallback(
    (term, filterOption) => {
      let updatedTodos = [...todos]

      if (term.trim()) {
        updatedTodos = updatedTodos.filter(todo =>
          todo.title.toLowerCase().includes(term.toLowerCase())
        )
      }

      switch (filterOption) {
        case 'active':
          updatedTodos = updatedTodos.filter(todo => !todo.completed)
          break
        case 'completed':
          updatedTodos = updatedTodos.filter(todo => todo.completed)
          break
        default:
          break
      }

      setFilteredTodos(updatedTodos)
    },
    [todos]
  )

  const handleSearch = useCallback(
    term => {
      setSearchQuery(term)

      const debouncedUpdate = debounce(() => {
        updateFilteredTodos(term, currentFilterOption)
      }, 600)

      debouncedUpdate()
    },
    [currentFilterOption, updateFilteredTodos]
  )

  const handleSortChange = event => {
    const newSortOption = event.target.value

    setFilterOption(newSortOption)
    updateFilteredTodos(searchQuery, newSortOption)
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setFilteredTodos(todos)
  }

  const handleTodoSelect = todo => {
    setSelectedTodo(todo)
  }

  const handleCreateNewTodo = () => {
    const newTodoData = {
      userId: parseInt(newTodoUserId, 10),
      title: newTodoTitle,
      completed: false
    };
  
    createTodo(newTodoData)
      .then(addedTodo => {
        setTodos(todos => [...todos, addedTodo]);
        setFilteredTodos(filtered => [...filtered, addedTodo]);
        setNewTodoTitle('');
        setNewTodoUserId('');
        setShowAddTodoModal(false);
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const handleShowAddTodoModal = () => {
    setShowAddTodoModal(true)
  }

  const onDeleteTodo = todoId => {
    setFilteredTodos(currentTodos =>
      currentTodos.filter(todo => todo.id !== todoId)
    )
  }

  const onTodoUpdate = updatedTodo => {
    setFilteredTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    )
  }

  return (
    <>
      <div className='section'>
        <div className='container'>
          <div className='box'>
            <h1 className='title'>Todos:</h1>

            <div className='block'>
              <button
                className='button is-info is-pulled-right'
                onClick={handleShowAddTodoModal}
              >
                <span className='icon is-small'>
                  <i className='fas fa-plus'></i>
                </span>
                <span>Add Todo</span>
              </button>

              <TodoFilter
                onFilter={handleSearch}
                onResetSearch={handleResetSearch}
                searchQuery={searchQuery}
                sortOptionChange={handleSortChange}
              />
            </div>

            {showAddTodoModal && (
              <div className='modal is-active'>
                <div
                  className='modal-background'
                  onClick={() => setShowAddTodoModal(false)}
                ></div>
                <div className='modal-card'>
                  <header className='modal-card-head'>
                    <p className='modal-card-title'>Add New Todo</p>
                    <button
                      className='delete'
                      aria-label='close'
                      onClick={() => setShowAddTodoModal(false)}
                    ></button>
                  </header>
                  <section className='modal-card-body'>
                    <div className='field'>
                      <label className='label'>Title</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='text'
                          placeholder='Todo title'
                          value={newTodoTitle}
                          onChange={e => setNewTodoTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Assign to</label>
                      <div className='control'>
                        <div className='select is-fullwidth'>
                          <select
                            value={newTodoUserId}
                            onChange={e => setNewTodoUserId(e.target.value)}
                          >
                            <option value=''>Select User</option>
                            {users.map(user => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>
                  <footer className='modal-card-foot'>
                    <button
                      className='button is-success'
                      onClick={handleCreateNewTodo}
                    >
                      Add
                    </button>
                    <button
                      className='button'
                      onClick={() => setShowAddTodoModal(false)}
                    >
                      Cancel
                    </button>
                  </footer>
                </div>
              </div>
            )}

            <div className='block'>
              {loading && <Loader />}

              <TodoList
                todos={filteredTodos}
                onTodoSelect={handleTodoSelect}
                onDeleteTodo={onDeleteTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onTodoUpdate={onTodoUpdate}
          onTodoSelect={handleTodoSelect}
        />
      )}
    </>
  )
}
