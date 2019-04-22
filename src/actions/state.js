import { config } from '../config';

export function jsonToState(data) {
  return {
    type: "FETCH_TO_STATE",
    payload: data,
  };
}

export function pageToState(page) {
  return {
    type: "PAGE_CHANGE",
    payload: page,
  };
}

export function pageChange(page) {
  return (dispatch) => {
    dispatch(pageToState(page));
    dispatch(fetchData());
  }
};

export function fetchData() {
  return (dispatch, useState) => {
    let link;
    switch(useState().state.urlPathNow) {
      case '/people':
        link = config.urlPopularPeople;
        break;
      case '/tv':
        link = config.utlPapularTv;
        break;
      case '/movies':
        link = config.utlPapularMovies;
        break;
      case '/discover':
        link = config.urlDiscover;
        break;
      default:
        link = config.urlGetList;
        break;
    }
    let url = new URL(link);
    let urlParams = useState().state.urlParams;
    Object.keys(urlParams).forEach(           //setting params to url
      param => url.searchParams.set(param, urlParams[param])
      )

    fetch(url)
      .then(response=>response.json())
      .then(json=> {
        // console.log(json);
        return dispatch(jsonToState(json));
      })      
  };
};

export const handlePageChange = e =>{
  return(dispatch, useState)=>{
    let page = useState().state.json.page;
    switch(e.target.value){
      case 'prev':
        return dispatch(pageChange(page-1));
      case 'next':
        return dispatch(pageChange(page+1));
      default:
        return dispatch(pageChange(page+e.target.value));
    }
  }
};