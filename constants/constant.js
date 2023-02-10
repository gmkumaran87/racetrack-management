const inputNames = {
  BOOK: "BOOK",
  ADDITIONAL: "ADDITIONAL",
  REVENUE: "REVENUE",
};

const outputTypes = {
  SUCCESS: "SUCCESS",
  INVALID_ENTRY_TIME: "INVALID_ENTRY_TIME",
  INVALID_EXIT_TIME: "INVALID_EXIT_TIME",
  RACETRACK_FULL: "RACETRACK_FULL",
};

const allowedTime = {
  startTime: 13 * 60 * 60 * 1000,
  endTime: 20 * 60 * 60 * 1000,
};

module.exports = { inputNames, allowedTime, outputTypes };
