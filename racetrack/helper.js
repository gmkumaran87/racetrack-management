const { allowedTime } = require("../constants/constant");

const convertTimestamp = (timestamp) => {
  let [hours, minutes] = timestamp.split(":");

  let milliseconds =
    Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 60 * 1000;
  return milliseconds;
};

const checkEntryTime = (entryTime) => {
  if (entryTime < allowedTime.startTime && entryTime > allowedTime.endTime) {
    return false;
  }
  return true;
};

module.exports = { convertTimestamp, checkEntryTime };
