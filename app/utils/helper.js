var helper = {};

helper.isDateFromLessThanDateTo = function(dateFrom, dateTo) {
  return new Date(dateTo).getDate() > new Date(dateFrom).getDate();
};

module.exports = helper;
