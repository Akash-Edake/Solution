export const getDateThreeMonthsFromNow = () => {
  let d = new Date();
  d.setMonth(d.getMonth() - 3);
  return d;
};

export const check_if_zero_empty_null_undefined_NaN_false = (v) => {
  if (typeof v !== "undefined" && v) {
    return false;
  } else {
    return true;
  }
};
