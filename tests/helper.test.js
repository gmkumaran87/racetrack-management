const { convertTimestamp, millisecondsToHoursMinutes, checkEntryTime, checkExitTime, additionalRate, getVehicleFromVehicleNumber, bookSingleTrack } = require("../racetrack/helper");

describe('Testing the Helper functions', () => {
  test('Convert Timestamp from hours, minutes into milliseconds', () => {

    let time = '17:40';
    expect(convertTimestamp(time)).toBe(63600000);
  })

  test('Convert milliseconds to hours and minutes', () => {
    let milliseconds = 63600000;

    expect(millisecondsToHoursMinutes(milliseconds)).toContain(17);
    expect(millisecondsToHoursMinutes(milliseconds)).toContain(40);

  })

  test('Check the entry time is within the range', () => {
    const time = 39600000;
    expect(checkEntryTime(time)).toBe(false);
    let milliseconds = 46800000;
    expect(checkEntryTime(milliseconds)).toBe(true);

  })

  test('Check the exit time is within the range', () => {
    const time = 73800000;
    expect(checkExitTime(time)).toBe(false);
    let milliseconds = 71000000;
    expect(checkExitTime(milliseconds)).toBe(true);

  })

  test('Return the addition rate for the extended time range', () => {
    let exitTime = 61200000, additionalTime = 63600000, rate = 180;

    expect(additionalRate(exitTime, additionalTime, rate)).toBe(230);
    additionalTime = 65100000;
    expect(additionalRate(exitTime, additionalTime, rate)).toBe(280);

  })

  test('Get vehicle details', () => {
    let arr = [
      { id: 1, name: "track1", vehicleNumber: 'M40', entryTime: 61200000, exitTime: 72000000 },
      { id: 2, name: "track2", vehicleNumber: 'BIK1', entryTime: 46800000, exitTime: 57600000 },
      { id: 3, name: "track3", vehicleNumber: 'BIK2', entryTime: 46800000, exitTime: 57600000 },
    ];

    expect(getVehicleFromVehicleNumber('bike', arr, 'M40')).toEqual({
      vehicleType: 'bike',
      id: 1,
      vehicleNumber: 'M40',
      exitTime: 72000000
    })
  })

  test('Book single Track', () => {
    let trackArr = [
      { id: 1, name: 'track1', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined },
      { id: 2, name: 'track2', vehicleNumber: undefined, entryTime: undefined, exitTime: undefined }
    ]
    let trackId = 2, vehicleNumber = '034', entryTime = 54000000;

    expect(bookSingleTrack({ trackArr, trackId, vehicleNumber, entryTime })).toEqual([
      expect.objectContaining({
        id: 1,
        name: 'track1',
        vehicleNumber: undefined,
        entryTime: undefined,
        exitTime: undefined,
      }),
      expect.objectContaining({
        id: 2,
        name: 'track2',
        vehicleNumber: '034',
        entryTime: 54000000,
        exitTime: 64800000,
      })
    ])
  })
});