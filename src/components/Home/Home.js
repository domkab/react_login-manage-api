import React, { useEffect, useState } from 'react'
import { getProfile } from '../../api/api.js'
import { Profile } from '../Profile/Profile.js'
import { ProfileTasks } from '../Profile/ProfileTasks.js'

export function Home () {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile().then(fetchedProfile => {
      setProfile(fetchedProfile)
    })
  }, [])

  const handleProfileUpdate = updatedProfile => {
    setProfile(updatedProfile)
  }

  return (
    <div className='section'>
      <div className='container'>
        {profile ? (
          <>
            <h1 className='title'>Hello, {profile.name}</h1>
            <Profile
              initialProfile={profile}
              onProfileUpdate={handleProfileUpdate}
            />
            <ProfileTasks profileId={profile.id} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

// "profile": {
//   "name": "Namie Surnamie",
//   "username": "a",
//   "password": "1",
//   "id": "1"
// },
