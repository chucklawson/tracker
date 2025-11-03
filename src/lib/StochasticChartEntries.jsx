import StochasticChartData from "./StochasticChartData.jsx"
//import StandardMovingAverage from './StandardMovingAverage.jsx'
//import DataPoint from "./DataPoint.jsx";

export default class StochasticChartEntries {
    constructor(standardValuesIn,fullYearOfDataValuesIn,slowInidcatorDaysToLookBackIn,fastInidcatorDaysToLookBackIn) {
/*
      console.log("This is standardValuesIn within StochasticChartEntries.constructor: ");
      let keys = Object.keys(standardValuesIn[0])
      let values = keys.map(key => `${key}: ${Reflect.get(standardValuesIn[0],key)}`)
      console.log(values)

      console.log("This is fullYearOfDataValuesIn within StochasticChartEntries.constructor: ");
      keys = Object.keys(fullYearOfDataValuesIn[0])
      values = keys.map(key => `${key}: ${Reflect.get(fullYearOfDataValuesIn[0],key)}`)
      console.log(values)
*/
        this.standardValues = standardValuesIn;
        this.fullYearOfDataValues = fullYearOfDataValuesIn;
        this.slowInidcatorDaysToLookBack=slowInidcatorDaysToLookBackIn;
        this.fastInidcatorDaysToLookBack=fastInidcatorDaysToLookBackIn;

      }

    generateStochasticValues()
    {
        let fastStochasticValues=this.generateFastStochasticValues(this.fastInidcatorDaysToLookBack)        
        //console.log('fastStochasticValues: ' + JSON.stringify(fastStochasticValues))
/*
      console.log("fastStochasticValues.length: "+fastStochasticValues.length);
      console.log("This is fastStochasticValues within StochasticChartEntries.generateSlowStochasticValues: ");
      let keys = Object.keys(fastStochasticValues[0])
      let values = keys.map(key => `${key}: ${Reflect.get(fastStochasticValues[0],key)}`)
      console.log(values)
*/
        let slowStochasticValues=this.generateSlowStochasticValues(fastStochasticValues,this.slowInidcatorDaysToLookBack)

        let stochasticData=this.loadChartData(fastStochasticValues,slowStochasticValues)

       //console.log('slowStochasticValues: ' + JSON.stringify(slowStochasticValues))
        //let stochasticData=[]
        return stochasticData;
    }

    loadChartData(fastStochasticValues,slowStochasticValues)
    {
      /*
      console.log("This is fastStochasticValues within StochasticChartEntries.loadChartData: ");
      let keys = Object.keys(fastStochasticValues)
      let values = keys.map(key => `${key}: ${Reflect.get(fastStochasticValues,key)}`)
      console.log(values)

      console.log("This is slowStochasticValues within StochasticChartEntries.loadChartData: ");
      keys = Object.keys(slowStochasticValues[0])
      values = keys.map(key => `${key}: ${Reflect.get(slowStochasticValues[0],key)}`)
      console.log(values)
*/


        let stochasticChartData=[]
        //console.log('fastStochasticValues: ' + JSON.stringify(fastStochasticValues))
        let startingAddressFastValues = this.findStartAddressBasedOnDate(fastStochasticValues,this.standardValues[0].date)

        //console.log('date to locate: ' + this.standardValues[0].date + ', Entries to search: ' + slowStochasticValues.length)
        //console.log('slowStochasticValues: ' + JSON.stringify(slowStochasticValues))

        let startingAddressSlowValues = this.findStartAddressBasedOnDate(slowStochasticValues,this.standardValues[0].date)
        //console.log('startingAddressFastValues: ' + startingAddressFastValues)

        //console.log('startingAddressSlowValues: ' + startingAddressSlowValues + ',total entries: ' + slowStochasticValues.length)
        
        for(let i=startingAddressFastValues,j=startingAddressSlowValues;i<fastStochasticValues.length;++i,++j)
        {
          //console.log("fastStochasticValues[i].dateOfClose" + fastStochasticValues[i].dateOfClose);
            let aStochasticChartDataEntry=new StochasticChartData(fastStochasticValues[i].dateOfClose,fastStochasticValues[i].stochasticValue,slowStochasticValues[j].stochasticValue)
            stochasticChartData.push(aStochasticChartDataEntry)
        }
        
        return stochasticChartData
    }

    generateSlowStochasticValues(fastStochasticValues,numberOfDaysToLookBack)
    {
/*
      console.log("fastStochasticValues.length: "+fastStochasticValues.length);
      console.log("This is fastStochasticValues within StochasticChartEntries.generateSlowStochasticValues: ");
      let keys = Object.keys(fastStochasticValues[0])
      let values = keys.map(key => `${key}: ${Reflect.get(fastStochasticValues[0],key)}`)
      console.log(values)

*/


        let dataPontsToEvaluate=[]

        for(let i=0;i<fastStochasticValues.length;++i)
        {
            let aDataPointToEvaluate ={
                close: fastStochasticValues[i].stochasticValue,
                dateOfClose: fastStochasticValues[i].dateOfClose
            }
            dataPontsToEvaluate.push(aDataPointToEvaluate)
        }
        let movingAverage=this.generateTheDataPointsSimpleMovingAverage(numberOfDaysToLookBack,dataPontsToEvaluate)
        return movingAverage
    }

    generateTheDataPointsSimpleMovingAverage( numberOfDaystoLookBack,dataPontsToEvaluate)
    {
      //console.log('dataPontsToEvaluate: ' + JSON.stringify(dataPontsToEvaluate))    
      //console.log('generateTheDataPointsSimpleMovingAverage eodResponseInfo.length: ' + eodResponseInfo.length + ', numberOfDaystoLookBack: ' + numberOfDaystoLookBack)
      if (dataPontsToEvaluate.length < numberOfDaystoLookBack)
      {
        console.log('Returning: dataPontsToEvaluate.length < numberOfDaystoLookBack')
        return null;
      }

      let dataPoints = [];

        // this generates an up to the date average

        for (let i = numberOfDaystoLookBack; i < dataPontsToEvaluate.length; ++i)
        {
          let tempDouble = this.generateOneDataPoint(i, numberOfDaystoLookBack, dataPontsToEvaluate);

          let slowStochasticEntry ={
            stochasticValue: tempDouble,
            dateOfClose: dataPontsToEvaluate[i].dateOfClose
        }

          //let aDataPoint = new StochasticChartData(dataPontsToEvaluate[i].dateOfClose, 0.0,tempDouble);
          dataPoints.push(slowStochasticEntry);
        }
        //console.log('dataPoints.length: ' + dataPoints.length)
        return dataPoints;
    }

     // this geneates a simple moving average value for one datapoint
     generateOneDataPoint(startAddress,numberOfDaystoLookBack,dataPontsToEvaluate)
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
         summedCloses += parseFloat(dataPontsToEvaluate[i].close);
       }
 
       let devisor = numberOfDaystoLookBack;
       return summedCloses / devisor;
     }

    generateFastStochasticValues(numberOfDaysToLookBack)
    {
        //console.log("generateBollingerBands valuesIn.length: " + this.standardValues.length)
        //console.log("generateBollingerBands adjustedValues.length: " + this.adjustedToContainFullYearOfDataValues.length)        
        //console.log('Range: ' + this.standardValues[0].date + ', through: ' + this.standardValues[(this.standardValues.length-1)].date)
        let fastStochasticData=[{}]
        if(this.standardValues.length === undefined)
        {
            console.log("valuesIn.length === undefined")
            return null;
        }

        //console.log('this.fullYearOfDataValues[0]:' + JSON.stringify(this.fullYearOfDataValues[0]))
        for(let i=0,endAddress=numberOfDaysToLookBack;i<((this.fullYearOfDataValues.length - numberOfDaysToLookBack)+1);++i,++endAddress)
        {
            let dataToEvaluate=this.colllectSubsetOfDateToEvaluate(endAddress,numberOfDaysToLookBack,this.fullYearOfDataValues)
            //console.log('dataToEvaluate: ' + dataToEvaluate[(dataToEvaluate.length-1)].date)
            let lowTradingPrice = this.obtainLowTradingPrice(dataToEvaluate)
            let highTradingPrice = this.obtainHignTradingPrice(dataToEvaluate)
            let lastClosingPrice = dataToEvaluate[(dataToEvaluate.length-1)].close
            let stochisticValue = this.calculateStochistic(lowTradingPrice,highTradingPrice,lastClosingPrice)
            
            let fastStochasticEntry ={
                stochasticValue: stochisticValue,
                dateOfClose: dataToEvaluate[(dataToEvaluate.length-1)].date
            }
            //console.log( 'lowTradingPrice: ' + lowTradingPrice + ', highTradingPrice: ' + highTradingPrice + ', lastClosingPrice: ' + lastClosingPrice)
            //console.log( 'stochisticValue: ' + stochisticValue)
            fastStochasticData.push(fastStochasticEntry)
        }
        //console.log('RSIData: ' + JSON.stringify(RSIData))
        return fastStochasticData;
      }

      calculateStochistic(lowTradingPrice,highTradingPrice,lastClosingPrice)
      {
        if((highTradingPrice-lowTradingPrice)===0.0)
        {
            return 0.0;
        }
        let stochistic = (((lastClosingPrice-lowTradingPrice)/(highTradingPrice-lowTradingPrice))*100.0)

        return stochistic
      }

      obtainLowTradingPrice(dataToEvaluate)
      {
        let lowTradingPrice=10000000000.0
        for(let i=0;i<dataToEvaluate.length;++i)
        {
            if(dataToEvaluate[i].low < lowTradingPrice)
            {
                lowTradingPrice=dataToEvaluate[i].low;
            }
        }
        return lowTradingPrice
      }

      obtainHignTradingPrice(dataToEvaluate)
      {
        let highTradingPrice=-1.0
        for(let i=0;i<dataToEvaluate.length;++i)
        {
            if(dataToEvaluate[i].high > highTradingPrice)
            {
                highTradingPrice=dataToEvaluate[i].high;
            }
        }
        return highTradingPrice
      }

      colllectSubsetOfDateToEvaluate(endAddress,numberOfDaysToLookBack,dataToEvaluate)
      {
        let subSetOfData=[];
        //console.log('endAddress-this.numberOfDaysToLookBack: ' + (endAddress-this.numberOfDaysToLookBack))
        for(let i=(endAddress-numberOfDaysToLookBack);i<endAddress;++i)
        {
            //console.log('i: ' + i)
            subSetOfData.push(dataToEvaluate[i])
            //console.log('subsetOfData entry: ' + JSON.stringify(dataToEvaluate[i]))
        }
        return subSetOfData;
      }

      findStartAddressBasedOnDate(dataToEvaluate,dateToFind)
      {
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
