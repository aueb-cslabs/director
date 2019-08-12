export default function actions(terminals) { 
  return [
    {
      icon: 'sign-out-alt',
      color: 'primary',
      action: 'Sign Out',
      command: 'signout',
      valid: () => terminals.some(t => t.status == "LOGGED_IN"),
    },
    {
      icon: 'undo',
      color: 'danger',
      action: 'Restart',
      command: 'restart',
      valid: () => terminals.some(t => t.status != "OFFLINE"),
    },
    {
      icon: 'power-off',
      color: 'danger',
      action: 'Shuwdown',
      command: 'shutdown',
      valid: () => terminals.some(t => t.status != "OFFLINE"),
    },
  ];
}