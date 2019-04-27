export default function historyParamsToObj(string) {
  const searchParams = new URLSearchParams(string);
  const arrParams = [];
  const objParams = {};
  for (const pair of searchParams.entries()) {
    arrParams.push(pair);
  }
  arrParams.forEach(pair => (objParams[pair[0]] = pair[1]));
  return objParams;
}
