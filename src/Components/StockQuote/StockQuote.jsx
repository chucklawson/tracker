import React, { useState, useEffect } from 'react';

const StockQuote = props => {
  
    const uniqueValue = '25a5fa6deb331d46e42609787aa281fe';    
    let currentInfo= `https://financialmodelingprep.com/api/v3/quote/${props.stockSymbol}?apikey=${uniqueValue}`;
    let timeSeries = `https://financialmodelingprep.com/api/v3/historical-price-full/${props.stockSymbol}?from=${props.latestStartDate}&to=${props.latestEndDate}&apikey=${uniqueValue}`
    let adjustedTimeSeries = `https://financialmodelingprep.com/api/v3/historical-price-full/${props.stockSymbol}?from=${props.adjustedStartDate}&to=${props.latestEndDate}&apikey=${uniqueValue}`
    let statementAnalysisKeyMetrics = `https://financialmodelingprep.com/api/v3/key-metrics/${props.stockSymbol}?period=quarter&apikey=${uniqueValue}`
    let williams =`https://financialmodelingprep.com/api/v3/technical_indicator/1day/${props.stockSymbol}?type=williams&period=10&apikey=${uniqueValue}`

    //console.log('currentInfo:  ' + currentInfo)
    //console.log('thetimeSeriesQuote:  ' + timeSeries)
    //console.log('props.stockSymbol: ' + props.stockSymbol)


    const [currentQuote, setcurrentQuote] = useState({});
    const [timeSeriesEntries, setTimeSeriesEntries] = useState({});
    const [adjustedTimeSeriesEntries, setAdjustedTimeSeriesEntries] = useState({});
    const [statementAnalysisKeyMetricsEntries,setStatementAnalysisKeyMetricsEntries]= useState({});
    const [larryWilliamsEntries,setLarryWilliamsEntries]= useState({});
/*
/*
/*
const [currentQuote, setcurrentQuote] = useState({});
/*
/*
    useEffect(() => {
        fetch(theQuote)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        (data) => {
          console.log(data);
            if(data[0]!== undefined){
                setDatObjet(data[0])
                
                console.log('StockQuote symbol: '+ data[0].symbol)
            }        
        }
      )
    }, [theCall]);

*/

    useEffect(() => { 
      if(props.stockSymbol.length<1)
      {
        return;
      }     
      //console.log("props startDate: " + props.latestStartDate)
      //console.log("props endDate: " + props.latestEndDate)
      //console.log("props adjustedStartDate: " + props.adjustedStartDate)
      if(props.latestStartDate.length > 0)
      {
      Promise.all([
        fetch(currentInfo),
        fetch(timeSeries),
        fetch(adjustedTimeSeries),
        fetch(statementAnalysisKeyMetrics)//,
        //fetch(williams)
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
          //setDatObjet(data[0][0],data[1].historical,data[2].historical,data[3],data[4])
          setDatObjet(data[0][0],data[1].historical,data[2].historical,data[3])
          //console.log('The object: '+ JSON.stringify(data[0]))
          //console.log('The Second object: '+ JSON.stringify(data[1]))
          //console.log('Histoical symbol: '+ data[1].symbol)
          //console.log('Historical date at address zero: '+ data[1].historical[0].date)

          //console.log('The THIRD object: '+ JSON.stringify(data[2]))
          //console.log('Second Histoical symbol: '+ data[2].symbol)
          //console.log('Second set of Historical date at address zero: '+ data[2].historical[0].date)

          //console.log('Second Histoical symbol: '+ data[2].symbol)
          //console.log('Second set of Historical date at address zero: '+ data[2].historical[0].date)

          //console.log('The FOURTH object: '+ JSON.stringify(data[3][0]))
          //console.log('The FOURTH object length: '+ data[3].length)

        } 
      }).catch(function (error) {
        // if there's an error, log it
        //console.log('Logging Error')
        //console.log(error);
      })
      }
    //},[currentInfo,timeSeries,adjustedTimeSeries,statementAnalysisKeyMetrics,williams])
      },[currentInfo,timeSeries,adjustedTimeSeries,statementAnalysisKeyMetrics])


    //const setDatObjet = (theQuote,timeSeries,adjustedTimeSeries,statmentAnalysis,larryWilliams)=>{
    const setDatObjet = (theQuote,timeSeries,adjustedTimeSeries,statmentAnalysis)=>{
        //console.log("theQuote: " + theQuote)
        setcurrentQuote(theQuote)        
        setTimeSeriesEntries(timeSeries);
        setAdjustedTimeSeriesEntries(adjustedTimeSeries);
        setStatementAnalysisKeyMetricsEntries(statementAnalysisKeyMetrics);
        //setLarryWilliamsEntries(larryWilliams);
        //props.onSetCurrentQuote(theQuote,timeSeries,adjustedTimeSeries,statmentAnalysis,larryWilliams);
        props.onSetCurrentQuote(theQuote,timeSeries,adjustedTimeSeries,statmentAnalysis);
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

export default StockQuote;