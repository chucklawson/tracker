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


  const LarryWilliamsChart =(props)=>{

    //console.log("Trying to draw chart.")
    //console.log ("data: " + JSON.stringify(props.data))
    return (

      <div>
        <LineChart
          width={props.width}
          height={props.height}
          data={props.data}
          margin={props.margin}
          >      

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval={4} angle={20} dx={0} scale="band"/>
          <YAxis type="number" domain={['auto','auto']} />
          <Tooltip />
          <Legend />
           
                <ReferenceLine y={props.overBought} label="Over Bought" stroke="red" /> 
                
                <Line type="monotone" dataKey="williams" strokeWidth={props.lineWidth} stroke="#356624"/>

                
                <ReferenceLine y={props.overSold} label="Over Sold"  strokeWidth={props.lineWidth} stroke="red" />    
        </LineChart>
      </div>
      
      
      
                
    );

  };
  
  export default LarryWilliamsChart; 