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
      costBasis: '209.83',
      unitsOnHand: 20,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "AMD",
      costBasis: '163.25',
      unitsOnHand: 20,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "AMZN",
      costBasis: '162.46',
      unitsOnHand: 85,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "AVGO",
      costBasis: '257.65',
      unitsOnHand: 45,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "BA",
      costBasis: '222.03',
      unitsOnHand: 25,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "COF",
      //costBasis: '167.90',
      //unitsOnHand: 217,
      costBasis: '129.45',
      unitsOnHand: 541,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "COST",
      costBasis: '989.98',
      unitsOnHand: 5,
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
      costBasis: '67.34',
      unitsOnHand: 40,
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
      ticker: "GOOGL",
      costBasis: '193.12',
      unitsOnHand: 20,
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
      costBasis: '226.37',
      unitsOnHand: 20,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "INTC",
      costBasis: '30.25',
      unitsOnHand: 40,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "META",
      costBasis: '662.21',
      unitsOnHand: 25,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "MSFT",
      costBasis: '381.54',
      unitsOnHand: 30,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "NLY",
      costBasis: '20.20',
      unitsOnHand: 400,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "NVDA",
      costBasis: '52.37',
      unitsOnHand: 290,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "O",
      costBasis: '59.07',
      unitsOnHand: 30,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "PANW",
      costBasis: '197.35',
      unitsOnHand: 25,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "SBUX",
      costBasis: '92.14',
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
      ticker: "V",
      costBasis: '337.46',
      unitsOnHand: 10,
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
