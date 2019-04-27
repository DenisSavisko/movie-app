export function json(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case 'FETCH_TO_STATE':
      newState = action.payload;
      return newState;
    case 'RESET_RESULTS_IN_STORE':
      newState = {};
      return newState;
    case 'FETCH_TO_STATE_ADITIONAL':
      newState = { ...newState, [action.nameJson]: action.aditionalJson };
      return newState;
    default:
      return state;
  }
}
