import React, { useState, useEffect } from 'react';

const HistoricalDividendQuote = props => {
  
    const uniqueValue = '25a5fa6deb331d46e42609787aa281fe';    
    let currentInfo= `https://financialmodelingprep.com/api/v3/quote/${props.stockSymbol}?apikey=${uniqueValue}`;
    let dividendInfo = `https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${props.stockSymbol}?apikey=${uniqueValue}`;
    
    //console.log('currentInfo:  ' + currentInfo)
    //console.log('dividendInfo:  ' + dividendInfo)


    const [currentQuote, setcurrentQuote] = useState({});
    const [dividentEntries,setDividentEntries]= useState({});


    useEffect(() => { 
      if(props.stockSymbol.length<1)
      {
        return;
      }   
      //{
      Promise.all([
        fetch(currentInfo),
        fetch(dividendInfo)
      ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        // Could Log the data to the console
        // You would do something with both sets of data here       
        //console.log("The data: " + data);
        if(data[0][0].symbol !== undefined){
          // currently sets the quote data
          setDatObjet(data[0][0],data[1])
          //console.log('The object: '+ JSON.stringify(data[0]))
          //console.log('The Second object length: '+ data[1].length)
          //console.log('The Second object: '+ JSON.stringify(data[1]))
          //console.log('Histoical symbol: '+ data[1].symbol)
          //console.log('Historical date at address zero: '+ data[1].historical[0].date)
        } 
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      })
     // }
    },[currentInfo,dividendInfo])


    const setDatObjet = (theQuote,dividendData)=>{
       // console.log("setting data symbol as: " + data.symbol)
        setcurrentQuote(theQuote)        
        setDividentEntries(dividendData);

        props.onSetCurrentQuote(theQuote,dividendData);
    }

    useEffect (() => {
        //console.log('currentQuote: ' + currentQuote.symbol)
    },
    [currentQuote])

    if(currentQuote === undefined)
    return(
        <React.Fragment/>
    )

    //console.log("startDate: " + props.latestStartDate)
    //console.log("endDate: " + props.latestEndDate)


    return <React.Fragment/>   
};

export default HistoricalDividendQuote;