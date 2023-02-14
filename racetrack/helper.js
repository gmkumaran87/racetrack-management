const { allowedTime, ratePerHour } = require("../constants/constant");
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
    if (trackArr[i].exitTime === undefined || trackArr[i].exitTime <= entryTime) {
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

const additionalRate = (exitTime, additionalTime, rate) => {
  let [actualHour, actualMinutes] = millisecondsToHoursMinutes(exitTime);

  let [additionalHour, additionalMinutes] = millisecondsToHoursMinutes(additionalTime);

  if (actualHour === additionalHour && additionalMinutes <= allowedTime.initialMinutes) {
    rate = rate;
  } else if (actualHour === additionalHour && additionalMinutes > allowedTime.initialMinutes) {
    rate = rate + ratePerHour.extraRatePerHour;
  } else if (actualHour < additionalHour) {
    rate = rate + (ratePerHour.extraRatePerHour * (1 + additionalHour - actualHour))
  }
  return rate;
};
const getVehicleFromVehicleNumber = (vehicleType, arr, vehicleNumber) => {

  return arr
    .filter(el => el.vehicleNumber === vehicleNumber)
    .map(el => ({ vehicleType, id: el.id, vehicleNumber, exitTime: el.exitTime }))[0]
}

const deepClone = (obj) => {
  let newObj;
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    newObj = {};
  } else if (Object.prototype.toString.call(obj) === '[object Array]') {
    newObj = [];
  }

  if (typeof obj !== 'object' || obj === null) {

    return obj;
  }
  for (let key in obj) {
    newObj[key] = deepClone(obj[key]);
  }
  return newObj;

}
module.exports = {
  convertTimestamp,
  checkEntryTime,
  checkExitTime,
  checkAvailability,
  bookSingleTrack,
  calculateRate,
  millisecondsToHoursMinutes,
  additionalRate,
  getVehicleFromVehicleNumber,
  deepClone
};
