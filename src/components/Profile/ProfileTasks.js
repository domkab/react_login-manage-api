import React, { useState, useEffect } from 'react'
import { createTask, getTasks, updateTask, deleteTask } from '../../api/api.js'

export function ProfileTasks ({ profileId }) {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingTaskText, setEditingTaskText] = useState('')

  useEffect(() => {
    if (profileId) {
      getTasks(profileId).then(fetchedTasks => {
        setTasks(fetchedTasks || [])
      })
    }
  }, [profileId])

  const handleNewTaskChange = e => {
    setNewTask(e.target.value)
  }

  const handleAddTask = () => {
    createTask(newTask, profile.id)
      .then(task => {
        setTasks(prevTasks => [...prevTasks, task])
        setNewTask('')
      })
      .catch(error => {
        console.error('Failed to create task:', error)
      })
  }

  const handleEditTask = (taskId, taskText) => {
    setEditingTaskId(taskId)
    setEditingTaskText(taskText)
  }

  const handleUpdateTask = async () => {
    // Replace with your actual implementation
    // await updateTask(editingTaskId, editingTaskText);
    setEditingTaskId(null)
    setEditingTaskText('')
  }

  const handleDeleteTask = async taskId => {
    // Replace with your actual implementation
    // await deleteTask(taskId);
  }

  return (
    <div className='box'>
      <h2 className='title is-4'>Tasks</h2>
      <div className='field'>
        <div className='control'>
          <input
            type='text'
            className='input'
            placeholder='New Task'
            value={newTask}
            onChange={handleNewTaskChange}
          />
        </div>
      </div>
      <button onClick={handleAddTask} className='button is-link'>
        Add Task
      </button>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task =>
            editingTaskId === task.id ? (
              <li key={task.id}>
                <input
                  type='text'
                  value={editingTaskText}
                  onChange={e => setEditingTaskText(e.target.value)}
                />
                <button onClick={handleUpdateTask} className='button is-link'>
                  Save
                </button>
              </li>
            ) : (
              <li key={task.id}>
                {task.title}
                <button
                  onClick={() => handleEditTask(task.id, task.text)}
                  className='button is-link'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className='button is-danger'
                >
                  Delete
                </button>
              </li>
            )
          )
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  )
}
