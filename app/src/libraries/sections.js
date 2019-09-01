import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default [
  {
      icon: 'desktop',
      path: '/',
      title: 'Terminals',
  },
  {
      icon: 'user',
      path: '/users',
      title: 'Users'
  },
  {
      icon: 'users',
      path: '/sessions',
      title: 'Sessions'
  }
].map(section => ({
  ...section,
  element: <span>
    <FontAwesomeIcon fixedWidth className="mr-1" icon={section.icon} />
    <span className="d-lg-inline d-none">{section.title}</span>
  </span>
}))