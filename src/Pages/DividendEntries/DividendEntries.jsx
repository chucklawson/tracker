import React, { useState, useEffect } from 'react';
import upGreenRight from '../../srcImages/UpGreenRight.png'
import downRedRight from '../../srcImages/DownRedRight.png'
import BasicTickerEvaluaton from '../../Components/BasicTickerEvaluaton/BasicTickerEvaluaton.jsx'
import {calculateProjectedYield} from '../../lib/ProfitLoss/CalculateOverallProfitLoss.jsx'

const CURRENT_HOLDINGS = 
  [


    {
      ticker: "ENB",
      costBasis: '37.14',
      unitsOnHand: 95,
      calculateAccumulatedProfitLoss: true,
      baseYield: '7.42',          
    },
    {
      ticker: "NLY",
      costBasis: '20.20',
      unitsOnHand: 400,
      calculateAccumulatedProfitLoss: true,
      baseYield: '13.86',
    },
    {
      ticker: "USA",
      costBasis: '7.06',
      unitsOnHand: 355,
      calculateAccumulatedProfitLoss: true,
      baseYield: '9.64',
    }

  ];


const DividendEntries=()=> {

  const [stockSymbolToFetch,setStockSymbolToFetch] = useState('AAPL')
  const [headerValue,setHeaderValue] = useState('Dividend Entries')
  const [todaysPercentageChange, setTodaysPercentageChange] = useState(0.0);
  const [isTodaysChangePositive, setIsTodaysChangePositive] = useState(true);
  const [slope, setSlope] = useState(0.0)
  const [currentHoldings,setCurrentHoldings]=useState(CURRENT_HOLDINGS);
  const [accumulatedValues,setAccumulatedValues]=useState(calculateProjectedYield(CURRENT_HOLDINGS))

  const onSelectTickerButtonHandler=(tickerToEvaluate)=>
  {
    setStockSymbolToFetch(tickerToEvaluate)
    //console.log("Setting stockSymbolToFetch: " +stockSymbolToFetch)
  }

  const onSetHeader=(headerValueIn)=>
  {
    setHeaderValue(headerValueIn)
  }

  const onSetTodaysPercentageChange = (percentageChange, isChnagePositive) => {
    setTodaysPercentageChange(percentageChange);
    setIsTodaysChangePositive(isChnagePositive);
  }

  const onSetSlope = (slopeIn) => {
    setSlope(slopeIn)
  }

  useEffect(() => {
    document.title = "Dividend Entries"
 }, []);

  useEffect(() => {  
    //console.log("Running useEffect for: stockSymbolToFetch: " +stockSymbolToFetch)
}, [stockSymbolToFetch,headerValue,slope]);

  return (
    <div className="text-center">
    <header className="bg-teal-100 text-teal-600 text-3xl font-bold h-18 justify-items-center">
      <div>
        {headerValue}
      </div>
      <div>
                {isTodaysChangePositive === true ?
                    <div className='text-green-600 text-3xl font-bold'>

                        Today's Change: {todaysPercentageChange} %
                    </div> :
                    <div className='text-red-600 text-3xl font-bold'>

                        Today's Change: {todaysPercentageChange} %
                    </div>
                    }
      </div>     
      <div>
        {slope >= 0.0 ?
          <div className='text-green-600 text-3xl font-bold'>            
                {/*Exponential change: {slope}  */}              
                <img className="inline-block w-10 h-8 ml-7 " src={upGreenRight} alt=""></img>                           
          </div> :
          <div className='text-red-600 text-3xl font-bold'>
                {/*} Exponential change: {slope} */} 
                  <img className="inline-block w-12 h-10 ml-7" src={downRedRight} alt=""></img> 
          </div>
          
          }
        <div className='text-green-600 text-3xl font-bold'>             
            Projected Div's: ${accumulatedValues.totalProjectedGain}/Yield: {accumulatedValues.percentageGainLoss}%                       
        </div>
          
      </div>          
    </header>

    <BasicTickerEvaluaton onSelectTickerButtonHandler = {onSelectTickerButtonHandler} onSetHeader = {onSetHeader} baseHeader='Dividend Entries'
     onSetTodaysPercentageChange={onSetTodaysPercentageChange}
                          onSetSlope = {onSetSlope} tickerEntries={currentHoldings} backgroundLeft='bg-teal-100'
                          buttonBackgroundColor='bg-teal-400'/>
    {/*<StockQuote stockSymbol={stockSymbolToFetch}/>*/}
    </div>
  );
}

export default DividendEntries;
