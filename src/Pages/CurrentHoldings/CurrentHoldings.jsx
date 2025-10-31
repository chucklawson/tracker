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
      costBasis: '596.99',
      unitsOnHand: 4,
      calculateAccumulatedProfitLoss: false,
    },
    {
      ticker: "AAPL",
      costBasis: '230.01',
      unitsOnHand: 30,
      calculateAccumulatedProfitLoss: true,
    },
    {
    ticker: "AMD",
    costBasis: '177.62',
    unitsOnHand: 25,
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
      costBasis: '269.99',
      unitsOnHand: 54,
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
      costBasis: '968.48',
      unitsOnHand: 7,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "CRWD",
      costBasis: '359.77',
      unitsOnHand: 55,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "ENB",
      costBasis: '38.86',
      unitsOnHand: 110,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "GEV",
      costBasis: '478.18',
      unitsOnHand: 16,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "GLW",
      costBasis: '83.5',
      unitsOnHand: 20,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "GOOGL",
      costBasis: '202.89',
      unitsOnHand: 25,
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
      ticker: "META",
      costBasis: '673.05',
      unitsOnHand: 50,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "MSFT",
      costBasis: '416.72',
      unitsOnHand: 41,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "ORCL",
      costBasis: '303.61',
      unitsOnHand: 6,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "NEM",
      costBasis: '89.73',
      unitsOnHand: 25,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "NKE",
      costBasis: '66.27',
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
      costBasis: '56.62',
      unitsOnHand: 300,
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
