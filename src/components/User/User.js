import React from 'react'

export function User ({ user, selectedUser, onUserClick, onDelete, onEdit }) {
  const handleDelete = () => {
    onDelete(user.id)
  }

  return (
    <div className='card user-item' onClick={() => onUserClick(user)}>
      <header className='card-header'>
        <p className='card-header-title'>
          {user.name} ({user.username})
        </p>
        <span className='card-header-icon' aria-label='more options'>
          <span className='icon'>
            <i className='fas fa-angle-down' aria-hidden='true'></i>
          </span>
        </span>
      </header>
      {selectedUser === user && (
        <div className='card-content user-details'>
          <div className='content'>
            <table className='table is-bordered is-striped'>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    {user.address.street}, {user.address.suite},{' '}
                    {user.address.city}, {user.address.zipcode}
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <td>Website:</td>
                  <td>{user.website}</td>
                </tr>
                <tr>
                  <td>Company:</td>
                  <td>{user.company.name}</td>
                </tr>
                <tr>
                  <td>Catchphrase:</td>
                  <td>{user.company.catchPhrase}</td>
                </tr>
                <tr>
                  <td>Business:</td>
                  <td>{user.company.bs}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <footer className='card-footer'>
            <button
              className='card-footer-item button is-danger'
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              className='card-footer-item button is-warning'
              onClick={() => onEdit(user)}
            >
              Edit
            </button>
          </footer>
        </div>
      )}
    </div>
  )
}
