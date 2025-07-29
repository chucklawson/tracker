import React, { useState, useEffect } from 'react';

const BatchQuote = props => {
  
    const uniqueValue = '25a5fa6deb331d46e42609787aa281fe';    
    let currentInfo= `https://financialmodelingprep.com/api/v3/quote/${props.stockSymbols}?apikey=${uniqueValue}`;

    //console.log('currentInfo:  ' + currentInfo)
    //console.log('thetimeSeriesQuote:  ' + timeSeries)
    //console.log('props.stockSymbol: ' + props.stockSymbol)
    //console.log('props.period: ' + props.period)


    const [currentQuote, setcurrentQuote] = useState({});


    useEffect(() => { 
      if(props.stockSymbols.length<1)
      {
        return;
      }     
      //console.log("props startDate: " + props.latestStartDate)
      //console.log("props endDate: " + props.latestEndDate)
      //console.log("props adjustedStartDate: " + props.adjustedStartDate)
      //if(props.latestStartDate.length > 0)
      //{
      Promise.all([
        fetch(currentInfo)
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
          setDatObjet(data[0][0])
          console.log('The object: '+ JSON.stringify(data[0]))
          console.log('Number of entries: '+ JSON.stringify(data[0].length))

          for(let i=0;i<data[0].length;++i)
          {
            console.log(JSON.stringify(data[0][i].symbol))
          }
          //console.log('The Second object: '+ JSON.stringify(data[1]))
          
        } 
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      })
     // }
    },[currentInfo])


    const setDatObjet = (theQuote)=>{
       // console.log("setting data symbol as: " + data.symbol)
        setcurrentQuote(theQuote)
        props.onSetCurrentQuote(theQuote);
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

export default BatchQuote;