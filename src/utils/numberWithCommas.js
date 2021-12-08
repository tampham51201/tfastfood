const numberWithCommas = (num) => {
  const number = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // return "$".concat(number.substring(0, number.length - 3));
  return "$".concat(number);
};

export default numberWithCommas;
