const fs = require("fs");
const { inputNames, outputTypes } = require("./constants/constant");
const { convertTimestamp, checkEntryTime, checkExitTime } = require("./racetrack/helper");
const Utility = require("./racetrack/utility.class");
const Track = require("./racetrack/track.class");

const utility = new Utility();
const track = new Track();
const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw new Error("Could not read file", filename);

  const inputLines = data.toString().replace(/\r/g, "").split("\n");

  for (const line of inputLines) {
    const action = line.split(" ")[0];
    const restParams = line.split(" ").slice(1);

    switch (action) {
      case inputNames.BOOK: {
        let [vehicle, vehicleNumber, entryTime] = restParams;
        let timestamp = convertTimestamp(entryTime);

        // Validations
        if (!checkEntryTime(timestamp)) {
          utility.invalidEntryExitTime(outputTypes.INVALID_ENTRY_TIME);
          break;
        }
        const status = track.bookTrack({ vehicle, vehicleNumber, entryTime: timestamp });
        utility.printStatus(status);
        break;
      }
      case inputNames.ADDITIONAL: {
        let [vehicleNumber, exitTime] = restParams;
        let timestamp = convertTimestamp(exitTime);
        if (!checkExitTime(timestamp)) {
          utility.invalidEntryExitTime(outputTypes.INVALID_EXIT_TIME);
          break;
        }
        let status = track.additionalTime({ vehicleNumber, exitTime: timestamp });
        utility.printStatus(status);
        break;
      }

      case inputNames.REVENUE:
        let outObj = track.calculateRevenue();
        /* console.log(track.bikeTrack)
         console.log(track.carTrack);
         console.log(track.suvTrack);*/
        utility.printRevenue(outObj)
        break;
      default:
        throw new Error("Invalid action");
    }
  }
});
