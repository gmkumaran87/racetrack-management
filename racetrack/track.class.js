const { vehicleTypes, outputTypes, allowedTime, ratePerHour } = require("../constants/constant");
const { checkAvailability, bookSingleTrack, calculateRate } = require("./helper");

class Track {
  constructor() {
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
      regularTrack: {
        totalTrack: 2,
        totalRate: 0,
        tracks: [
          { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
          { id: 2, name: 'track2', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
        ]
      },
      vipTrack: {
        totalTrack: 1,
        totalRate: 0,
        tracks: [
          { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
        ],
      }
    };
    this.suvTrack = {
      regularTrack: {
        totalTrack: 1,
        totalRate: 0,
        tracks: [
          { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
        ]
      },
      vipTrack: {
        totalTrack: 1,
        totalRate: 0,
        tracks: [
          { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
        ],
      }
    };
  }

  bookBikeTrack({ vehicleNumber, entryTime }) {
    let trackArr = [...this.bikeTrack.tracks];

    let trackId = checkAvailability(trackArr);
    if (trackId) {
      // Book a track for bike
      let bookedTrack = bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime });
      let actualRate = calculateRate(this.bikeTrack.totalRate, ratePerHour.bike, 3)
      // console.log('Actual rate', actualRate)
      this.bikeTrack.tracks = bookedTrack;
      this.bikeTrack.totalRate = actualRate;
      // console.log('After booking track', this.bikeTrack);
      return outputTypes.SUCCESS;
    } else {
      return outputTypes.RACETRACK_FULL;
    }
  }
  bookCarTrack({ vehicleNumber, entryTime }) {
    // console.log('Inside car track');
    for (let obj in this.carTrack) {
      let trackArr = [...this.carTrack[obj].tracks];
      // console.log('Car tracks', trackArr)
      let trackId = checkAvailability(trackArr);

      if (trackId) {
        let bookedTrack = bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime });
        let trackRate = obj === 'regularTrack' ? ratePerHour.carsRegular : ratePerHour.carsVip;
        let actualRate = calculateRate(this.carTrack[obj].totalRate, trackRate, 3);

        this.carTrack[obj].tracks = bookedTrack;
        this.carTrack[obj].totalRate = actualRate;
        return outputTypes.SUCCESS;
      }
    }
    return outputTypes.RACETRACK_FULL;
  }

  bookSuvTrack({ vehicleNumber, entryTime }) {
    // console.log('Inside car track');
    for (let obj in this.suvTrack) {
      let trackArr = [...this.suvTrack[obj].tracks];
      let trackId = checkAvailability(trackArr);

      if (trackId) {
        let bookedTrack = bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime });
        let trackRate = obj === 'regularTrack' ? ratePerHour.suvRegular : ratePerHour.suvVip;
        let actualRate = calculateRate(this.suvTrack[obj].totalRate, trackRate, 3);

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
}
module.exports = Track;
