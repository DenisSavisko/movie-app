import { config } from '../config';
import setParamsToLink from '../services/setParamsToLink';

export function jsonToState(data) {
  return {
    type: 'FETCH_TO_STATE',
    payload: data,
  };
}

export function jsonToStateAditional(data, name) {
  return {
    type: 'FETCH_TO_STATE_ADITIONAL',
    nameJson: name,
    aditionalJson: data,
  };
}

export function fetchData(aditionalJSON) {
  return (dispatch, useState) => {
    let path = useState().state.urlPathNow;
    let paramsObj = useState().state.urlParams; // params in store
    let nameJson;

    if (aditionalJSON) {
      path = aditionalJSON.path || '';
      paramsObj = aditionalJSON.paramsObj || {};
      nameJson = aditionalJSON.nameJson || '';
    }

    const linkApi = config.urlLink(path); // compose Api link with config
    const url = setParamsToLink(linkApi, paramsObj); // add params to link

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        if (json.url === '/') return; // not update json in store, because it's 2 more gonna put aditional fetches in Landing
        if (aditionalJSON) {
          dispatch(jsonToStateAditional(json, nameJson));
        } else {
          dispatch(jsonToState(json));
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(
          `There has been a problem with your fetch operation: ${error.message}`
        );
      });
  };
}
