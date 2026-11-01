import React from 'react'
import withAuth from '../utils/withAuth'

function Profile({name , role}) {
  return (
    <div>Profile page</div>
  )
}


export const AuthProfile = withAuth(Profile) 