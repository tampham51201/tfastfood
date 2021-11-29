const numberWithCommas = (num) => {
  const number = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return number.substring(0, number.length - 3).concat("$");
};

export default numberWithCommas;
