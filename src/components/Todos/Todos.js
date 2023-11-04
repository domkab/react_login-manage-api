import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/css/bulma.css'
import React, { useCallback, useEffect, useState } from 'react'

import { getTodos } from '../../api/api'
import { TodoFilter } from './TodoFilter'
import { TodoList } from './TodoList'
import { TodoModal } from './TodoModal'

import { debounce } from '../../_utils/debounce_generic'
import { Loader } from './Loader'

export const Todos = () => {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])
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

  return (
    <>
      <div className='section'>
        <div className='container'>
          <div className='box'>
            <h1 className='title'>Todos:</h1>

            <div className='block'>
              <TodoFilter
                onFilter={handleSearch}
                onResetSearch={handleResetSearch}
                searchQuery={searchQuery}
                sortOptionChange={handleSortChange}
              />
            </div>

            <div className='block'>
              {loading && <Loader />}

              <TodoList
                todos={filteredTodos}
                onTodoSelect={handleTodoSelect}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onTodoSelect={handleTodoSelect} />
      )}
    </>
  )
}
