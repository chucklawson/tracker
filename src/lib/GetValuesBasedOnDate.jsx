export default class GetValuesBasedOnDate {
    constructor(dateIn) {
        this.date = dateIn;
    }

    getAHistoricDateBySubtractingFromNow(numberOfDaysToGoBack,oneYearHistoryChecked)
    {
        let date =new Date();
        
        if(oneYearHistoryChecked === true)
        {
            date.setDate(date.getDate()-1)
            date.setFullYear(date.getFullYear() -1);
        }
        else{
            date.setDate(date.getDate()-numberOfDaysToGoBack)
        }
        return date;
    }

    goBackSpecificNumberOfDays(adjustedTimeSeriesIn, numberOfDaysToGoBack)
    {
        let adjustedTimeSeries=adjustedTimeSeriesIn;

        if(adjustedTimeSeries.length<2)
        {
            return -1.0;
        }

        let dateToLocate = getAHistoricDateBySubtractingFromNow(numberOfDaysToGoBack,false);

        /*
        console.log('adjustedTimeSeries stringified: '+ JSON.stringify(adjustedTimeSeries[0]))
        
        for(let i=0;i<adjustedTimeSeries.length;++i)
        {
            console.log('adjustedTimeSeries.date: ' + adjustedTimeSeries[i].date, ', adjClose: ' + adjustedTimeSeries[i].adjClose)
        }
        */

        let value = findAValueBasedOnDate(dateToLocate,adjustedTimeSeries)
        return value;
    }

    findAValueBasedOnDate(dateToLocate,timeSeries)
    {
        let value=0.0;
        //console.log('findAValueBasedOnDate, dateToLocate: ' + dateToLocate.toLocaleDateString());
        for(let i=0;i<timeSeries.length;++i)
        {
            let tempDate=new Date(timeSeries[i].date)            
            if(tempDate<=dateToLocate)
            {
                value = timeSeries[i].adjClose;
                //console.log('findAValueBasedOnDate, tempDate: ' + tempDate.toLocaleDateString() + ', value: ' + value);
            }
            else{
                //console.log('findAValueBasedOnDate, BREAKING, tempDate: ' + tempDate.toLocaleDateString() + ', value: ' + timeSeries[i].adjClose);
                value = timeSeries[i].adjClose;
                break;
            }
        }
        return value;
    }

    findTheLowValueBasedOnDate(dateToLocate,timeSeries)
    {
        let lowValue=10000000.0;
        //console.log('findTheHighValueBasedOnDate, dateToLocate: ' + dateToLocate.toLocaleDateString());
        for(let i=0;i<timeSeries.length;++i)
        {
            let tempDate=new Date(timeSeries[i].date)            
            if(tempDate>dateToLocate)
            {
                if( parseFloat(timeSeries[i].adjClose) < lowValue)
                {
                    lowValue = parseFloat(timeSeries[i].adjClose);
                    //console.log('Set low value: ' + lowValue);
                }
            }
        }
        return lowValue;
    }

    findTheHighValueBasedOnDate(dateToLocate,timeSeries)
    {
        let hightValue=0.0;
        //console.log('findTheHighValueBasedOnDate, dateToLocate: ' + dateToLocate.toLocaleDateString());
        for(let i=0;i<timeSeries.length;++i)
        {
            let tempDate=new Date(timeSeries[i].date)            
            if(tempDate>dateToLocate)
            {
                if( parseFloat(timeSeries[i].adjClose) > hightValue)
                {
                    hightValue = parseFloat(timeSeries[i].adjClose);
                    //console.log('Set high value: ' + hightValue);
                }
            }
        }
        return hightValue;
    }

    convertDateForDateInputPicker(dateIn)
    {
        let isoDate=dateIn.toISOString()
        let convertedDate=isoDate.substring(0,isoDate.indexOf('T'))
        return convertedDate;
    }

    getDate_2017()
    {
        let date =new Date(Date.parse("2017-02-01T00:00:00"));
        //date=Date.parse("2017-02-01T00:00:00");        
        return date;
    }

    getDate_2021()
    {
        let date =new Date(Date.parse("2021-02-01T00:00:00"));
        //date=Date.parse("2021-02-01T00:00:00");        
        return date;
    }

    getDate_2025()
    {
        let date =new Date(Date.parse("2025-02-01T00:00:00"));
        //date=Date.parse("2025-02-01T00:00:00");        
        return date;
    }


    toString() {
        return ("GetValuesBasedOnDate: " + this.date);
      }
  };

  export const { goBackSpecificNumberOfDays, getAHistoricDateBySubtractingFromNow,
                     findAValueBasedOnDate, findTheLowValueBasedOnDate, findTheHighValueBasedOnDate,
                     convertDateForDateInputPicker,getDate_2017,getDate_2021,getDate_2025 } = new GetValuesBasedOnDate(Date.now)



