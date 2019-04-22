import history from '../history';

const initialState = {
  json:{},
  urlParams: {
    page:1,
  },
  urlPathNow: history.location.pathname
}

export function state(state = initialState, action) {
  let newState = {...state};
  switch (action.type) {
    case 'FETCH_TO_STATE':
      newState.json = action.payload;
      return newState;
    case 'HISTORY_UPDATE':
      newState.urlPathNow = action.payload;
      return newState;
    case 'PAGE_CHANGE':
      newState.urlParams.page = action.payload;
      return newState;

    default:
      return state;
  }
}