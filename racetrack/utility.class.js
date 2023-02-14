class Utility {
  invalidEntryExitTime(time) {
    console.log(time);
  }
  printStatus(status) {
    console.log(status);
  }
  printRevenue({ regular, vip }) {
    console.log(`${regular} ${vip}`)
  }
}

module.exports = Utility;
