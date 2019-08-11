export default function terminal(state = {}, action) {
  switch (action.type) {
    case 'SELECT_TERMINAL': {
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.name === action.name) {
            terminal.selected = !terminal.selected;
          }
          return terminal;
        }),
      };
    }
    case 'SELECT_TERMINAL_ROW': {
      const selected = !state.terminals
          .filter((t) => t.pos_x === action.num)
          .every((t) => t.selected);
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.pos_x == action.num) {
            terminal.selected = selected;
          }
          return terminal;
        }),
      };
    }
    case 'SELECT_TERMINAL_COLUMN': {
      const selected = !state.terminals
          .filter((t) => t.pos_y === action.num)
          .every((t) => t.selected);
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.pos_y == action.num) {
            terminal.selected = selected;
          }
          return terminal;
        }),
      };
    }
    case 'OPEN_MODAL_TERMINAL': {
      return {
        ...state,
        terminalModal: action.id,
      }
    }
    case 'CLOSE_MODAL_TERMINAL': {
      return {
        ...state,
        terminalModal: undefined,
      }
    }
    default:
      return state;
  }
};
