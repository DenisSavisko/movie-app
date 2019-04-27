export default date => {
  let newDate = new Date(date);
  newDate = `${newDate}`;
  newDate = `${newDate.slice(4, 10)},${newDate.slice(10, 15)}`;
  return newDate;
};
