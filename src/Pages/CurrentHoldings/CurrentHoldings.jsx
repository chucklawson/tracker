import React, { useState, useEffect } from 'react';
import upGreenRight from '../../srcImages/UpGreenRight.png'
import downRedRight from '../../srcImages/DownRedRight.png'
import BasicTickerEvaluaton from '../../Components/BasicTickerEvaluaton/BasicTickerEvaluaton.jsx'

const CURRENT_HOLDINGS = 
  [
    {
      ticker: "DIA",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: true,             
    },
    {
      ticker: "VOO",
      costBasis: '439.06',
      unitsOnHand: 46,
      calculateAccumulatedProfitLoss: true,         
    },
    {
      ticker: "QQQ",
      costBasis: '0',
      unitsOnHand: 0,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "AAPL",
      costBasis: '210.04',
      unitsOnHand: 20,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "AMZN",
      costBasis: '157.26',
      unitsOnHand: 65,
      calculateAccumulatedProfitLoss: true,        
    },
    {
      ticker: "AVGO",
      costBasis: '250.01',
      unitsOnHand: 35,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "BRK-B",
      costBasis: '492.99',
      unitsOnHand: 10,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "COF",
      costBasis: '167.90',
      unitsOnHand: 217,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "COST",
      costBasis: '1010.61',
      unitsOnHand: 3,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "CRWD",
      costBasis: '359.77',
      unitsOnHand: 55,
      calculateAccumulatedProfitLoss: true,         
    },
    {
      ticker: "CSCO",
      costBasis: '67.89',
      unitsOnHand: 50,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "ENB",
      costBasis: '37.14',
      unitsOnHand: 95,
      calculateAccumulatedProfitLoss: true,         
    },
    {
      ticker: "GEV",
      costBasis: '460.35',
      unitsOnHand: 14,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "GS",
      costBasis: '600.54',
      unitsOnHand: 7,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "HON",
      costBasis: '222.74',
      unitsOnHand: 10,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "LLY",
      costBasis: '710.00',
      unitsOnHand: 4,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "META",
      costBasis: '641.04',
      unitsOnHand: 20,
      calculateAccumulatedProfitLoss: true,    
    },
    {
      ticker: "MSFT",
      costBasis: '375.16',
      unitsOnHand: 17,
      calculateAccumulatedProfitLoss: true,      
    },
    {
      ticker: "NLY",
      costBasis: '19.986',
      unitsOnHand: 300,
      calculateAccumulatedProfitLoss: true,      
    },
    {
      ticker: "NVDA",
      costBasis: '45.78',
      unitsOnHand: 275,
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "PANW",
      costBasis: '186.33',
      unitsOnHand: 30,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "TJX",
      costBasis: '128.87',
      unitsOnHand: 30,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "USA",
      costBasis: '7.06',
      unitsOnHand: 355,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "WFC",
      costBasis: '66.51',
      unitsOnHand: 200,
      calculateAccumulatedProfitLoss: true,      
    }

  ];


function CurrentHoldings() {

  const [stockSymbolToFetch,setStockSymbolToFetch] = useState('AAPL')
  const [headerValue,setHeaderValue] = useState('Current ')
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
    document.title = "Current Holdings"
 }, []);


  useEffect(() => {  
    //console.log("Running useEffect for: stockSymbolToFetch: " +stockSymbolToFetch)
}, [stockSymbolToFetch,headerValue,slope]);

  return (
    <div className="text-center">      
      
    <header className="bg-indigo-100 text-purple-600 text-3xl font-bold h-18 justify-items-center">
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

    <BasicTickerEvaluaton onSelectTickerButtonHandler = {onSelectTickerButtonHandler} onSetHeader = {onSetHeader} baseHeader='Current'
     onSetTodaysPercentageChange={onSetTodaysPercentageChange}
                          onSetSlope = {onSetSlope} tickerEntries={currentHoldings} backgroundLeft='bg-indigo-100'
                          buttonBackgroundColor='bg-indigo-400'/>
    {/*<StockQuote stockSymbol={stockSymbolToFetch}/>*/}
    </div>
  );
}

export default CurrentHoldings;
