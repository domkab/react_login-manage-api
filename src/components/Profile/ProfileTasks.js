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
    createTask(newTask, profileId)
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
    if (editingTaskId && editingTaskText.trim() !== '') {
      try {
        const updatedTask = await updateTask(editingTaskId, {
          title: editingTaskText
        })
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === editingTaskId ? updatedTask : task
          )
        )
        setEditingTaskId(null)
        setEditingTaskText('')
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    }
  }

  const handleDeleteTask = async taskId => {
    try {
      await deleteTask(taskId)

      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  return (
    <div className='box'>
      <h2 className='title is-4'>Tasks</h2>
      <div className='field has-addons'>
        <div className='control is-expanded'>
          <input
            type='text'
            className='input'
            placeholder='New Task'
            value={newTask}
            onChange={handleNewTaskChange}
          />
        </div>
        <div className='control'>
          <button onClick={handleAddTask} className='button is-link'>
            Add Task
          </button>
        </div>
      </div>
      <table className='table is-narrow is-fullwidth'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>
                  {editingTaskId === task.id ? (
                    <input
                      type='text'
                      className='input'
                      value={editingTaskText}
                      onChange={e => setEditingTaskText(e.target.value)}
                    />
                  ) : (
                    <p>{task.title}</p>
                  )}
                </td>
                <td>
                  {editingTaskId === task.id ? (
                    <button
                      onClick={handleUpdateTask}
                      className='button is-success is-small'
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditTask(task.id, task.title)}
                        className='button is-small is-info'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className='button is-small is-danger'
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3'>No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
