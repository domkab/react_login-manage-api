import React, { useState, useEffect } from 'react'
import {
  getProfile,
  updateProfile,
  createTask,
  getTasks
} from '../../api/api.js'

export function Home () {
  const defaultProfile = {
    name: '',
    username: '',
    password: ''
  }
  const [profile, setProfile] = useState(defaultProfile)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  })
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingTaskText, setEditingTaskText] = useState('')

  useEffect(() => {
    getProfile().then(profile => {
      setProfile(profile)
    })
  }, [])

  useEffect(() => {
    if (profile.id) {
      getTasks(profile.id).then(fetchedTasks => {
        if (fetchedTasks) {
          console.log('Tasks fetched: ', fetchedTasks)
          setTasks(fetchedTasks)
        }
      })
    }
  }, [profile.id])

  const handleEdit = () => {
    setEditing(true)
    if (profile) {
      setFormData({
        name: profile.name,
        username: profile.username,
        password: profile.password
      })
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await updateProfile(formData)
    const updatedProfile = await getProfile()
    setProfile(updatedProfile)
    setEditing(false)
  }

  const handleNewTaskChange = e => {
    setNewTask(e.target.value)
  }

  // profileTasks

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
    <div className='section'>
      <div className='container'>
        <h1 className='title'>Hello, {profile.name}</h1>
        {profile ? (
          <div>
            {editing ? (
              <form onSubmit={handleSubmit} className='box'>
                <div className='field'>
                  <label className='label' htmlFor='name'>
                    Name
                  </label>
                  <div className='control'>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='input'
                      value={formData.name || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='field'>
                  <label className='label' htmlFor='username'>
                    Username
                  </label>
                  <div className='control'>
                    <input
                      type='text'
                      name='username'
                      id='username'
                      className='input'
                      value={formData.username || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='field'>
                  <label className='label' htmlFor='password'>
                    Password
                  </label>
                  <div className='control'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='input'
                      value={formData.password || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <button type='submit' className='button is-link'>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className='box'>
                <p>Username: {profile.username}</p>
                <button onClick={handleEdit} className='button is-link'>
                  Edit
                </button>
              </div>
            )}
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
                        <button
                          onClick={handleUpdateTask}
                          className='button is-link'
                        >
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
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

// prideti nauja uzduoti
