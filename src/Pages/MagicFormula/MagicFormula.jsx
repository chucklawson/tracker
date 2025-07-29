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
    },
    {
      ticker: "VOO",
      costBasis: '0.0',
      unitsOnHand: 0,             
    },
    {
      ticker: "QQQ",
      costBasis: '0.0',
      unitsOnHand: 0,             
    },
    {
      ticker: "BKE",
      costBasis: '0.0',
      unitsOnHand: 25,             
    },
    {
        ticker: "CVS",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
        ticker: "DDS",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
        ticker: "GILD",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
        ticker: "HPQ",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
        ticker: "MCK",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
      ticker: "MO",
      costBasis: '0.0',
      unitsOnHand:183,             
  },
    {
        ticker: "MRNA",
        costBasis: '0.0',
        unitsOnHand: 7,             
    },
    {
      ticker: "NUE",
      costBasis: '0.0',
      unitsOnHand: 8,             
    },
    {
        ticker: "OMC",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
        ticker: "PARA",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
        ticker: "PFE",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
        ticker: "RHI",
        costBasis: '0.0',
        unitsOnHand: 0,             
    },
    {
      ticker: "SIGA",
      costBasis: '0.0',
      unitsOnHand: 0,             
  },
    {
      ticker: "WSM",
      costBasis: '0.0',
      unitsOnHand: 15,             
  },

  ];


const MagicFormula=()=> {

  const [stockSymbolToFetch,setStockSymbolToFetch] = useState('AAPL')
  const [headerValue,setHeaderValue] = useState('Magic Formula')
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
    document.title = "Magic Formula"
 }, []);

  useEffect(() => {  
    //console.log("Running useEffect for: stockSymbolToFetch: " +stockSymbolToFetch)
}, [stockSymbolToFetch,headerValue,slope]);

  return (
    <div className="text-center">
    <header className="bg-purple-100 text-purple-600 text-3xl font-bold h-18 justify-items-center">
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

    <BasicTickerEvaluaton onSelectTickerButtonHandler = {onSelectTickerButtonHandler} onSetHeader = {onSetHeader} baseHeader='Magic Formula'
     onSetTodaysPercentageChange={onSetTodaysPercentageChange}
                          onSetSlope = {onSetSlope} tickerEntries={currentHoldings} backgroundLeft='bg-violet-100'
                          buttonBackgroundColor='bg-violet-400'/>
    {/*<StockQuote stockSymbol={stockSymbolToFetch}/>*/}
    </div>
  );
}

export default MagicFormula;
