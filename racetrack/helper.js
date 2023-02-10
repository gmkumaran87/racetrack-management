const { allowedTime } = require("../constants/constant");

const convertTimestamp = (timestamp) => {
  let [hours, minutes] = timestamp.split(":");

  let milliseconds =
    Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000;
  return milliseconds;
};

const checkEntryTime = (entryTime) => {

  if (entryTime < allowedTime.startTime || entryTime > allowedTime.endTime) {
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

const checkAvailability = (trackObj) => {

  let n = trackObj.length;
  for (let i = 0; i < n; i++) {
    if (trackObj[i].exitTime === undefined) {
      return trackObj[i].id;
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

module.exports = {
  convertTimestamp,
  checkEntryTime,
  checkExitTime,
  checkAvailability,
  bookSingleTrack,
  calculateRate,
};
