import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sections = [
    {
        icon: 'desktop',
        path: '/',
        title: 'Terminals'
    },
    {
        icon: 'user',
        path: '/user',
        title: 'Users'
    },
    {
        icon: 'users',
        path: '/sessions',
        title: 'Sessions'
    }
].map(section => ({
  ...section,
  element: [
    <FontAwesomeIcon fixedWidth className="mr-1" icon={section.icon} />,
    <span>{section.title}</span>
  ]
}));

export default sections;