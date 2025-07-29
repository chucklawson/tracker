
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
  } from "recharts";



  const StochasitcOscillatorChart =(props)=>{

    return (

      <div>
        <LineChart
          width={props.width}
          height={props.height}
          data={props.data}
          margin={props.margin}
          >

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateOfClose" interval={4} angle={20} dx={0} scale="band"/>
          <YAxis type="number" domain={[0,100]} />
          <Tooltip />
          <Legend />
           
                <ReferenceLine y={props.overBought} label="Over Bought" stroke="red" /> 
                <Line type="monotone" dataKey="fastSstochasticValue" strokeWidth={props.lineWidth} stroke="#356624"/>
                <Line type="monotone" dataKey="slowStochasticValue" strokeWidth={props.lineWidth} stroke="#2b16c7" dot={false} />

                
                <ReferenceLine y={props.overSold} label="Over Sold"  strokeWidth={props.lineWidth} stroke="red" />    
        </LineChart>
      </div>
      
      
      
                
    );

  };
  
  export default StochasitcOscillatorChart; 