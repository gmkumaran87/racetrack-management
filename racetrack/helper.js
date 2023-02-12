const { allowedTime } = require("../constants/constant");
const convertTimestamp = (timestamp) => {
  let [hours, minutes] = timestamp.split(":");

  let milliseconds =
    Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000;
  return milliseconds;
};

const millisecondsToHoursMinutes = (milliseconds) => {
  let time = new Date(milliseconds).toISOString().slice(11, 16).split(":").map(el => Number(el));
  return time;

}
const checkEntryTime = (entryTime) => {

  if (entryTime < allowedTime.startTime || entryTime > allowedTime.lastStartTime) {
    return false;
  }
  return true;
};

const checkExitTime = (exitTime) => {
  if (exitTime > allowedTime.endTime) {
    return false;
  }
  return true;
}

const checkAvailability = ({ trackArr, entryTime }) => {
  let n = trackArr.length;
  for (let i = 0; i < n; i++) {
    if (trackArr[i].exitTime === undefined || trackArr[i].exitTime < entryTime) {
      return trackArr[i].id;
    }
  }
  return false;
}

const bookSingleTrack = ({ trackArr, trackId, vehicleNumber, entryTime, }) => {
  return trackArr.map(track => {
    let bookedTrack;
    if (track.id === trackId) {
      bookedTrack = { ...track, vehicleNumber: vehicleNumber, entryTime: entryTime, exitTime: entryTime + allowedTime.fullTime }
    } else {
      bookedTrack = track;
    }
    return bookedTrack;
  })
}

const calculateRate = (initialRate, vehicleRate, hours) => {
  return initialRate + (vehicleRate * hours);
}
/*
const */
module.exports = {
  convertTimestamp,
  checkEntryTime,
  checkExitTime,
  checkAvailability,
  bookSingleTrack,
  calculateRate,
  millisecondsToHoursMinutes,
  // getVehicleFromVehicleNumber
};
