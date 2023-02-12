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
  fullTime: 3 * 60 * 60 * 1000,
  lastStartTime: 17 * 60 * 60 * 1000,
};

const ratePerHour = {
  bike: 60,
  carsRegular: 120,
  carsVip: 250,
  suvRegular: 200,
  suvVip: 300,
}
const vehicleTypes = {
  BIKE: 'BIKE',
  CAR: 'CAR',
  SUV: 'SUV',
}
module.exports = { inputNames, allowedTime, outputTypes, ratePerHour, vehicleTypes };
