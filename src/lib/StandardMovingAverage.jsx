import DataPoint from "./DataPoint.jsx"
import StandardChartData from './StandardChartData.jsx';

export default class StandardMovingAverage {
    constructor(oneYearOfDataIn,numberOfDaystoLookBackIn) {
      this.oneYearOfData = oneYearOfDataIn;
      this.numberOfDaystoLookBack=numberOfDaystoLookBackIn;
/*
      console.log("This is accumulatedChartDataIn within StandardMovingAverage.Constructor:");
      const keys = Object.keys(oneYearOfDataIn[0])
      const values = keys.map(key => `${key}: ${Reflect.get(oneYearOfDataIn[0],key)}`)
      console.log(values)

 */

    }

    generateTheAverages(accumulatedChartDataIn)
    {
      this.accumulatedChartData=accumulatedChartDataIn;
/*
      console.log("This is accumulatedChartDataIn within StandardMovingAverage.generateTheAverages:");
      const keys = Object.keys(accumulatedChartDataIn[0])
      const values = keys.map(key => `${key}: ${Reflect.get(accumulatedChartDataIn[0],key)}`)
      console.log(values)


 */

      //console.log("This is accumulatedChartDataIn within StandardMovingAverage.generateTheAverages:");
      //for (let key in accumulatedChartDataIn) {
      //  console.log(key);
      //}


      //console.log("calling this.generateTheDataPointsSimpleMovingAverage, this.numberOfDaystoLookBack: " + this.numberOfDaystoLookBack + ', this.oneYearOfData.length: ' + this.oneYearOfData.length)
      let datapoints=this.generateTheDataPointsSimpleMovingAverage( this.numberOfDaystoLookBack,this.oneYearOfData)

      //console.log('datapoints returned: ' + datapoints.length)
      //console.log('this.numberOfDaystoLookBack = ' +this.numberOfDaystoLookBack)
      //console.log('this.accumulatedChartData.length: ' + this.accumulatedChartData.length)
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

      let dataPointsToResolve = this.accumulatedChartData.length;
      //console.log('dataPointsToResolve: ' + dataPointsToResolve)
      //console.log('this.numberOfDaystoLookBack: ' + this.numberOfDaystoLookBack)
      //console.log('datapoints.length: ' + datapoints.length)
      if(dataPointsToResolve >= (datapoints.length-this.numberOfDaystoLookBack))
      {
        dataPointsToResolve=((datapoints.length-this.numberOfDaystoLookBack)-1);
      }

      //console.log('dataPointsToResolve: ' + dataPointsToResolve)
      //for(let j=0; j < dataPointsToResolve;)
      for(let j=0; j < this.accumulatedChartData.length;)
      {

        //console.log('j: ' + j + ', k: ' +k)
        //console.log('this.accumulatedChartData[j].simpleMovingAverage: ' + this.accumulatedChartData[j].simpleMovingAverage.toString())
        //console.log('datapoints[k].calculatedValue: ' + datapoints[k].calculatedValue.toString())

        //console.log('this.accumulatedChartData[j].dateOfClose: ' + this.accumulatedChartData[j].dateOfClose)
        //console.log('this.accumulatedChartData[j].dailyClosingPrice: ' + this.accumulatedChartData[j].dailyClosingPrice)

        let adjustedChartDataEntry = new StandardChartData(this.accumulatedChartData[j].dateOfClose,this.accumulatedChartData[j].dailyClosingPrice,datapoints[k].calculatedValue,0.0,0.0,0.0,0.0,0.0,0.0)
        //console.log('adjustedChartDataEntry: ' + adjustedChartDataEntry.toString())
        adjustedChartData.push(adjustedChartDataEntry)
        ++j; ++k;
      }
      return adjustedChartData;
    }

    generateTheDataPointsSimpleMovingAverage( numberOfDaystoLookBack,eodResponseInfo)
    {
      //console.log('eodResponseInfo: ' + JSON.stringify(eodResponseInfo))    
      //console.log('generateTheDataPointsSimpleMovingAverage eodResponseInfo.length: ' + eodResponseInfo.length + ', numberOfDaystoLookBack: ' + numberOfDaystoLookBack)
  /*
      console.log("This is eodResponseInfo within StandardMovingAverage.generateTheDataPointsSimpleMovingAverage:");
      const keys = Object.keys(eodResponseInfo[0])
      const values = keys.map(key => `${key}: ${Reflect.get(eodResponseInfo[0],key)}`)
      console.log(values)

 */

      let dataPoints = [];

        // this generates an up to the date average

        for (let i = numberOfDaystoLookBack; i < eodResponseInfo.length; ++i)
        {
          let tempDouble = this.generateOneDataPoint(i, numberOfDaystoLookBack, eodResponseInfo);
          let aDataPoint = new DataPoint(eodResponseInfo[i].date, tempDouble);
          dataPoints.push(aDataPoint);
          //console.log("Added aDataPoint:", aDataPoint.toString());
        }
        //console.log('dataPoints.length: ' + dataPoints.length)
        return dataPoints;
    }

     // this geneates a simple moving average value for one datapoint
     generateOneDataPoint(startAddress,numberOfDaystoLookBack,eodResponseInfo)
     {
       //console.log('generateOneDataPoint eodResponseInfo.Length: ' + eodResponseInfo.Length + ', numberOfDaystoLookBack: ' + numberOfDaystoLookBack + ', startAddress: '+startAddress)
       if (numberOfDaystoLookBack <= 0)
       {
         console.log('Returning: numberOfDaystoLookBack <= 0')
         return 0.0;
       }
 
       if (startAddress < numberOfDaystoLookBack)
       {
         console.log('Returning: startAddress < numberOfDaystoLookBack')
         return 0.0;
       }
 
       //let theSizeOfTheVector = eodResponseInfo.Length;
 
       // collect values up to the day you are evaluating
       let summedCloses = 0.0;
       for (let i = startAddress + 1 - numberOfDaystoLookBack; i < startAddress + 1; ++i)
       {
         summedCloses += parseFloat(eodResponseInfo[i].close);
       }
 
       let devisor = numberOfDaystoLookBack;
       return summedCloses / devisor;
     }

    // generates datapoints as a simpleMoving average for the entire set of data less the number of days to look back.

    generateTheUnrestrictedAverages()
    {
      //console.log("calling this.generateTheUnrestrictedAverages, this.numberOfDaystoLookBack: " + this.numberOfDaystoLookBack
      // + ', this.oneYearOfData.length: ' + this.oneYearOfData.length)

      let datapoints=this.generateTheDataPointsSimpleMovingAverage( this.numberOfDaystoLookBack,this.oneYearOfData)

      //console.log('datapoints returned: ' + datapoints.length)
      //console.log("datapoints:" + JSON.stringify(datapoints))

      return datapoints;
    }
    
    toString() {
        return "StandardMovingAverage, length: " + this.oneYearOfData.length + ', this.numberOfDaystoLookBack: ' + this.numberOfDaystoLookBack;
      }
}