const { vehicleTypes, outputTypes, allowedTime, ratePerHour } = require("../constants/constant");
const { checkAvailability,
  bookSingleTrack,
  calculateRate,
  additionalRate,
  getVehicleFromVehicleNumber,
  deepClone
} = require("./helper");

class Track {
  constructor() {
    this.regularObj = {
      totalTrack: 2,
      totalRate: 0,
      tracks: [
        { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
        { id: 2, name: 'track2', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
      ]
    };
    this.vipObj = {
      totalTrack: 1,
      totalRate: 0,
      tracks: [
        { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
      ],
    };
    this.bikeTrack = {
      totalRate: 0,
      totalTracks: 4,
      tracks: [
        { id: 1, name: "track1", vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
        { id: 2, name: "track2", vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
        { id: 3, name: "track3", vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
        { id: 4, name: "track4", vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
      ]
    };
    this.carTrack = {
      regularTrack: deepClone(this.regularObj),
      vipTrack: deepClone(this.vipObj),
    };
    this.suvTrack = {
      regularTrack: deepClone(this.regularObj),
      vipTrack: deepClone(this.vipObj)
    };
  }

  bookBikeTrack({ vehicleNumber, entryTime }) {
    let trackArr = [...this.bikeTrack.tracks];
    let trackId = checkAvailability({ trackArr, entryTime });
    if (trackId) {
      let bookedTrack = bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime });
      let actualRate = calculateRate(this.bikeTrack.totalRate, ratePerHour.bike, allowedTime.fullHours)
      this.bikeTrack.tracks = bookedTrack;
      this.bikeTrack.totalRate = actualRate;
      return outputTypes.SUCCESS;
    } else {
      return outputTypes.RACETRACK_FULL;
    }
  }
  bookCarTrack({ vehicleNumber, entryTime }) {
    for (let obj in this.carTrack) {
      let trackArr = [...this.carTrack[obj].tracks];
      let trackId = checkAvailability({ trackArr, entryTime });
      if (trackId) {
        let bookedTrack = bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime });
        let trackRate = obj === 'regularTrack' ? ratePerHour.carsRegular : ratePerHour.carsVip;
        let actualRate = calculateRate(this.carTrack[obj].totalRate, trackRate, allowedTime.fullHours);
        this.carTrack[obj].tracks = bookedTrack;
        this.carTrack[obj].totalRate = actualRate;
        return outputTypes.SUCCESS;
      }
    }
    return outputTypes.RACETRACK_FULL;
  }

  bookSuvTrack({ vehicleNumber, entryTime }) {
    for (let obj in this.suvTrack) {
      let trackArr = [...this.suvTrack[obj].tracks];
      let trackId = checkAvailability({ trackArr, entryTime });
      if (trackId) {
        let bookedTrack = bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime });
        let trackRate = obj === 'regularTrack' ? ratePerHour.suvRegular : ratePerHour.suvVip;
        let actualRate = calculateRate(this.suvTrack[obj].totalRate, trackRate, allowedTime.fullHours);
        this.suvTrack[obj].tracks = bookedTrack;
        this.suvTrack[obj].totalRate = actualRate;
        return outputTypes.SUCCESS;
      }
    }
    return outputTypes.RACETRACK_FULL;
  }
  bookTrack({ vehicle, vehicleNumber, entryTime }) {
    if (vehicle === vehicleTypes.BIKE) {
      return this.bookBikeTrack({ vehicleNumber, entryTime })
    } else if (vehicle === vehicleTypes.CAR) {
      return this.bookCarTrack({ vehicleNumber, entryTime })
    } else if (vehicle === vehicleTypes.SUV) {
      return this.bookSuvTrack({ vehicleNumber, entryTime });
    }
  }

  bookAdditionalTimeBike(vehicleNumber, exitTime) {
    let bikeTrackArray = this.bikeTrack.tracks;
    let vehicle;
    vehicle = getVehicleFromVehicleNumber('bike', bikeTrackArray, vehicleNumber);

    if (vehicle) {
      let rate = additionalRate(vehicle.exitTime, exitTime, this.bikeTrack.totalRate);
      this.bikeTrack.totalRate = rate;
      return outputTypes.SUCCESS;
    }
  }
  bookAdditionalTimeCar(vehicleNumber, exitTime) {
    let carRegular = this.carTrack.regularTrack.tracks;
    let carVip = this.carTrack.vipTrack.tracks;
    let vehicle;

    vehicle = getVehicleFromVehicleNumber('carRegular', carRegular, vehicleNumber);
    if (vehicle) {
      let rate = additionalRate(vehicle.exitTime, exitTime, this.carTrack.regularTrack.totalRate);
      this.carTrack.regularTrack.totalRate = rate;
      return outputTypes.SUCCESS;
    }

    vehicle = getVehicleFromVehicleNumber('carVip', carVip, vehicleNumber);
    if (vehicle) {
      let rate = additionalRate(vehicle.exitTime, exitTime, this.carTrack.vipTrack.totalRate);
      this.carTrack.vipTrack.totalRate = rate;
      return outputTypes.SUCCESS;
    }
  }

  bookAdditionalTimeSuv(vehicleNumber, exitTime) {
    let suvRegular = this.suvTrack.regularTrack.tracks;
    let suvVip = this.suvTrack.vipTrack.tracks;
    let suv;
    suv = getVehicleFromVehicleNumber('suvRegular', suvRegular, vehicleNumber);
    if (suv) {
      let rate = additionalRate(suv.exitTime, exitTime, this.suvTrack.regularTrack.totalRate);
      this.suvTrack.regularTrack.totalRate = rate;
      return outputTypes.SUCCESS;
    };

    suv = getVehicleFromVehicleNumber('suvVip', suvVip, vehicleNumber)
    if (suv) {
      let rate = additionalRate(suv.exitTime, exitTime, this.suvTrack.vipTrack.totalRate);
      this.suvTrack.vipTrack.totalRate = rate;
      return outputTypes.SUCCESS;
    }

  }
  additionalTime({ vehicleNumber, exitTime }) {

    let bike = this.bookAdditionalTimeBike(vehicleNumber, exitTime)
    if (bike) return bike;

    let car = this.bookAdditionalTimeCar(vehicleNumber, exitTime);
    if (car) return car;

    let suv = this.bookAdditionalTimeSuv(vehicleNumber, exitTime);
    if (suv) return suv;
  }

  calculateRevenue() {
    let bikeRevenue = this.bikeTrack.totalRate;
    let carRegularRevenue = this.carTrack.regularTrack.totalRate;
    let carVipRevenue = this.carTrack.vipTrack.totalRate;
    let suvRegularRevenue = this.suvTrack.regularTrack.totalRate;
    let suvVipRevenue = this.suvTrack.vipTrack.totalRate;
    return {
      regular: bikeRevenue + suvRegularRevenue + carRegularRevenue,
      vip: suvVipRevenue + carVipRevenue
    };
  }
}
module.exports = Track;
