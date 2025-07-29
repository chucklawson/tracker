import React from "react";
import {useEffect, useState } from "react";
import SpreadSheet from 'react-spreadsheet'
import StatementInput from '../../Components/SatementInput/StatementInput.jsx';
import HistoricalDividendQuote from '../../Components/ApiCalls/HistoricalDividendQuote.jsx';
import {loadHistoricalMetricsData,buildColumnTitles,buildRowTitles,buildHstoricalDataToShow,calculateYield} from '../../lib/CollectHistoricalDividendData.jsx'

const HistoricalDividends = () =>{

  
    const [tickerToGet, setTickerToGet] = useState('');
    const [updateTickerValue, setUpdateTickerValue] = useState(false);
    const [buttonBackgroundColor,setbuttonBackgroundColor]= useState('bg-lime-400');
    const [classValuesLeft,setClassValuesLeft]=useState('')
    const [currentQuote, setcurrentQuote] = useState({});
    const [dividendData,setDividendData] = useState({});
    const [periodsToShow, setPeriodsToShow] = useState(8);
    const [period,setPeriod] = useState('quarter')
    const [curnetYield,setCurrentYield] = useState(0)


    const [data, setData] = useState([])
  
    const [col,setCol]=useState([])
    const [row,setRow]=useState([])


    const [headerValue,setHeaderValue] = useState("Dividends")

    useEffect(() => {
        document.title = "Dividends";
        setbuttonBackgroundColor('bg-lime-400');        
     }, []);

    
        
    const onTickerChangeHandler = (tickerValue) => {
      if (tickerValue.trim().length > 0)       {
          // looks like a couple of guys that need a reducer
          //console.log('tickerValue: ' + tickerValue)
          setTickerToGet(tickerValue.trim());                   

          setUpdateTickerValue(true);

          
          //props.onSetHeader( props.baseHeader + " - " + tickerValue.trim());
          //console.log("tickerValue: " + tickerValue); 
          
          
      }
   }

   const onPeriodsChangeHandler = (periodsToUse) => {
    if (periodsToUse.trim().length > 0)       {
        // looks like a couple of guys that need a reducer
        //console.log('periodsToUse: ' + periodsToUse)
        setPeriodsToShow(periodsToUse.trim());                   

        setUpdateTickerValue(true);

        
        //props.onSetHeader( props.baseHeader + " - " + tickerValue.trim());
        //console.log("periodsToShow: " + periodsToShow); 
        
        
    }
   }

   const onSetCurrentQuote=(currentQuoteIn,dividendDataIn)=>
    {
        //console.log("dividendDataIn: " + JSON.stringify(dividendDataIn));
        setcurrentQuote(currentQuoteIn);       
        setDividendData(dividendDataIn);
    }

    const [annualChecked, setAnnualChecked] = React.useState(false);

    const annualChangeHandler = () => {
      setAnnualChecked(!annualChecked);
      if(!annualChecked === true)
      {
        setPeriod('annual')
        //console.log("setting period: annual");
      }
      else
      {
        setPeriod('quarter')
        //console.log("setting period: quarter");
      }
    };

    useEffect(() => {  
      //console.log("calling load the dividend data into the spreadsheet")
      //console.log("dividendData: " + JSON.stringify(dividendData));
      if((dividendData.historical!==undefined)&&(dividendData.historical.length>0))
      {        
        let historicalDividendData  = loadHistoricalMetricsData(dividendData.historical);
        //console.log("statmentData length: " + statementData.length);
        //   console.log("statmentData: " + statementData);
              //console.log("Generating Price to Equity")
              //setPriceEarningsData(getPriceToEarningsChartData(statmentAnalysisKeyMetrics))
              //console.log("currentQuote: " + JSON.stringify(currentQuote));
              //console.log("statmentAnalysisKeyMetrics: " + JSON.stringify(statmentAnalysisKeyMetrics));

              //console.log("calling setCol")

              setCol(buildColumnTitles())
              
              setRow(buildRowTitles(historicalDividendData,periodsToShow))

              setData(buildHstoricalDataToShow(historicalDividendData,periodsToShow))

              setCurrentYield(calculateYield(historicalDividendData,currentQuote))
          
      }
      else{
        setData([])
        setCol([])
        setRow([])
        setCurrentYield(0.0)
      }
  }, [currentQuote, dividendData,periodsToShow]);


return (
    

    <div className='bg-gray-100 grid grid-cols-12 gap-4'>
      <div className={classValuesLeft}>
    </div>

    <div className='col-start-1 col-span-12'>
            <header className="bg-lime-100 text-lime-600 text-3xl font-bold h-18 justify-items-center p-1">
                <div>
                    {headerValue}
                </div>
                <div className='text-green-600 text-3xl font-bold'>
                    Yield: {curnetYield} %
                </div>
            </header>        
    </div>

      <div className='col-start-5 col-span-4'>

          <StatementInput  onTickerValue={onTickerChangeHandler} onPeriodsValue={onPeriodsChangeHandler} currentTicker={tickerToGet}
              containerBackGround= {buttonBackgroundColor} runningStatment={false}></StatementInput> 
          <HistoricalDividendQuote stockSymbol={tickerToGet} onSetCurrentQuote={onSetCurrentQuote}/>
               
      </div>

      <div className='col-start-1 col-span-12 justify-items-center p-1'>

          <SpreadSheet data={data} columnLabels={col} rowLabels={row} onChange={setData} /> 
        
      </div>    

    </div>

    )
}
export default HistoricalDividends;