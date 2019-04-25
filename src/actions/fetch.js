import { config } from '../config';
import setParamsToLink from '../services/setParamsToLink';

export function jsonToState(data) {
  return {
    type: "FETCH_TO_STATE",
    payload: data,
  };
};

export function jsonToStateAditional(data, name) {
  return {
    type: "FETCH_TO_STATE_ADITIONAL",
    nameJson: name,
    aditionalJson: data
  };
};

export function fetchData(aditionalJSON) {
  return (dispatch, useState) => {
    // let path = (useState().state.urlPathNow === '/')?
    //   '/trending/all/day'                //default path if path = '/' 
    //   : useState().state.urlPathNow;

    let path = useState().state.urlPathNow;
    let paramsObj = useState().state.urlParams; // params in store
    
    if(aditionalJSON) {
      path = aditionalJSON.path;
      paramsObj = aditionalJSON.paramsObj || {};
      var nameJson = aditionalJSON.nameJson;
    }


    let linkApi = config.urlLink(path); // compose Api link with config
    let url = setParamsToLink(linkApi, paramsObj); // add params to link

    fetch(url)
      .then(response=>{
        if(response.status===200){
          return response.json()
        }
      })
      .then(json=> {
        if(json.url === '/') return; // not update json in store, because it's 2 more gonna put aditional fetches in Landing
        aditionalJSON ? dispatch(jsonToStateAditional(json, nameJson))
        : dispatch(jsonToState(json));
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
  };
};