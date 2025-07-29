import React, { useState, useEffect } from 'react';
import upGreenRight from '../../srcImages/UpGreenRight.png'
import downRedRight from '../../srcImages/DownRedRight.png'
import BasicTickerEvaluaton from '../../Components/BasicTickerEvaluaton/BasicTickerEvaluaton.jsx'

const CURRENT_HOLDINGS = 
  [
    {
      ticker: "DIA",
      costBasis: '0.0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "VOO",
      costBasis: '0.0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "QQQ",
      costBasis: '0.0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "AAPL",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "ADC",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "ADBE",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "AXP",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "BKE",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "CAT",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "COST",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "CVS",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "DOV",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "ETN",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "ET",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "GLD",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "HPQ",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "INTC",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "INTU",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "JPM",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "MDB",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "MO",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "MPLX",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "NOW",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "NUE",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "NXT",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "ORCL",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "SPG",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "TGT",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "TSM",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "UBER",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "UTG",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "VICI",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "VOOG",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    },
    {
      ticker: "WMT",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "WPC",
      costBasis: '0',
      unitsOnHand: 0, 
      calculateAccumulatedProfitLoss: false,          
    }
    

  ];


function WatchList() {

  const [stockSymbolToFetch,setStockSymbolToFetch] = useState('AAPL')
  const [headerValue,setHeaderValue] = useState('Watch List')
  const [todaysPercentageChange, setTodaysPercentageChange] = useState(0.0);
  const [isTodaysChangePositive, setIsTodaysChangePositive] = useState(true);
  const [slope, setSlope] = useState(0.0)
  const [currentHoldings,setCurrentHoldings]=useState(CURRENT_HOLDINGS);

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
    document.title = "Watch List"
 }, []);

  useEffect(() => {  
    //console.log("Running useEffect for: stockSymbolToFetch: " +stockSymbolToFetch)
}, [stockSymbolToFetch,headerValue,slope]);

  return (
    <div className="text-center">
    <header className="bg-emerald-100 text-sky-600 text-3xl font-bold h-18 justify-items-center">
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
      </div>          
    </header>

    <BasicTickerEvaluaton onSelectTickerButtonHandler = {onSelectTickerButtonHandler} onSetHeader = {onSetHeader} baseHeader='Watch List'
     onSetTodaysPercentageChange={onSetTodaysPercentageChange}
                          onSetSlope = {onSetSlope} tickerEntries={currentHoldings} backgroundLeft='bg-emerald-100'
                          buttonBackgroundColor='bg-emerald-400'/>
    {/*<StockQuote stockSymbol={stockSymbolToFetch}/>*/}
    </div>
  );
}

export default WatchList;
