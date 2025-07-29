export default class CompanyQuote {
    constructor(stockSymbolIn) {
        this.stockSymbol = stockSymbolIn;
        this.uniqueValue = '25a5fa6deb331d46e42609787aa281fe';    
        this.currentInfo= `https://financialmodelingprep.com/api/v3/quote/${this.stockSymbol}?apikey=${this.uniqueValue}`;
        this.dataObject=Object;
    }
    getTheQuote()
    {
        Promise.all([
            fetch(this.currentInfo)
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
              this.dataObject=data[0][0];
              console.log('The object: '+ JSON.stringify(data[0]))         
            } 
          }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
          })
    }
    toString() {
        return ("CompanyQuote stockSymbol: " + this.stockSymbol);
      }
  }

  
/*
import React, { useState, useEffect } from 'react';

const CompanyQuote = props => {
  
    const uniqueValue = '25a5fa6deb331d46e42609787aa281fe';    
    let currentInfo= `https://financialmodelingprep.com/api/v3/quote/${props.stockSymbol}?apikey=${uniqueValue}`;
    

    const [currentQuote, setcurrentQuote] = useState({});

    useEffect(() => { 
      if(props.stockSymbol.length<1)
      {
        return;
      }     
      //console.log("props startDate: " + props.latestStartDate)
      //console.log("props endDate: " + props.latestEndDate)
      //console.log("props adjustedStartDate: " + props.adjustedStartDate)
      
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
          //console.log('The object: '+ JSON.stringify(data[0]))         
        } 
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      })
    },[currentInfo])


    const setDatObjet = (theQuote,timeSeries,adjustedTimeSeries)=>{
       // console.log("setting data symbol as: " + data.symbol)
        setcurrentQuote(theQuote)
        props.onSetCurrentQuote(theQuote,timeSeries,adjustedTimeSeries);
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

export default CompanyQuote;
*/
