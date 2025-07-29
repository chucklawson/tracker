import React, { useState } from 'react';

const TradingRangeIndicator = props => {
  
    return (
        <div className="h-1 mt-5 mb-30">       
                <div>
                <label className="form-label">{props.heading}</label>
                </div>
                <div >
                    <span className="inline-block ml-2" > {props.lowRangeValue} </span>  
                    <div className="inline-block" >
                    <input
                        type="range"
                        className="
                              inline-block
                              form-range
                              appearance-none
                              w-3/4
                              h-1
                              p-0
                              bg-gray-300
                              rounded-full
                              focus:outline-none focus:ring-0 focus:shadow-none
                            "
                        min="0"
                        max="100"
                        step="1.0"
                        value={props.rangeValue}
                        id="customRange1"
                        disabled
                    />
                    </div>
                    <span className="inline-block mr-2" >{props.highRangeValue}</span>  
                </div>
                {
                    props.currentValues === true ?
                    <div>                        
                        <div className="text-gray-600 font-normal text-xs mt-3 mb-5">
                            Open: ${props.currentQuote.open}, Low: ${props.currentQuote.dayLow}, High: ${props.currentQuote.dayHigh}, Last: ${props.currentQuote.price}
                        </div>
                        <div className="text-gray-600 font-normal text-xs mt-3 mb-5">
                            EPS: ${props.currentQuote.eps},      PE: {props.currentQuote.pe}
                        </div>
                    </div>
                    :<div></div>
                }
        </div> 
  );
};

export default TradingRangeIndicator;