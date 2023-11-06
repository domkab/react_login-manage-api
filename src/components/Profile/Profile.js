import React, { useState } from 'react'
import { updateProfile, getProfile } from '../../api/api'

export function Profile () {
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

  if (!profile) return <p>Loading...</p>

  return editing ? (
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
  )
}
