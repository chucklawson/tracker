import React from "react";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from 'recharts';


const InvestmentComposedChar = (props) => {

    return (
        <div>
          <ComposedChart
            width={props.width}
            height={props.height}
            data={props.data}
            margin={props.margin}
            >

            <CartesianGrid stroke="#f5f5f5" />
                {/*<XAxis dataKey="name" scale="band" />*/}
                <defs>
                    <linearGradient id="colorPurpleFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGreenFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="dateOfClose" interval={4} angle={20} dx={0} scale="band" />
                <YAxis type="number" domain={['auto','auto']} />
            <Tooltip />
            <Legend />
                
                <Area type="monotone" dataKey="dailyClosingPrice" stroke="#8884d8" strokeWidth={props.lineWidth} fillOpacity={1} fill="url(#colorGreenFill)"dot={true} />
           
                <Line type="monotone" dataKey="simpleMovingAverage" strokeWidth={props.lineWidth} stroke="#095cb5" dot={false} />
                <Line type="monotone" dataKey="expMovingAverage" strokeWidth={props.lineWidth} stroke="#b50909"  /> 

                <Line type="monotone" dataKey="twoHundredDayMovingAverage" strokeWidth={props.lineWidth} stroke="#1FF7EA" dot={false} /> 
                <Line type="monotone" dataKey="fiftyDayMovingAverage" strokeWidth={props.lineWidth} stroke="#F792C8" dot={false} /> 

                {props.showBollingerbands && <Line type="monotone" dataKey="upperBollingerValue" strokeWidth={props.lineWidth} stroke="#99ADFF" dot={false} /> }
                {props.showMean && <Line type="monotone" dataKey="mean" strokeWidth={props.lineWidth} stroke="#f007d1" dot={false} /> }
                {props.showBollingerbands && <Line type="monotone"  dataKey="lowerBollingerValue" strokeWidth={props.lineWidth} stroke="#99ADFF" dot={false} />}    
          </ComposedChart>
        </div>
      );
};

export default InvestmentComposedChar;