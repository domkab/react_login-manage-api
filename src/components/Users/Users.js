import React, { useState, useEffect, useRef } from 'react'
import { User } from '../User/User.js'
import { UserForm } from './UserForm.js'
import { getUsers, createUser, updateUser, deleteUser } from '../../api/api.js'
import './Users.scss'

export function Users () {
  const formRef = useRef(null)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const [isFormVisible, setIsFormVisible] = useState(false)
  const toggleFormVisibility = () => {
    if (isFormVisible) {
      resetForm()
    }
    setIsFormVisible(!isFormVisible)
  }

  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  })

  const [newAddress, setNewAddress] = useState({
    street: '',
    suite: '',
    city: '',
    zipcode: ''
  })

  const [editedUser, setEditedUser] = useState(null)

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, [])

  const handleUserClick = user => {
    setSelectedUser(selectedUser === user ? null : user)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    if (name.includes('company.')) {
      const field = name.split('.')[1]
      setNewUser({
        ...newUser,
        company: {
          ...newUser.company,
          [field]: value
        }
      })
    } else {
      setNewUser({
        ...newUser,
        [name]: value
      })
    }
  }

  const handleAddressChange = event => {
    const { name, value } = event.target
    setNewAddress({
      ...newAddress,
      [name]: value
    })
  }

  const resetForm = () => {
    setNewUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    })
    setNewAddress({
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    })
    setEditedUser(null)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    const userWithAddress = {
      ...newUser,
      address: newAddress
    }

    const userAction = editedUser
      ? updateUser(editedUser.id, userWithAddress)
      : createUser(userWithAddress)

    userAction
      .then(() => {
        refreshUsers()
        resetForm()
        setIsFormVisible(false)
      })
      .catch(error => console.error(error))
  }
  const refreshUsers = () => {
    console.log('refreshUsers called')

    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }

  const handleDeleteUser = userId => {
    deleteUser(userId)
      .then(() => refreshUsers())
      .catch(error => console.error(error))
  }

  const handleEditUser = user => {
    setEditedUser(user)
    setNewUser({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: {
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs
      }
    })
    setNewAddress({
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode
    })
    setIsFormVisible(true)
  }

  useEffect(() => {
    if (isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isFormVisible])

  return (
    <div className='container' id='narrow-container'>
      <h1 className='title'>Users</h1>
      <div className='user-list'>
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            selectedUser={selectedUser}
            onUserClick={handleUserClick}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
            required
          />
        ))}
      </div>

      <button
        className={`button form__button is-success ${isFormVisible ? 'is-active' : ''}`}
        onClick={toggleFormVisibility}
      >
        {isFormVisible ? 'Hide Form' : 'Add User'}
      </button>

      {isFormVisible && (
        <div className='form' ref={formRef}>
          <UserForm
            newUser={newUser}
            newAddress={newAddress}
            handleInputChange={handleInputChange}
            handleAddressChange={handleAddressChange}
            handleFormSubmit={handleFormSubmit}
            isEditing={editedUser !== null}
          />
        </div>
      )}
    </div>
  )
}
