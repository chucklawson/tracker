export default class StochasticChartData {
    constructor(dateOfClosein,fastSstochasticValueIn,slowStochasticValueIn) {
      this.dateOfClose = dateOfClosein;
      this.fastSstochasticValue=fastSstochasticValueIn;
      this.slowStochasticValue = slowStochasticValueIn;
    }

    toString() {
        return "dateOfClose: " + this.dateOfClose + ', fastSstochasticValue: ' + this.fastSstochasticValue
         + ', slowStochasticValue: ' + this.slowStochasticValue;
      }
}