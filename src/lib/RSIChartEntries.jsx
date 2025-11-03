import RSIChartData from "./RSIChartData.jsx"

export default class RSIChartEntries {
    constructor(standardValuesIn,fullYearOfDataValuesIn,numberOfDaysToLookBackIn) {
        this.standardValues = standardValuesIn;
        this.fullYearOfDataValues = fullYearOfDataValuesIn;
        this.numberOfDaysToLookBack=numberOfDaysToLookBackIn;
        //console.log("adjustedToContainFullYearOfDataValuesIn: "+ JSON.stringify(adjustedToContainFullYearOfDataValuesIn))

        //console.log("BollingerBands valuesIn.length: " + this.standardValues.length)
        //console.log("BollingerBands adjustedValues.length: " + this.adjustedToContainFullYearOfDataValues.length)
        //console.log("BollingerBands numberOfDaystoLookBack: " + this.numberOfDaystoLookBack)
      /*
      console.log("This is standardValuesIn within RSIChartEntries.constructor: ");
      let keys = Object.keys(standardValuesIn[0])
      let values = keys.map(key => `${key}: ${Reflect.get(standardValuesIn[0],key)}`)
      console.log(values)

      console.log("This is fullYearOfDataValuesIn within RSIChartEntries.constructor: ");
       keys = Object.keys(fullYearOfDataValuesIn[0])
       values = keys.map(key => `${key}: ${Reflect.get(fullYearOfDataValuesIn[0],key)}`)
      console.log(values)

       */


      }

    generateRsiValues()
    {
        //console.log("generateBollingerBands valuesIn.length: " + this.standardValues.length)
        //console.log("generateBollingerBands adjustedValues.length: " + this.adjustedToContainFullYearOfDataValues.length)        
        //console.log('Range: ' + this.standardValues[0].date + ', through: ' + this.standardValues[(this.standardValues.length-1)].date)
        
        if(this.standardValues.length === undefined)
        {
            console.log("valuesIn.length === undefined")
            return null;
        }

        let tempRSIData = [];

        //console.log('subsetOfData: ' + JSON.stringify(this.fullYearOfDataValues))

        let lastClose=this.fullYearOfDataValues[0].close;        
        let firstRsiDataPoint=this.generateFirstRSIvalue(this.fullYearOfDataValues,lastClose)
        tempRSIData.push(firstRsiDataPoint)

        //console.log('firstRsiDataPoint as object within RSIData: ' + JSON.stringify(tempRSIData[(tempRSIData.length-1)]))

        /*
        for(let endAddress=((this.numberOfDaysToLookBack+1)), standardValuesAddress=0;
                             endAddress < (dataToEvaluate.length+1);
                             ++endAddress, ++standardValuesAddress)
        {
          let subsetOfData=this.colllectSubsetOfDateToEvaluate(endAddress,dataToEvaluate)
          //console.log('subsetOfData[(subsetOfData.length-1)].date: ' + subsetOfData[(subsetOfData.length-1)].date)
          
          let nextRSIValue=this.generateASucessiveRSIvalue(RSIData[(RSIData.length-1)].rsiValue,
          subsetOfData[(subsetOfData.length-1)],this.numberOfDaysToLookBack)
          RSIData.push(nextRSIValue)
          console.log('nextRSIValue: ' + nextRSIValue)
        }
        */
        //console.log('dataToEvaluate length:' + this.fullYearOfDataValues.length)
        //console.log(' dataToEvaluate[(dataToEvaluate.length-1)]: ' + JSON.stringify( dataToEvaluate[0]))
        // console.log('date this.fullYearOfDataValues last date:' +  this.fullYearOfDataValues[(this.fullYearOfDataValues.length-1)].date)

        for(let i=(this.numberOfDaysToLookBack + 1); i < this.fullYearOfDataValues.length;++i)
        {

          //console.log('i: ' + i +'this.fullYearOfDataValues[i].date: ' + this.fullYearOfDataValues[i].date)

          //console.log('RSIData[(RSIData.length-1)].rsiValue: ' + RSIData[(RSIData.length-1)].rsiValue)

          let nextRSIValue=this.generateASucessiveRSIvalue(tempRSIData[(tempRSIData.length-1)],
            this.fullYearOfDataValues[i],this.numberOfDaysToLookBack)
            tempRSIData.push(nextRSIValue)
            //console.log('nextRSIValue: ' + nextRSIValue)
        }

        //console.log('last RSIValue: ' + tempRSIData[(tempRSIData.length-1)])

        let refAddressToStartFrom= this.findStartAddressBasedOnDate(tempRSIData,this.standardValues[0].date)

        //console.log('refAddressToStartFrom: ' + refAddressToStartFrom + ', (tempRSIData.length-1):' + (tempRSIData.length-1))

        let RSIData = [];
        for(let i=refAddressToStartFrom;i<(tempRSIData.length);++i)
        {
          let aRSIChartDataEntry= new  RSIChartData(tempRSIData[i].dateOfClose,
            tempRSIData[i].close,
            tempRSIData[i].upwardMean,
            tempRSIData[i].downwardMean,
            tempRSIData[i].rsiValue)
            RSIData.push(aRSIChartDataEntry)
        }
        //console.log('RSIData: ' + JSON.stringify(RSIData))
        return RSIData;
      }

      generateASucessiveRSIvalue(lastRSIChartValue,dataToEavaluate,numberOfDaysToLookBack)
      {
        //console.log('lastRSIChartValue: ' + JSON.stringify(lastRSIChartValue))
        //console.log('generateASucessiveRSIvalue dataToEavaluate: ' + JSON.stringify(dataToEavaluate))

        /*
        console.log("This is lastRSIChartValue within RSIChartEntries.generateASucessiveRSIvalue: ");
        let keys = Object.keys(lastRSIChartValue)
        let values = keys.map(key => `${key}: ${Reflect.get(lastRSIChartValue,key)}`)
        console.log(values)

        console.log("This is dataToEavaluate within RSIChartEntries.generateASucessiveRSIvalue: ");
        keys = Object.keys(dataToEavaluate)
        values = keys.map(key => `${key}: ${Reflect.get(dataToEavaluate,key)}`)
        console.log(values)
         */

        let meanMultiplier = parseFloat((numberOfDaysToLookBack-1))
        //console.log('meanMultiplier: ' + meanMultiplier)

        let currentSummedUpwardMean = (lastRSIChartValue.upwardMean*meanMultiplier);
        let currentSummedDownardMean = (lastRSIChartValue.downwardMean*meanMultiplier);

        if(dataToEavaluate.close>lastRSIChartValue.close){
          currentSummedUpwardMean+= (dataToEavaluate.close-lastRSIChartValue.close)
        }
        let newUpwardMean=currentSummedUpwardMean/parseFloat(numberOfDaysToLookBack)

        if(dataToEavaluate.close<lastRSIChartValue.close){
          currentSummedDownardMean+= (lastRSIChartValue.close-dataToEavaluate.close)
        }
        let newDownwardMean=currentSummedDownardMean/parseFloat(numberOfDaysToLookBack)
        let RS= 0.0
        if(newDownwardMean!== 0.0)
        {
          RS=(newUpwardMean/newDownwardMean)
        }
        
        let RSI = 100 - (100/(1+RS))

        
        let calculatedRSIChartDataEntry = new RSIChartData(dataToEavaluate.date,
          dataToEavaluate.close,
          newUpwardMean,
          newDownwardMean,
          RSI)

          //console.log('calculatedRSIChartDataEntry: ' + calculatedRSIChartDataEntry)

          return calculatedRSIChartDataEntry

      }

      generateFirstRSIvalue(dataToEvaluate,lastClose)
      {
        /*
        console.log('dataToEvaluate.length: ' + dataToEvaluate.length + ', lastClose: ' + lastClose)

        console.log("This is dataToEvaluate within RSIChartEntries.generateFirstRSIvalue: ");
        let keys = Object.keys(dataToEvaluate[0])
        let values = keys.map(key => `${key}: ${Reflect.get(dataToEvaluate[0],key)}`)
        console.log(values)

         */




        if(dataToEvaluate.length<1)
        {
            return 0.0
        }
        let endAddress=(this.numberOfDaysToLookBack)
        //console.log('endAddress: ' + endAddress)
        let subsetOfData=this.colllectSubsetOfDateToEvaluate(endAddress,dataToEvaluate)
        //console.log('subsetOfData.length: ' + subsetOfData.length)
        let upwardMean=this.calculateMeanForUpwardMovements(subsetOfData,lastClose)
        let downwardMean=this.calculateMeanForDownwardMovements(subsetOfData,lastClose)
        //console.log('upwardMean: ' + upwardMean)
        //console.log('downwardMean: ' + downwardMean)
        let tempRsiValue=0.0;

        if(downwardMean>0.0)
        {
          tempRsiValue=(upwardMean/downwardMean)
        }
        let firstRsiValue = (100.0-(100.0/(1.0+tempRsiValue)))

        //console.log("date of lastEntry: " + subsetOfData[(subsetOfData.length-1)].date)

        let aRSIChartDataValue= new RSIChartData(subsetOfData[(subsetOfData.length-1)].date,
          subsetOfData[(subsetOfData.length-1)].close,
          upwardMean,
          downwardMean,
          firstRsiValue)
        return aRSIChartDataValue
      }

      calculateMeanForUpwardMovements(dataToEvaluate,lastClose)
      {
        /*
        console.log("This is dataToEvaluate within RSIChartEntries.calculateMeanForUpwardMovements: ");
        let keys = Object.keys(dataToEvaluate[0])
        let values = keys.map(key => `${key}: ${Reflect.get(dataToEvaluate[0],key)}`)
        console.log(values)

         */

        let total=0.0;
        let meanCounter=parseFloat(dataToEvaluate.length)
        let currentRefClosingPrice=lastClose;
        for(let i=0;i<dataToEvaluate.length;++i)
        {
          if(dataToEvaluate[i].close>currentRefClosingPrice)
          {
            total+=(dataToEvaluate[i].close-currentRefClosingPrice)            
          }
          currentRefClosingPrice=dataToEvaluate[i].close
        }
        if(meanCounter>=1.0)
        {
            return (total/meanCounter)
        }
        else{
        return 0.0
        }
      }

      calculateMeanForDownwardMovements(dataToEvaluate,lastClose)
      {
        let total=0.0;
        let meanCounter=parseFloat(dataToEvaluate.length)
        let currentRefClosingPrice=lastClose;
        for(let i=0;i<dataToEvaluate.length;++i)
        {
          if(dataToEvaluate[i].close<currentRefClosingPrice)
          {
            total+=(currentRefClosingPrice-dataToEvaluate[i].close)
            
          }
          currentRefClosingPrice=dataToEvaluate[i].close
        }
        if(meanCounter>=1.0)
        {
          //console.log('meanCounter: ' + meanCounter)
          return (total/meanCounter)
        }
        else{
        return 0.0
        }
      }


      colllectSubsetOfDateToEvaluate(endAddress,dataToEvaluate)
      {
/*
        console.log("This is dataToEvaluate within RSIChartEntries.colllectSubsetOfDateToEvaluate: ");
        let keys = Object.keys(dataToEvaluate[0])
        let values = keys.map(key => `${key}: ${Reflect.get(dataToEvaluate[0],key)}`)
        console.log(values)

 */

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
/*
        console.log("This is dataToEvaluate within RSIChartEntries.findStartAddressBasedOnDate: ");
        let keys = Object.keys(dataToEvaluate[0])
        let values = keys.map(key => `${key}: ${Reflect.get(dataToEvaluate[0],key)}`)
        console.log(values)

 */

        //console.log('dataToEvaluate: ' + JSON.stringify(dataToEvaluate))
        //console.log('dateToFind: ' + JSON.stringify(dateToFind))
        let address=-1;
        for(let i=0;i<dataToEvaluate.length;++i)
        {
            if(dataToEvaluate[i].dateOfClose===dateToFind)
            {
                //console.log('located ' + dateToFind + ' at address: ' + i + ' where the date is: ' + dataToEvaluate[i].date)
                address=i;
                break;
            }
        }
        return address;
      }

}
