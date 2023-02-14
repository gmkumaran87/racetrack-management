const { bookSingleTrack } = require("../racetrack/helper");
const Track = require("../racetrack/track.class")
const track = new Track();

describe('Testing the Track class file', () => {

  test('BOOK a track based on the input type', () => {
    let vehicle = "BIKE", vehicleNumber = "BIK3", entryTime = 50400000
    expect(track.bookTrack({ vehicle, vehicleNumber, entryTime })).toBe('SUCCESS')
  })

  test('Book a bike track', () => {
    let vehicleNumber = 'M40', entryTime = '50400000';

    expect(track.bookBikeTrack({ vehicleNumber, entryTime })).toBe('SUCCESS');

  })

  // Testing car track
  test('Book a car track', () => {
    let vehicleNumber = 'O34', entryTime = '50400000';

    expect(track.bookCarTrack({ vehicleNumber, entryTime })).toBe('SUCCESS');
  })

  // Testing SUV track
  test('Book a SUV Regular track', () => {
    let vehicleNumber = 'A66', entryTime = '50400000';

    expect(track.bookSuvTrack({ vehicleNumber, entryTime })).toBe('SUCCESS');
  })

  // Testing SUV track
  test('Book a SUV regular track successfully', () => {
    let vehicleNumber = 'A56', entryTime = '50400000';

    expect(track.bookSuvTrack({ vehicleNumber, entryTime })).toBe('SUCCESS');
  })

  // Testing SUV track
  test('Book a SUV VIP track successfully', () => {
    let vehicleNumber = 'A46', entryTime = '50400000';

    expect(track.bookSuvTrack({ vehicleNumber, entryTime })).toBe('SUCCESS');
  })

  // Testing SUV track
  test('Book a track and returns RACETRACK_FULL', () => {
    let vehicleNumber = 'A36', entryTime = '50400000';

    expect(track.bookSuvTrack({ vehicleNumber, entryTime })).toBe('RACETRACK_FULL');
  })
})