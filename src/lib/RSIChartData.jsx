export default class RSIChartData {
    constructor(dateOfClosein,closeIn,upwardMeanIn,downwardMeanIn,rsiValueIn) {
      this.dateOfClose = dateOfClosein;
      this.close = closeIn;
      this.upwardMean = upwardMeanIn;
      this.downwardMean = downwardMeanIn;
      this.rsiValue=rsiValueIn;
    }

    toString() {
        return "dateOfClose: " + this.dateOfClose + ', close: ' + this.close + ', upwardMean: ' + this.upwardMean +
        ', downwardMean: ' + this.downwardMean + ', rsiValue: ' + this.rsiValue;
      }
}