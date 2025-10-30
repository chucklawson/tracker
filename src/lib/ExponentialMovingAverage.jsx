import DataPoint from "./DataPoint.jsx"
import StandardChartData from './StandardChartData.jsx';

export default class ExponentialMovingAverage {
    constructor(oneYearOfDataIn,numberOfDaystoLookBackIn) {
      this.oneYearOfData = oneYearOfDataIn;
      this.numberOfDaystoLookBack=numberOfDaystoLookBackIn;
      /*
      console.log("This is what is in oneYearOfDataIn within the constructor for ExponentialMovingAverage:");
      for (let key in oneYearOfDataIn[0]) {
        console.log(key);
      }
      */

    }

    generateTheAverages(accumulatedChartDataIn)
    {
      this.accumulatedChartData=accumulatedChartDataIn;
      //console.log("calling this.generateTheDataPointsFormTwo_UpToDate, this.numberOfDaystoLookBack: " + this.numberOfDaystoLookBack + ', this.oneYearOfData.length: ' + this.oneYearOfData.length)
/*
      console.log("This is what is in accumulatedChartDataIn within generateTheAverages:");
      for (let key in accumulatedChartDataIn[0]) {
        console.log(key);
      }
*/



      let datapoints=this.generateTheDataPointsFormTwo_UpToDate( this.numberOfDaystoLookBack,this.oneYearOfData)

      //console.log('datapoints returned: ' + datapoints.length)
      //console.log('accumulatedChartData: ' + JSON.stringify(this.accumulatedChartData))
      //console.log('accumulatedChartData to match up against: ' + this.accumulatedChartData.length)
      //console.log('starting date = ' +this.accumulatedChartData[0].dateOfClose)
      
      let commonStartAddress=0;
      for(let i=0;i<datapoints.length;++i)
      {
        if(datapoints[i].date===this.accumulatedChartData[0].dateOfClose)
        {
          commonStartAddress=i;
          //console.log('Setting commonStartAddress to: ' + commonStartAddress + ', the selected date: ' + this.accumulatedChartData[0].dateOfClose)
        }
      }


      let adjustedChartData = [];
      let k=commonStartAddress;

      
      for(let j=0; j < this.accumulatedChartData.length;)
      {
        //console.log('j: ' + j + ', k: ' +k)
        //console.log('this.accumulatedChartData[j].simpleMovingAverage: ' + this.accumulatedChartData[j].simpleMovingAverage.toString())
        //console.log('datapoints[k].calculatedValue: ' + datapoints[k].calculatedValue.toString())

        //console.log('this.accumulatedChartData[j].dateOfClose: ' + this.accumulatedChartData[j].dateOfClose)
        //console.log('this.accumulatedChartData[j].dailyClosingPrice: ' + this.accumulatedChartData[j].dailyClosingPrice)

        let adjustedChartDataEntry = new StandardChartData(this.accumulatedChartData[j].dateOfClose,
            this.accumulatedChartData[j].dailyClosingPrice,
            this.accumulatedChartData[j].simpleMovingAverage,
            datapoints[k].calculatedValue,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0)
        //console.log('adjustedChartDataEntry: ' + adjustedChartDataEntry.toString())
        adjustedChartData.push(adjustedChartDataEntry)
        ++j; ++k;
      }
      
      return adjustedChartData;
    }   



    generateTheDataPointsFormTwo_UpToDate( howManyDaysInAverage, eodResponseInfo)
    {
      /*
      console.log("This is what is in eodResponseInfo within generateTheDataPointsFormTwo_UpToDate:");
      for (let key in eodResponseInfo[0]) {
        console.log(key);
      }
       */
        //console.log("eodResponseInfo.length: , howManyDaysInAverage: ", eodResponseInfo.length, howManyDaysInAverage);
        if (eodResponseInfo.length < howManyDaysInAverage)
        {
            console.log('Returning eodResponseInfo.length < howManyDaysInAverage')
            return null;
        }

        let dataPointsForFormTwo = [];

        // get the first point as a simple moving average.
        let referenceAddressForSimpleMovingAverage = howManyDaysInAverage;
        let theFirstValue = this.generateOneDataPoint(referenceAddressForSimpleMovingAverage,howManyDaysInAverage,eodResponseInfo);
        //console.log('theFirstValue: ' + theFirstValue)
        let theFirstDate = eodResponseInfo[(howManyDaysInAverage - 1)].date;
        //console.log('theFirstDate: ' + theFirstDate)
      //console.log('theFirstDate: ' + eodResponseInfo.toString());



        dataPointsForFormTwo.push(new DataPoint(theFirstDate, theFirstValue));
        //console.log('dataPointsForFormTwo.length: ' + dataPointsForFormTwo.length)
        // geneate the rest of them
        let previousDataPoint = dataPointsForFormTwo[0];
        //console.log('previousDataPoint: ' + previousDataPoint.toString())

        // this generates an up to the date average
        for (let i = howManyDaysInAverage; i < eodResponseInfo.length; ++i)
        {
            let tempDouble = this.generateExponentialDataPointFormTwo(i,
            howManyDaysInAverage,
            previousDataPoint,
            eodResponseInfo);

            //console.log('tempDouble: ' + tempDouble)

            let aDataPoint = new DataPoint(eodResponseInfo[i].date, tempDouble);

            //console.log('aDataPoint: ' + aDataPoint.toString())

            dataPointsForFormTwo.push(aDataPoint);
            previousDataPoint = aDataPoint;
        }
        return dataPointsForFormTwo;
    }

    // this geneates a simple moving average value for one datapoint
    generateOneDataPoint( startAddress,numberOfDaystoLookBack,eodResponseInfo)
    {
        //console.log('generateOneDataPoint startAddress:' + startAddress + ', numberOfDaystoLookBack: ' + numberOfDaystoLookBack + ', eodResponseInfo.length: '+eodResponseInfo.length)
      /*
      console.log("This is what is in eodResponseInfo within generateOneDataPoint:");
      for (let key in eodResponseInfo[0]) {
          console.log(key);
        }
       */
        if (numberOfDaystoLookBack <= 0)
        {
            console.log('Returning numberOfDaystoLookBack <= 0')
            return 0.0;
        }

        if (startAddress < numberOfDaystoLookBack)
        {
            console.log('Returning startAddress < numberOfDaystoLookBack')
            return 0.0;
        }

        //let theSizeOfTheVector = eodResponseInfo.length;

        // collect values up to the day you are evaluating
        let summedCloses = 0.0;
        for (let i = startAddress + 1 - numberOfDaystoLookBack; i < startAddress + 1; ++i)
        {
            summedCloses += parseFloat(eodResponseInfo[i].close);

            //console.log("eodResponseInfo[i].close: " + eodResponseInfo[i].close)
            //console.log("eodResponseInfo[i].unadjustedVolume: " + eodResponseInfo[i].open)
            //console.log("eodResponseInfo[i].unadjustedVolume: " + eodResponseInfo[i].)

        }

        let devisor = numberOfDaystoLookBack;
        return summedCloses / devisor;
    }

    // Exponential Moving Average Calculation: form two

    //Exponential Moving Averages can be specified in two ways - as a percent-based EMA or as a period-based EMA. A percent-based EMA has a percentage as it's single parameter while a period-based EMA has a parameter that represents the duration of the EMA.

    //The formula for an exponential moving average is:

    //EMA(current) = ( (Price(current) - EMA(prev) ) x Multiplier) + EMA(prev)

    //For a percentage-based EMA, "Multiplier" is equal to the EMA's specified percentage.
    //For a period-based EMA, "Multiplier" is equal to 2 / (1 + N) where N is the specified number of periods.

    //For example, a 10-period EMA's Multiplier is calculated like this:

    //This means that a 10-period EMA is equivalent to an 18.18% EMA.

    // The second period  calculation is as follows for a table for Eastman Kodak.
    // For the first period's exponential moving average, the simple moving average was used as the previous period's exponential moving average.
    // Close 61.33, previous periods EMA 63.682, current periods ems 63.254
    //(C - P) = (61.33 - 63.682) = -2.352 
    //(C - P) x K = -2.352 x .181818 = -0.4276 
    //((C - P) x K) + P = -0.4276 + 63.682 = 63.254 

    // With a 15 day moving average:
    // currentAddressToEvaluate = Starts at 15 and goes up as this method constantly is called to gererate one point at a time.
    // lengthOfAverage = 15
    // previousDataPoint the last datapoint 
    // EodResponseInfo[] eodResponseInfo = from querry
    // Logger is the logger
    generateExponentialDataPointFormTwo(currentAddressToEvaluate,lengthOfAverage,previousDataPoint,eodResponseInfo)
    {
      /*
      console.log("This is what is in eodResponseInfo within generateExponentialDataPointFormTwo:");
      for (let key in eodResponseInfo[0]) {
        console.log(key);
      }
      console.log("This is what is in previousDataPoint within generateExponentialDataPointFormTwo:");
      for (let key in previousDataPoint) {
        console.log(key);
      }
      */
        //console.log('generateExponentialDataPointFormTwo currentAddressToEvaluate: ' + currentAddressToEvaluate + ', lengthOfAverage: ' + lengthOfAverage + ', previousDataPoint: ' + previousDataPoint.toString() + ', eodResponseInfo.length: ' +eodResponseInfo.length)
        if (lengthOfAverage <= 0)
        {
            
            return 0.0;
        }

        let theSizeOfTheVector = eodResponseInfo.length;
        if (theSizeOfTheVector - 1 < currentAddressToEvaluate)
        {
            console.log('Returning theSizeOfTheVector - 1 < currentAddressToEvaluate')
            return 0.0;
        }

        let numberOfTimePeriods = lengthOfAverage;
        let multiplier = 2.0 / (numberOfTimePeriods + 1.0);

        //EMA(current) = ( (Price(current) - EMA(prev) ) x Multiplier) + EMA(prev)
        let theCurrentDaysClose = parseFloat(eodResponseInfo[currentAddressToEvaluate].close);
        //double testValue=((theCurrentDaysClose-previousDataPoint)*multiplier);
        let currentEMA = (theCurrentDaysClose - previousDataPoint.calculatedValue) * multiplier
        + previousDataPoint.calculatedValue;
        //previousDataPoint = currentEMA;
        return currentEMA;
    }

    generateTheUnrestrictedAverages()
    {
      //console.log("calling this.generateTheUnrestrictedAverages, this.numberOfDaystoLookBack: " + this.numberOfDaystoLookBack + ', this.oneYearOfData.length: ' + this.oneYearOfData.length)
      let datapoints=this.generateTheDataPointsFormTwo_UpToDate( this.numberOfDaystoLookBack,this.oneYearOfData)

      //console.log('datapoints returned: ' + datapoints.length)
      //console.log("datapoints:" + JSON.stringify(datapoints))

      return datapoints;
    }
    
    toString() {
        return "ExponentialMovingAverage, length: " + this.oneYearOfData.length + ', this.numberOfDaystoLookBack: ' + this.numberOfDaystoLookBack;
    }
}