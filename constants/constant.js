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

const timeInHours = {
  startHour: 13,
  endHour: 20,
  fullHours: 3,
  lastStartHour: 17,
  minutesSeconds: 60,
  milliseconds: 1000,
}
const allowedTime = {
  startTime: timeInHours.startHour * timeInHours.minutesSeconds * timeInHours.minutesSeconds * timeInHours.milliseconds,
  endTime: timeInHours.endHour * timeInHours.minutesSeconds * timeInHours.minutesSeconds * timeInHours.milliseconds,
  fullTime: timeInHours.fullHours * timeInHours.minutesSeconds * timeInHours.minutesSeconds * timeInHours.milliseconds,
  lastStartTime: timeInHours.lastStartHour * timeInHours.minutesSeconds * timeInHours.minutesSeconds * timeInHours.milliseconds,
  initialMinutes: 15,
  fullHours: timeInHours.fullHours,
};

const ratePerHour = {
  bike: 60,
  carsRegular: 120,
  carsVip: 250,
  suvRegular: 200,
  suvVip: 300,
  extraRatePerHour: 50,
}
const vehicleTypes = {
  BIKE: 'BIKE',
  CAR: 'CAR',
  SUV: 'SUV',
}
module.exports = { inputNames, allowedTime, outputTypes, ratePerHour, vehicleTypes };
