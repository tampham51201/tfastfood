// const numberWithCommas = (num) => {
//   const number = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//   // return "$".concat(number.substring(0, number.length - 3));
//   return "$".concat(number);
// };

// export default numberWithCommas;
const numberWithCommas = (num) => {
  const number = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const length = number.toString().length;

  const numberSlice = number.slice(0, length - 3);

  return numberSlice.concat("đ");
};
export const numberWithCommasTotal = (num) => {
  const number = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return number.concat("đ");
};

export default numberWithCommas;
