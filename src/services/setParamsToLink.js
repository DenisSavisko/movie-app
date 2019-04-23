export default (link, paramsObj)=>{
  let url = new URL(link);
  Object.keys(paramsObj).forEach(           //setting params to url
    param => url.searchParams.set(param, paramsObj[param])
  );
  return url;
}