export default function historyParamsToObj(string) {
  const searchParams = new URLSearchParams(string);
  const arrParams = [];
  const objParams = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const pair of searchParams.entries()) {
    arrParams.push(pair);
  }
  arrParams.forEach(pair => {
    [, objParams[pair[0]]] = pair;
  });
  return objParams;
}
