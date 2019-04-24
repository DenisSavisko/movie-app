import history from '../history';
import setParamsToLink from '../services/setParamsToLink';
import historyParamsToObj from '../services/historyParamsToObj';

import {fetchData} from './fetch';

export function pageToState(page) {
  return {
    type: "PAGE_CHANGE",
    payload: page,
  };
};

export function handleHistoryOnChange(pathname, search){
  return (dispatch) => {
    dispatch({type:'URL_PARAMS_SET', payload:historyParamsToObj(search)}); //set urlParams in store to params from link;
    dispatch({type:'HISTORY_UPDATE', payload:pathname}); // location to redux
    dispatch({type:'RESET_RESULTS_IN_STORE'}); //set results in store to 0;
    dispatch({type:'LOADING_COUNT'}); // count ++ to fetch data with params when history changed;
  }
}

export const handlePageChange = e =>{
  return(dispatch, useState)=>{
    let page = useState().json.page;
    switch(e.target.value){
      case 'prev':
        dispatch(pageToState(page-1));
        break;
      case 'next':
        dispatch(pageToState(page+1));
        break;
      default:
        dispatch(pageToState(page+e.target.value));
        break;
    }
    let path = useState().state.urlPathNow;
    let paramsObj = useState().state.urlParams;
    let url = setParamsToLink(('http://www.example.com'+path), paramsObj); // add params to link
    url = url.pathname+ url.search; // use only path and search
    history.push(url);

    dispatch(fetchData());
  }
};


// export function urlParamsChange(obj) {
//   return {
//     type: "URL_PARAMS_CHANGE",
//     payload: obj,
//   };
// };


// export const handleParamsChange = e =>{

//   // define which button was clicked
//   // change all params or only one
//   // history push link with params
// }