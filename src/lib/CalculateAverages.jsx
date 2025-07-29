
import StandardChartData from './StandardChartData.jsx';
import StandardMovingAverage from './StandardMovingAverage.jsx'
import ExponentialMovingAverage from './ExponentialMovingAverage.jsx';
import BollingerBands from './BollingerBands';
//import RSIChartData from './RSIChartData';
import RSIChartEntries from './RSIChartEntries.jsx'
import LWChartEntries from './LWChartEntries.jsx'
import StochasticChartEntries from './StochasticChartEntries.jsx'
import StatementAnalysisKeyMetricsData from './StatementAnalysisKeyMetricsData.jsx'


export function dailyValues(standardValuesIn, adjustedToContainFullYearOfDataValuesIn)
{
    //console.log("got into dailyValues: ")
    //console.log("valuesIn.length: " + standardValuesIn.length)
    //console.log("adjustedValuesIn.length: " + adjustedToContainFullYearOfDataValuesIn.length)
    if(standardValuesIn.length === undefined)
    {
        console.log("valuesIn.length === undefined")
        return null;
    }
    let accumulatedChartData = [];
    for(let i=0;i<standardValuesIn.length;++i){
        let chartDataEntry = new StandardChartData(standardValuesIn[i].date,standardValuesIn[i].close,0.0,0.0,0.0,0.0,0.0,0.0,0.0)
        //console.log("chartDataEntry using toString: " + chartDataEntry.toString())
        accumulatedChartData.push(chartDataEntry);
    }
    /*
    for(let j=0;j<accumulatedChartData.length;++j)
    {
        console.log('accumulatedChartData[ '+j + ' ]: '+ accumulatedChartData[j].toString())
    }
    */

    //console.log("accumulatedChartData.length: " + accumulatedChartData.length)
    // modified 083123 from 33 to 100, then back again
    let numberOfDaysToLookBack=33;
    let standardAverages = new StandardMovingAverage(adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBack);
    accumulatedChartData=standardAverages.generateTheAverages(accumulatedChartData)

    let numberOfDaysToLookBackExponentially=10;
    let exponentialMovingAverages = new ExponentialMovingAverage(adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBackExponentially);
    accumulatedChartData=exponentialMovingAverages.generateTheAverages(accumulatedChartData)

    numberOfDaysToLookBack=200;
    let twoHundredDayChartData = [];
    let twoHundredDayMoveingAverage = new StandardMovingAverage(adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBack);
    twoHundredDayChartData=twoHundredDayMoveingAverage.generateTheAverages(accumulatedChartData)
    //console.log('twoHundredDayChartData: '+ twoHundredDayChartData)
    for(let j=0; j <accumulatedChartData.length;++j)
      {
        accumulatedChartData[j].twoHundredDayMovingAverage=twoHundredDayChartData[j].simpleMovingAverage
        //console.log('twoHundredDayMovingAverage Entry: ' + accumulatedChartData[j].twoHundredDayMovingAverage)
      }

    numberOfDaysToLookBack=50;
    let fiftyDayChartData = [];
    let fiftyDayMoveingAverage = new StandardMovingAverage(adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBack);
    fiftyDayChartData=fiftyDayMoveingAverage.generateTheAverages(accumulatedChartData)
    //console.log('twoHundredDayChartData: '+ twoHundredDayChartData)
    for(let j=0; j <accumulatedChartData.length;++j)
      {
        accumulatedChartData[j].fiftyDayMovingAverage=fiftyDayChartData[j].simpleMovingAverage
        //console.log('twoHundredDayMovingAverage Entry: ' + accumulatedChartData[j].twoHundredDayMovingAverage)
      }



    /*
    numberOfDaysToLookBack=200;
    let twoHundredDayMovingAverages = new StandardMovingAverage(adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBack);
    accumulatedChartData=standardAverages.generateThetwoAverages(accumulatedChartData)
    */


    //console.log("standardAverages: " + standardAverages.toString())

    return accumulatedChartData;
}

// standardValuesIn are those from the rest endpoint for the time period selected
// adjustedToContainFullYearOfDataValuesIn are those from the rest endpoint for the time period selected + a year
// accumulatedChartDataIn contains the chart data excluding bollingerBands... so add them and give it back
export function bollingerBands(standardValuesIn, adjustedToContainFullYearOfDataValuesIn, accumulatedChartDataIn)
{ 
    
    if(standardValuesIn.length === undefined)
    {
        console.log("standardValuesIn.length === undefined")
        return null;
    }

    // if decide to use standard use numberOfDaysToLookBack and adjust witn BollingerBands
    // otherwise, current set to do Exponential calcualtions
    // Make the adjustment around line 32 marked with 'Adjust here' within BollingerBands.js
    //let numberOfDaysToLookBack=33;
    //let numberOfDaysToLookBackExponentially=10;
    let numberOfDaysToLookBackNoRounding=20;

           
    let bollingerBands = new BollingerBands(standardValuesIn, adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBackNoRounding)
    let bollingers = bollingerBands.generateBollingerBands()

    let adjustedChartData = [];
    for(let j=0; j <accumulatedChartDataIn.length;++j)
      {
        let adjustedChartDataEntry = new StandardChartData(accumulatedChartDataIn[j].dateOfClose,
            accumulatedChartDataIn[j].dailyClosingPrice,
            accumulatedChartDataIn[j].simpleMovingAverage,
            accumulatedChartDataIn[j].expMovingAverage,
            accumulatedChartDataIn[j].twoHundredDayMovingAverage,
            accumulatedChartDataIn[j].fiftyDayMovingAverage,
            bollingers[j].lowerBandValue,
            bollingers[j].upperBandValue,
            bollingers[j].mean)
        //console.log('adjustedChartDataEntry: ' + adjustedChartDataEntry.toString())
        adjustedChartData.push(adjustedChartDataEntry)
      }
    return adjustedChartData ;
}

export function getRsiChartData(standardValuesIn,adjustedToContainFullYearOfDataValuesIn)
{
    
    let numberOfDaysToLookBack=14;

    let rSIChartEntries=new RSIChartEntries(standardValuesIn,adjustedToContainFullYearOfDataValuesIn,numberOfDaysToLookBack)
    let tempRsiData=rSIChartEntries.generateRsiValues()
    return tempRsiData;
}

export function getStochasticChartData(standardValuesIn,adjustedToContainFullYearOfDataValuesIn)
{
    let slowInidcatorDaysToLookBack=3;
    let fastInidcatorDaysToLookBack=14
    
    let stochasticChartEntries=new StochasticChartEntries(standardValuesIn,adjustedToContainFullYearOfDataValuesIn,slowInidcatorDaysToLookBack,fastInidcatorDaysToLookBack)
    let stochasticData=stochasticChartEntries.generateStochasticValues()
    //console.log('stochasticData from calculateAverages: ' + JSON.stringify(stochasticData))
    return stochasticData;
}

export function getLwChartData(larryWilliams,startDate,endDate)
{
    
    

    let lwChartEntries=new LWChartEntries(larryWilliams,startDate,endDate)
    let LWData=lwChartEntries.generateLWValues()

    //console.log("LWData:  " + LWData)

    return LWData;
}

export function getPriceToEarningsChartData(statmentAnalysisKeyMetrics)
{
    let priceToEquityData = [];
    let entriesToCollect= 8;

    if((statmentAnalysisKeyMetrics!=null) && (statmentAnalysisKeyMetrics.length !== undefined)&& (statmentAnalysisKeyMetrics.length>entriesToCollect))
    {
        for(let i=0;i<entriesToCollect;++i)
        {
            let statementAnalysisKeyMetricsData = new StatementAnalysisKeyMetricsData(statmentAnalysisKeyMetrics[i])
            priceToEquityData.push(statementAnalysisKeyMetricsData);
            
        }
    }   

    //console.log('priceToEquityData: ' + priceToEquityData)

    return priceToEquityData.reverse();
}

