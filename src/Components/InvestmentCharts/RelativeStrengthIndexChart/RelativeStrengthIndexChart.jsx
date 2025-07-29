
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



  const RelativeStrengthIndexChart =(props)=>{

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
                <Line type="monotone" dataKey="rsiValue" strokeWidth={props.lineWidth} stroke="#45848f" />
                <ReferenceLine y={props.overSold} label="Over Sold"  strokeWidth={props.lineWidth} stroke="red" />    
        </LineChart>
      </div>
      
      
      
                
    );

  };
  
  export default RelativeStrengthIndexChart; 