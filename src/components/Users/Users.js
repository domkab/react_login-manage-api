import React, { useState, useEffect, useRef } from 'react';
import { User } from '../User/User.js'
import { UserForm } from './UserForm.js'
import './Users.scss'

export function Users () {
  const formRef = useRef(null)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
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

  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, [])

  const handleUserClick = user => {
    setSelectedUser(selectedUser === user ? null : user)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const handleAddressChange = event => {
    const { name, value } = event.target
    setNewAddress({
      ...newAddress,
      [name]: value
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    const userWithAddress = {
      ...newUser,
      address: newAddress
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userWithAddress)
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data])

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
      })
      .catch(error => console.error(error))
  }

  const refreshUsers = () => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }

  const handleDeleteUser = userId => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) {
        refreshUsers()
      }
      refreshUsers()
    })
  }

  const handleEditUser = user => {
    setEditedUser(user);
    setIsFormVisible(true);
 };

  useEffect(() => {
    if (isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isFormVisible]);

  return (
    <div className='container'>
      <h1 className='title'>Users</h1>
      <div className='user-list'>
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            selectedUser={selectedUser}
            onUserClick={handleUserClick}
            onDelete={handleDeleteUser}
            required
          />
        ))}
      </div>

      <button
        className={`button is-success ${isFormVisible ? 'is-active' : ''}`}
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? 'Hide Form' : 'Add User'}
      </button>

      {isFormVisible && (
        <div 
          onSubmit={handleFormSubmit} 
          className='form'
          ref={formRef}
        >
          <UserForm
            newUser={newUser}
            newAddress={newAddress}
            handleInputChange={handleInputChange}
            handleAddressChange={handleAddressChange}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  )
}
