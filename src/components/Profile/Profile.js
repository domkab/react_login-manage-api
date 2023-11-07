import React, { useState } from 'react'
import { updateProfile, getProfile } from '../../api/api'
import './Profile.scss'

export function Profile ({ initialProfile, onProfileUpdate }) {
  const [profile, setProfile] = useState(initialProfile)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  })

  const [sideNote, setSideNote] = useState(initialProfile.sideNote || '')
  const [editingSideNote, setEditingSideNote] = useState(false)

  const handleEdit = () => {
    setEditing(true)
    if (profile) {
      setFormData({
        name: profile.name,
        username: profile.username,
        password: profile.password,
        id: profile.id
      })
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await updateProfile(formData)
    console.log('updateProfile response', response)
    const updatedProfile = await getProfile()
    console.log('updatedProfile', updatedProfile)
    setProfile(updatedProfile)
    setEditing(false)
    onProfileUpdate(updatedProfile)
  }

  const handleSideNoteSubmit = async () => {
    const updatedProfile = await updateProfile({ ...profile, sideNote })
    setProfile(updatedProfile)
    setEditingSideNote(false)
    onProfileUpdate(updatedProfile)
  }

  const handleSideNoteChange = e => {
    setSideNote(e.target.value)
  }

  const handleDeleteSideNote = async () => {
    const updatedProfile = await updateProfile({ ...profile, sideNote: '' })
    setProfile(updatedProfile)
    setSideNote('')
    onProfileUpdate(updatedProfile)
  }

  const handleSideNoteEdit = () => {
    setEditingSideNote(true)
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

      <div className='profile__side-note content'>
        <p>Side Note:</p>
        <div className='field is-centered'>
          {!editingSideNote ? (
            <>
              <div className='control'>
                <button
                  onClick={
                    sideNote
                      ? handleSideNoteEdit
                      : () => setEditingSideNote(true)
                  }
                  className={`button is-fullwidth ${
                    sideNote ? 'is-static' : 'is-info'
                  }`}
                  title={sideNote ? 'Click to edit' : 'Add Side Note'}
                >
                  {sideNote || 'Add Side Note'}
                </button>
              </div>
              {sideNote && (
                <div
                  className='
                    profile__side-note-buttons 
                    buttons 
                    are-small 
                    is-flex 
                    is-justify-content-center
                  '
                >
                  <button
                    onClick={handleSideNoteEdit}
                    className='button is-text'
                    title='Edit Side Note'
                  >
                    <span className='icon is-small'>
                      <i className='fas fa-pencil-alt'></i>
                    </span>
                  </button>
                  <button
                    onClick={handleDeleteSideNote}
                    className='button is-danger is-light'
                    title='Delete Side Note'
                  >
                    <span className='icon is-small'>
                      <i className='fas fa-trash'></i>
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className='control'>
                <input
                  type='text'
                  className='input'
                  placeholder='Enter your side note here'
                  value={sideNote}
                  onChange={handleSideNoteChange}
                  autoFocus
                />
              </div>
              <div className='buttons'>
                <button
                  onClick={handleSideNoteSubmit}
                  className='button is-info is-fullwidth'
                  title='Save Side Note'
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingSideNote(false)}
                  className='button is-light is-fullwidth'
                  title='Cancel'
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
