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
      ticker: "AAPL",
      costBasis: '18.96',
      unitsOnHand: 855,
      calculateAccumulatedProfitLoss: true,      
    },
    {
      ticker: "ABT",
      costBasis: '110.10',
      unitsOnHand: 700,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "BBY",
      costBasis: '77.78',
      unitsOnHand: 700,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "COST",
      costBasis: '289.90',
      unitsOnHand: 75,
      calculateAccumulatedProfitLoss: true,           
    },
    {
      ticker: "CRM",
      costBasis: '161.05',
      unitsOnHand: 200,
      calculateAccumulatedProfitLoss: true,           
    },
    {
      ticker: "ETN",
      costBasis: '239.91',
      unitsOnHand: 275,
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "GOOGL",
      costBasis: '63.37',
      unitsOnHand: 500,
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "HON",
      costBasis: '188.22',
      unitsOnHand: 245,
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "LIN",
      costBasis: '313.27',
      unitsOnHand: 165,
      calculateAccumulatedProfitLoss: true,             
    },
    {
      ticker: "META",
      costBasis: '189.83',
      unitsOnHand: 265,
      calculateAccumulatedProfitLoss: true,             
    },
    {
      ticker: "MS",
      costBasis: '83.63',
      unitsOnHand: 750,
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "NXT",
      costBasis: '42.90',
      unitsOnHand: 1150,
      calculateAccumulatedProfitLoss: true,
    },
    {
      ticker: "PANW",
      costBasis: '218.67',
      unitsOnHand: 230,
      calculateAccumulatedProfitLoss: true,             
    },
    {
      ticker: "TJX",
      costBasis: '66.15',
      unitsOnHand: 750,
      calculateAccumulatedProfitLoss: true,            
    },
    {
      ticker: "WFC",
      costBasis: '37.15',
      unitsOnHand: 2100,
      calculateAccumulatedProfitLoss: true,             
    }

  ];


function ClubHolds() {

  const [stockSymbolToFetch,setStockSymbolToFetch] = useState('AAPL')
  const [headerValue,setHeaderValue] = useState('Club Holds')
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
    document.title = "Club Holds"
 }, []);

  useEffect(() => {  
    //console.log("Running useEffect for: stockSymbolToFetch: " +stockSymbolToFetch)
}, [stockSymbolToFetch,headerValue,slope]);

  return (
    <div className="text-center">
    <header className="bg-sky-100 text-sky-600 text-3xl font-bold h-18 justify-items-center">
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

    <BasicTickerEvaluaton onSelectTickerButtonHandler = {onSelectTickerButtonHandler} onSetHeader = {onSetHeader} baseHeader='Club Holds'
     onSetTodaysPercentageChange={onSetTodaysPercentageChange}
                          onSetSlope = {onSetSlope} tickerEntries={currentHoldings} backgroundLeft='bg-sky-100'
                          buttonBackgroundColor='bg-sky-400'/>
    {/*<StockQuote stockSymbol={stockSymbolToFetch}/>*/}
    </div>
  );
}

export default ClubHolds;
