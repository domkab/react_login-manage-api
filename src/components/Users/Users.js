import React, { useState, useEffect } from 'react'
import { User } from '../User/User.js'
import './Users.scss'

export function Users () {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
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

      <form onSubmit={handleFormSubmit} className='form'>
        <div class='field'>
          <label className='label' htmlFor='username'>
            Username
          </label>
          <div class='control'>
            <input
              type='text'
              name='name'
              value={newUser.name}
              onChange={handleInputChange}
              placeholder='Name'
              required
            />
          </div>
        </div>
        <div class='control'>
          <input
            type='text'
            name='username'
            value={newUser.username}
            onChange={handleInputChange}
            placeholder='Username'
            required
          />
        </div>
        <div class='control'>
          <input
            type='email'
            name='email'
            value={newUser.email}
            onChange={handleInputChange}
            placeholder='Email'
            required
          />
        </div>
        <div class='control'>
          <input
            type='text'
            name='street'
            value={newAddress.street}
            onChange={handleAddressChange}
            placeholder='Street'
            required
          />
        </div>
        <div class='control'>
          <input
            type='text'
            name='suite'
            value={newAddress.suite}
            onChange={handleAddressChange}
            placeholder='Suite'
          />
        </div>
        <div class='control'>
          <input
            type='text'
            name='website'
            value={newUser.website}
            onChange={handleInputChange}
            placeholder='Website'
          />
        </div>

        <div class='control'>
          <input
            type='text'
            name='company.name'
            value={newUser.company.name}
            onChange={handleInputChange}
            placeholder='Company Name'
          />
        </div>

        <div class='control'>
          <input
            type='text'
            name='company.catchPhrase'
            value={newUser.company.catchPhrase}
            onChange={handleInputChange}
            placeholder='Catch Phrase'
          />
        </div>

        <div class='control'>
          <input
            type='text'
            name='company.bs'
            value={newUser.company.bs}
            onChange={handleInputChange}
            placeholder='Business'
          />
        </div>
        <div className='field is-grouped'>
          <div className='control'>
            <button type='submit' className='button is-link'>
              Add User
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
