import { config } from '../config';
import setParamsToLink from '../services/setParamsToLink';

export function jsonToState(data) {
  return {
    type: "FETCH_TO_STATE",
    payload: data,
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