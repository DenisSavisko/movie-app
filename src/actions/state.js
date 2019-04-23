import { config } from '../config';
import history from '../history';
import setParamsToLink from '../services/setParamsToLink';


export function jsonToState(data) {
  return {
    type: "FETCH_TO_STATE",
    payload: data,
  };
};

export function pageToState(page) {
  return {
    type: "PAGE_CHANGE",
    payload: page,
  };
};

export function urlParamsChange(obj) {
  return {
    type: "URL_PARAMS_CHANGE",
    payload: obj,
  };
};

export function fetchData() {
  return (dispatch, useState) => {

    let path = (useState().state.urlPathNow === '/')?
      '/trending/all/day'                //default path if path = '/' 
      : useState().state.urlPathNow;

    let linkApi = config.urlLink(path); // compose Api link with config
    let paramsObj = useState().state.urlParams; // params in store
    let url = setParamsToLink(linkApi, paramsObj); // add params to link

    fetch(url)
      .then(response=>{
        if(response.status===200){
          return response.json()
        }
      })
      .then(json=> {
        dispatch(jsonToState(json));
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
  };
};

// export const handleParamsChange = e =>{

//   // define which button was clicked
//   // change all params or only one
//   // history push link with params
// }

export const handlePageChange = e =>{
  return(dispatch, useState)=>{
    let page = useState().state.json.page;
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