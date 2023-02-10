const fs = require("fs");
const { inputNames, outputTypes } = require("./constants/constant");
const { convertTimestamp, checkEntryTime } = require("./racetrack/helper");
const Utility = require("./racetrack/utility.class");

const utility = new Utility();
const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw new Error("Could not read file", filename);

  const inputLines = data.toString().replace(/\r/g, "").split("\n");

  for (const line of inputLines) {
    const action = line.split(" ")[0];
    const restParams = line.split(" ").slice(1);

    console.log(action, restParams);

    switch (action) {
      case inputNames.BOOK: {
        let [vehicle, vehicleNumber, entryTime] = restParams;
        let timestamp = convertTimestamp(entryTime);
        if (!checkEntryTime(timestamp)) {
          utility.invalidEntryExitTime(outputTypes.INVALID_ENTRY_TIME);
          break;
        }
        break;
      }
      case inputNames.ADDITIONAL:
        break;
      case inputNames.REVENUE:
        break;
      default:
        throw new Error("Invalid action");
    }
  }
});
