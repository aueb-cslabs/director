import * as Actions from '../actions/terminals';

export default (state, action) => {
  switch (action.type) {

    case Actions.LOAD_TERMINAL: {
      return {
        ...state,
        loaded: action.terminal,
        modal: undefined,
      }
    }

    case Actions.UPDATE_TERMINALS: {
      return {
        ...state,
        all: action.terminals.map(terminal =>
          Object.assign(state.all.find(t => t.id = terminal.id) || {}, terminal)
        ),
      }
    }

    case 'SELECT_TERMINAL': {
      return {
        ...state,
        all: state.all.map((terminal) => {
          if (terminal.name === action.name) {
            terminal.selected = !terminal.selected;
          }
          return terminal;
        }),
      };
    }
    case 'SELECT_TERMINAL_ROW': {
      const selected = !state.all
          .filter((t) => t.pos_x === action.num)
          .every((t) => t.selected);
      return {
        ...state,
        all: state.all.map((terminal) => {
          if (terminal.pos_x === action.num) {
            terminal.selected = selected;
          }
          return terminal;
        }),
      };
    }
    case 'SELECT_TERMINAL_COLUMN': {
      const selected = !state.all
          .filter((t) => t.pos_y === action.num)
          .every((t) => t.selected);
      return {
        ...state,
        all: state.all.map((terminal) => {
          if (terminal.pos_y === action.num) {
            terminal.selected = selected;
          }
          return terminal;
        }),
      };
    }

    case 'SEARCH_TERMINAL': {
      return {
        ...state,
        search: action.query,
        all: state.all.map((terminal) => ({
          ...terminal,
          fade: !terminal.name.includes(action.query)
        })),
      }
    }

    case Actions.OPEN_MODAL: {
      return {
        ...state,
        modal: action.id,
      }
    }
    case Actions.CLOSE_MODAL: {
      return {
        ...state,
        modal: undefined,
      }
    }

    default: return {...state}
  }
};
