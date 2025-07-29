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
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "VOO",
      costBasis: '0.0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: true,             
    },
    {
      ticker: "QQQ",
      costBasis: '0.0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: true,             
    },
    {
      ticker: "AMD",
      costBasis: '157.17',
      unitsOnHand: 675,
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "AMZN",
      costBasis: '97.43',
      unitsOnHand: 750,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "AVGO",
      costBasis: '95.09',
      unitsOnHand: 750,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "BLK",
      costBasis: '1010.49',
      unitsOnHand: 45,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "BMY",
      costBasis: '59.51',
      unitsOnHand: 600,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "CRWD",
      costBasis: '317.76',
      unitsOnHand: 150,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "CTRA",
      costBasis: '27.83',
      unitsOnHand: 3300,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "DD",
      costBasis: '76.54',
      unitsOnHand: 1450,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "DHR",
      costBasis: '243.70',
      unitsOnHand: 550,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "DIS",
      costBasis: '118.30',
      unitsOnHand: 930,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "DOV",
      costBasis: '180.72',
      unitsOnHand: 500,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "GEHC",
      costBasis: '74.29',
      unitsOnHand: 975,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "HD",
      costBasis: '381.67',
      unitsOnHand: 175,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "LLY",
      costBasis: '281.97',
      unitsOnHand: 105,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "MSFT",
      costBasis: '308.56',
      unitsOnHand: 260,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "NVDA",
      costBasis: '14.83',
      unitsOnHand: 1300,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "SBUX",
      costBasis: '85.13',
      unitsOnHand: 1100,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "STZ",
      costBasis: '283.78',
      unitsOnHand: 425,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "SWK",
      costBasis: '88.11',
      unitsOnHand: 760,
      calculateAccumulatedProfitLoss: true,
    }
    

  ];


function ClubPreferences() {

  const [stockSymbolToFetch,setStockSymbolToFetch] = useState('AAPL')
  const [headerValue,setHeaderValue] = useState('Club Buys')
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
    document.title = "Club Buys"
 }, []);

  useEffect(() => {  
    //console.log("Running useEffect for: stockSymbolToFetch: " +stockSymbolToFetch)
}, [stockSymbolToFetch,headerValue,slope]);

  return (
    <div className="text-center">
    <header className="bg-blue-100 text-blue-600 text-3xl font-bold h-18 justify-items-center">
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

    <BasicTickerEvaluaton onSelectTickerButtonHandler = {onSelectTickerButtonHandler} onSetHeader = {onSetHeader} baseHeader='Club Favorites'
     onSetTodaysPercentageChange={onSetTodaysPercentageChange}
                          onSetSlope = {onSetSlope} tickerEntries={currentHoldings} backgroundLeft='bg-blue-100'
                          buttonBackgroundColor='bg-blue-400'/>
    {/*<StockQuote stockSymbol={stockSymbolToFetch}/>*/}
    </div>
  );
}

export default ClubPreferences;
