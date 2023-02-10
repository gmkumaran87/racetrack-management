const { vehicleTypes, outputTypes, allowedTime } = require("../constants/constant");
const { checkAvailability, bookSingleTrack } = require("./helper");

class Track {
  constructor() {
    this.bikeTrack = {
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
        availableTrack: 2,
        tracks: [
          { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
          { id: 2, name: 'track2', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
        ]
      },
      vipTrack: {
        totalTrack: 1,
        availableTrack: 1,
        tracks: [
          { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
        ],
      }
    };
    this.suvTrack = {
      regularTrack: {
        totalTrack: 1,
        tracks: [
          { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
        ]
      },
      vipTrack: {
        totalTrack: 1,
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
      this.bikeTrack.tracks = bookedTrack;

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
        this.carTrack[obj].tracks = bookedTrack;
        return outputTypes.SUCCESS;
      }
    }
    return outputTypes.RACETRACK_FULL;
  }

  bookSuvTrack({ vehicleNumber, entryTime }) {
    // console.log('Inside car track');
    for (let obj in this.suvTrack) {
      let trackArr = [...this.suvTrack[obj].tracks];
      // console.log('Car tracks', trackArr)
      let trackId = checkAvailability(trackArr);

      if (trackId) {
        let bookedTrack = bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime });
        this.suvTrack[obj].tracks = bookedTrack;
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
