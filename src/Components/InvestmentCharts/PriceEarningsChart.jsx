import React from 'react';

  import { BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ReferenceLine}
      from 'recharts';

      

  const PriceEarningsChart =(props)=>{

    //console.log("Trying to draw price to equity chart.")
    //console.log ("data: " + JSON.stringify(props.data))
    return (

      <div>
        <BarChart
            width={props.width}
            height={props.height}
            data={props.data}
            margin={props.margin}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="xAxisDataKey" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="priceToEarnings" fill="#82ca9d" />
        </BarChart>
      </div>
      
      
      
                
    );

  };
  
  export default PriceEarningsChart; 