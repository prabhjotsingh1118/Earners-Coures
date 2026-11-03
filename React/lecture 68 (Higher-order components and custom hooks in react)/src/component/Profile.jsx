import React from 'react'
import withAuth from '../utils/withAuth'

function Profile({ name, role }) {
  return (
    <div>
      Profile page

      <p>Name: {name}</p>
      <p>Role: {role}</p>

    </div>

  )
}


export const AuthProfile = withAuth(Profile) 