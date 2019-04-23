export default function historyParamsToObj(string){
  let searchParams = new URLSearchParams(string);
  let arrParams = [];
  let objParams = {};
  for(var pair of searchParams.entries()) { arrParams.push(pair); }
  arrParams.forEach( pair => objParams[pair[0]] = pair[1] );
  return objParams;
}