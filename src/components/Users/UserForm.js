import React from 'react'
import './Users.scss'

export function UserForm ({
  newUser,
  newAddress,
  handleInputChange,
  handleAddressChange,
  handleFormSubmit
}) {
  return (
    <form onSubmit={handleFormSubmit} className='form'>
      <div className='columns'>
        <div className='column'>
          <div className='field'>
            <label className='label' htmlFor='name'>
              Name
            </label>

            <div className='control'>
              <input
                type='text'
                name='name'
                value={newUser.name}
                onChange={handleInputChange}
                placeholder='Name'
                required
                className='input'
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
                value={newUser.username}
                onChange={handleInputChange}
                placeholder='Username'
                required
                className='input'
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='email'>
              Email
            </label>

            <div className='control'>
              <input
                type='email'
                name='email'
                value={newUser.email}
                onChange={handleInputChange}
                placeholder='Email'
                required
                className='input'
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='street'>
              Street
            </label>

            <div className='control'>
              <input
                type='text'
                name='street'
                value={newAddress.street}
                onChange={handleAddressChange}
                placeholder='Street'
                required
                className='input'
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='suite'>
              Suite
            </label>

            <div className='control'>
              <input
                type='text'
                name='suite'
                value={newAddress.suite}
                onChange={handleAddressChange}
                placeholder='Suite'
                className='input'
              />
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='field'>
            <label className='label' htmlFor='website'>
              Website
            </label>

            <div className='control'>
              <input
                type='text'
                name='website'
                value={newUser.website}
                onChange={handleInputChange}
                placeholder='Website'
                className='input'
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='companyName'>
              Company name
            </label>

            <div className='control'>
              <input
                type='text'
                name='company.name'
                value={newUser.company.name}
                onChange={handleInputChange}
                placeholder='Company Name'
                className='input'
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='catchPhrase'>
              Catch Phrase
            </label>

            <div className='control'>
              <input
                type='text'
                name='company.catchPhrase'
                value={newUser.company.catchPhrase}
                onChange={handleInputChange}
                placeholder='Catch Phrase'
                className='input'
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='business'>
              Business
            </label>

            <div className='control'>
              <input
                type='text'
                name='company.bs'
                value={newUser.company.bs}
                onChange={handleInputChange}
                placeholder='Business'
                className='input'
              />
            </div>
          </div>

          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <button type='submit' className='user__add-button button is-link'>
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
