// import cookieHelper from './cookieHelper'

class HttpService {

  send(url, method, data) {

    let options = {};
    if(method) options.method = method;
    if(data) options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json-patch+json",
      "Accept": "application/json"
    };
    // let token = cookieHelper.get("token");
    if(token) options.headers.Authorization = `Bearer ${token}`;

    return fetch(url, options);  
  }
}

const httpService = new HttpService;

export default httpService;