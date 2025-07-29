import BollingerBandDataPoint from "./BollingerBandDataPoint.jsx"
import StandardMovingAverage from './StandardMovingAverage.jsx'
import ExponentialMovingAverage from './ExponentialMovingAverage.jsx'
import DataPoint from './DataPoint.jsx'

export default class BollingerBands {
    constructor(standardValuesIn,adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBackIn) {
        this.standardValues = standardValuesIn;
        this.adjustedToContainFullYearOfDataValues = adjustedToContainFullYearOfDataValuesIn;
        this.numberOfDaysToLookBack=numberOfDaysToLookBackIn;
        this.mean=0.0;
        //console.log("adjustedToContainFullYearOfDataValuesIn: "+ JSON.stringify(adjustedToContainFullYearOfDataValuesIn))

        //console.log("BollingerBands valuesIn.length: " + this.standardValues.length)
        //console.log("BollingerBands adjustedValues.length: " + this.adjustedToContainFullYearOfDataValues.length)
        //console.log("BollingerBands numberOfDaystoLookBack: " + this.numberOfDaystoLookBack)
      }

    generateBollingerBands()
    {
        //console.log("generateBollingerBands valuesIn.length: " + this.standardValues.length)
        //console.log("generateBollingerBands adjustedValues.length: " + this.adjustedToContainFullYearOfDataValues.length)        
        //console.log('Range: ' + this.standardValues[0].date + ', through: ' + this.standardValues[(this.standardValues.length-1)].date)
        
        if(this.standardValues.length === undefined)
        {
            console.log("valuesIn.length === undefined")
            return null;
        }
        

        //console.log("this.numberOfDaysToLookBack: " + this.numberOfDaysToLookBack)

        /*
        // Adjust here to use standard moving average instead of exponential
        // if you want to wrap around the standard moving average, use this instead.
        let movingAverageToWrap = new StandardMovingAverage(this.adjustedToContainFullYearOfDataValues,this.numberOfDaysToLookBack);
        let movingAverage=standardMovingAverage.generateTheUnrestrictedAverages()
        



        //let movingAverageToWrap = new ExponentialMovingAverage(this.adjustedToContainFullYearOfDataValues,this.numberOfDaysToLookBack);
        //let movingAverage = movingAverageToWrap.generateTheUnrestrictedAverages()
        */
        let movingAverage = this.buildStandardChartDataFromEndPointData(this.adjustedToContainFullYearOfDataValues)


        //console.log('movingAverage.length: ' + movingAverage.length)
        //console.log("datapoints:" + JSON.stringify(simpleMovingAverage))

        // basically start with 292 datapoints and get back 259 which equals points in less days to look back of 33
        //datapoints:[{"date":"2022-03-07","calculatedValue":344.49060606060607},{"date":"2022-03-08","calculatedValue":343.7687878787879},

        
        //for(let i=0;i< simpleMovingAverage.length;++i)
        //{
           // console.log('simpleMovingAverage datapoint:' + simpleMovingAverage[i].date + ", $" + simpleMovingAverage[i].calculatedValue)
        //}

        

        let tempBollingerBands = [];

        //console.log('StndardValues: ' +JSON.stringify(this.standardValues))
        //console.log('StndardValues address 0: ' +JSON.stringify(this.standardValues[0]))
        //console.log('StndardValues address 0: ' + this.standardValues[0].adjClose)

        for(let endAddress=(this.numberOfDaysToLookBack), standardValuesAddress=0;
                             endAddress < (movingAverage.length+1);
                             ++endAddress, ++standardValuesAddress)
        {
            let subsetOfData=this.colllectSubsetOfDateToEvaluate(endAddress,movingAverage)
            //console.log('subsetOfData.length: ' + JSON.stringify(subsetOfData.length))
            //console.log('subsetOfData: ' + JSON.stringify(subsetOfData))
            let standardDeviation=this.generateOneSetOfDataPoints(subsetOfData)
            //console.log('standardDeviation:' + standardDeviation + " for: " + subsetOfData[subsetOfData.length-1].date)
            let aBollingerBandDataPoint = new BollingerBandDataPoint(subsetOfData[subsetOfData.length-1].date,
                                                                        //(subsetOfData[subsetOfData.length-1].calculatedValue-(standardDeviation*2.0)),
                                                                        //(subsetOfData[subsetOfData.length-1].calculatedValue+(standardDeviation*2.0)),
                                                                        (this.mean-(standardDeviation*2.0)),
                                                                        (this.mean+(standardDeviation*2.0)),
                                                                        0.0,
                                                                        subsetOfData[subsetOfData.length-1].calculatedValue,
                                                                        standardDeviation,
                                                                        this.mean);
                                                                        //console.log('this.mean: ' + this.mean)
            tempBollingerBands.push(aBollingerBandDataPoint)

            //console.log('aBollingerBandDataPoint: ' + aBollingerBandDataPoint.toString() + ', at address: ' + (tempBollingerBands.length-1))
        }

        let refBollingerBandAddress=this.findStartAddressBasedOnDate(tempBollingerBands,this.standardValues[0].date)
        //console.log('refBollingerBandAddress: ' + refBollingerBandAddress + ' from a possible: ' + tempBollingerBands.length)
        //console.log('Number of possible this.standardValues: ' + this.standardValues.length)
        let bollingerBands=[]
        for(let i=0,j=refBollingerBandAddress;i<this.standardValues.length;++i,++j)
        {
            let aBollingerBandDataPoint = new BollingerBandDataPoint(tempBollingerBands[j].date,
                tempBollingerBands[j].lowerBandValue,
                tempBollingerBands[j].upperBandValue,
                this.standardValues[i].close,
                tempBollingerBands[j].movingAverageIn,
                tempBollingerBands[j].starndardDeviation,
                tempBollingerBands[j].mean)

                bollingerBands.push(aBollingerBandDataPoint)       
                                                            
        }

        return bollingerBands;
      }

      generateOneSetOfDataPoints(dataToEvaluate)
      {
        this.mean = this.generateMean(dataToEvaluate)
        //console.log('mean:' + mean)
        let standardDeviation=this.calculateStdDeviation(this.mean,dataToEvaluate)
        return standardDeviation
      }
      generateMean(dataToEvaluate)
      {
        if(dataToEvaluate.length<1)
        {
            return 0.0
        }
        let total=0.0;
        for(let i=0;i< dataToEvaluate.length;++i)
        {
            total+=parseFloat(dataToEvaluate[i].calculatedValue)
        }
        return (total/parseFloat(dataToEvaluate.length))
      }

      calculateStdDeviation(meanIn,dataToEvaluate)
      {
        if(dataToEvaluate.length<1)
        {
            return 0.0
        }
        let mean=meanIn;
        let summedVariance=0.0;
        for(let i=0;i< dataToEvaluate.length;++i)
        {
            let variance=parseFloat(dataToEvaluate[i].calculatedValue)-mean
            summedVariance += (variance*variance)
        }
        //console.log("summedVariance: " + summedVariance + ", dataToEvaluate.length: " + dataToEvaluate.length)
        return Math.sqrt(summedVariance/parseFloat(dataToEvaluate.length))

      }

      colllectSubsetOfDateToEvaluate(endAddress,dataToEvaluate)
      {
        let subSetOfData=[];
        //console.log('endAddress-this.numberOfDaysToLookBack: ' + (endAddress-this.numberOfDaysToLookBack))
        for(let i=(endAddress-this.numberOfDaysToLookBack);i<endAddress;++i)
        {
            //console.log('i: ' + i)
            subSetOfData.push(dataToEvaluate[i])
        }
        return subSetOfData;
      }

      findStartAddressBasedOnDate(dataToEvaluate,dateToFind)
      {
        let address=-1;
        for(let i=0;i<dataToEvaluate.length;++i)
        {
            if(dataToEvaluate[i].date===dateToFind)
            {
                //console.log('located ' + dateToFind + ' at address: ' + i + ' where the date is: ' + dataToEvaluate[i].date)
                address=i;
                break;
            }
        }
        return address;
      }

      buildStandardChartDataFromEndPointData(endPointDataToConvert)
      {
        let chartData=[];
        for(let i=0;i<endPointDataToConvert.length;++i)
        {
            let aDataPoint = new DataPoint(endPointDataToConvert[i].date, endPointDataToConvert[i].close);
            chartData.push(aDataPoint)
        }
        return chartData;
      }


}
