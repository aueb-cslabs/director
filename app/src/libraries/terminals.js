import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const actions = (terminals) => { 
  return [
    {
      icon: 'sign-out-alt',
      color: 'primary',
      action: 'Sign Out',
      command: 'signout',
      valid: () => terminals.some(t => t.status === "LOGGED_IN"),
    },
    {
      icon: 'undo',
      color: 'danger',
      action: 'Restart',
      command: 'restart',
      valid: () => terminals.some(t => t.status !== "OFFLINE"),
    },
    {
      icon: 'power-off',
      color: 'danger',
      action: 'Shutdown',
      command: 'shutdown',
      valid: () => terminals.some(t => t.status !== "OFFLINE"),
    },
  ];
}

export const status = () => {
  return '';
}

export const operatingIcon = (icon, size=undefined) => {
  switch (icon) {
      case 'darwin': return <FontAwesomeIcon icon={['fab', 'apple']} size={size}/>;
      case 'windows': return <FontAwesomeIcon icon={['fab', 'windows']} size={size}/>;
      case 'linux': return <FontAwesomeIcon icon={['fab', 'linux']} size={size}/>;
      default: return '';
  }
}

export const color = (status) => {
  switch (status) {
      case 'ONLINE': return '#399e5a'
      case 'LOCKED': return '#b3001b'
      case 'OFFLINE': return '#333333'
      default: return '#f2af29'
  }
}

export const icon = (status) => {
  switch (status) {
      case 'ONLINE': return <FontAwesomeIcon icon={'check'}/>
      case 'LOCKED': return <FontAwesomeIcon icon={'lock'}/>
      default: return <FontAwesomeIcon icon={'power-off'}/>
  }
}
