export default class DataPoint {
    constructor(dateIn,calculatedValueIn,simpleMovingAverageIn,expMovingAverageIn) {
        this.date = dateIn;
        this.calculatedValue=calculatedValueIn;
    }
    toString() {
        return ("DataPoint date: " + this.date + ':, calculatedValue: ' + this.calculatedValue);
      }
  }