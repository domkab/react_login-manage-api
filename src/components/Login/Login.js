import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { getProfile } from '../../api/api.js'
import 'bulma/css/bulma.css'

export function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()
    console.log('handleLogin called')
    try {
      const profile = await getProfile()
      console.log('Profile fetched:', profile)
      if (profile.username === username && profile.password === password) {
        console.log('Credentials match')
        login(profile)
        navigate('/')
      } else {
        console.error('Invalid credentials')
        setError('Invalid credentials')
      }
    } catch (e) {
      console.error('Error logging in:', e)
      setError('Error logging in')
    }
  }
  return (
    <section className='section'>
      <div className='container'>
        <div className='columns is-centered'>
          <div className='column is-one-third'>
            <form onSubmit={handleLogin} className='box'>
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
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <div className='notification is-danger'>{error}</div>}

              <div className='field'>
                <div className='control'>
                  <button
                    type='submit'
                    className='button is-link'
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
