import history from '../history';
import historyParamsToObj from '../services/historyParamsToObj';

const initialState = {
  json:{},
  urlParams: historyParamsToObj(history.location.search),
  urlPathNow: history.location.pathname,
  loadingCount: 0,
}

export function state(state = initialState, action) {
  let newState = {...state};
  switch (action.type) {
    case 'FETCH_TO_STATE':
      newState.json = action.payload;
      return newState;
    case 'RESET_RESULTS_IN_STORE':
      newState.json = {};
      return newState;
    case 'HISTORY_UPDATE':
      newState.urlPathNow = action.payload;
      return newState;
    case 'PAGE_CHANGE':
      newState.urlParams.page = action.payload;
      return newState;
    case 'URL_PARAMS_CHANGE':
      newState.urlParams = {...newState.urlParams,...action.payload};
      return newState;
    case 'URL_PARAMS_SET':
      newState.urlParams = {...action.payload};
      return newState;
    case 'LOADING_COUNT':
      newState.loadingCount +=1;
      return newState;
    default:
      return state;
  }
}