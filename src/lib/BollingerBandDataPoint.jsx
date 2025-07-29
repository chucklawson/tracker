export default class BollingerBandDataPoint {
    constructor(dateIn,lowerBandValueIn,upperBandValueIn,currentPriceIn, movingAverageIn,starndardDeviationIn,meanIn) {
        this.date = dateIn;
        this.lowerBandValue=lowerBandValueIn;
        this.upperBandValue=upperBandValueIn;
        this.currentPrice=currentPriceIn;
        this.movingAverage=movingAverageIn;       
        this.starndardDeviation=starndardDeviationIn
        this.mean=meanIn
    }
    setDate(dateIn)
    {
        this.date=dateIn;
    }

    setLowerBandValue(lowerBandValueIn)
    {
        this.lowerBandValue=lowerBandValueIn;
    }

    setCurrentPrice(currentPriceIn)
    {
        this.currentPrice=currentPriceIn;
    }

    setMovingAverage(movingAverageIn)
    {
        this.movingAverageIn=movingAverageIn;
    }
    setUpperBandValue(upperBandValueIn)
    {
        this.upperBandValue=upperBandValueIn;
    }
    setStarndardDeviation(starndardDeviationIn)
    {
        this.starndardDeviation=starndardDeviationIn;
    }

    toString() {
        return ("BollingerBandDataPoint, date: " + this.date +
         ', lowerBandValue: ' + this.lowerBandValue +
         ', upperBandValue: ' + this.upperBandValue + 
         ', currentPrice: ' + this.currentPrice + 
         ', standardMovingAverage: ' + this.standardMovingAverage +
         ', starndardDeviation: ' + this.starndardDeviation);
      }
  }