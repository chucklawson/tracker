import LWChartData from "./LWChartData.jsx"

export default class LWChartEntries {
    constructor(larryWilliamsIn,startDateIn,endDateIn) {
        this.larryWilliams = larryWilliamsIn;
        this.startDate = startDateIn;
        this.endDate = endDateIn;
        //console.log("larryWilliams startDate: "+ this.startDate +  ", endDate: " + this.endDate);
        //console.log("larryWilliams: "+ JSON.stringify(this.larryWilliams))

        

        //LWChartData
        //console.log("larryWilliams length: "+ JSON.stringify(this.larryWilliams.length))
        //console.log("fullYearOfDataValuesIn: "+ JSON.stringify(fullYearOfDataValuesIn))
      }

    generateLWValues()
    {
        

       

        if((this.larryWilliams == null)||(this.larryWilliams.length === undefined))
        {
            console.log("larryWilliams.length is null or undefined")
            return null;
        }

        let startAddress = this.findAddressBasedOnDate(this.larryWilliams,this.startDate)
        let endAddress = this.findAddressBasedOnDate(this.larryWilliams,this.endDate)
        //console.log("start address: " + startAddress)
        //console.log("end address: " + endAddress)

        let LWData = [];

        for(let i=startAddress;i>=endAddress;--i)
        {
          let aLWChartData = new LWChartData( this.larryWilliams[i].date,
            this.larryWilliams[i].open,
            this.larryWilliams[i].high,
            this.larryWilliams[i].low,
            this.larryWilliams[i].close,
            this.larryWilliams[i].volume,
            this.larryWilliams[i].williams);

            LWData.push(aLWChartData);
        }

        //console.log("LWData:  " + LWData)

        return LWData;
      }

      findAddressBasedOnDate(dataToEvaluate,dateToFind)
      {
        //console.log('dataToEvaluate: ' + JSON.stringify(dataToEvaluate))

        //console.log('dateToFind: ' + dateToFind);

        let dateToLocate=new Date(dateToFind)

        dateToLocate=this.convertDateForAnalysis(dateToLocate)

        //consoleateToLocate: ' + dateToLocate);
        
        let address=-1;
        for(let i=0;i<dataToEvaluate.length;i++)
        {
            let dateEvaluating = new Date(dataToEvaluate[i].date); 
            dateEvaluating=this.convertDateForAnalysis(dateEvaluating)          

            //console.log('dateEvaluating: ' + dateEvaluating);

            if(dateEvaluating<=dateToLocate)
            {
                //console.log('located ' + dateToFind + ' at address: ' + i + ' where the date is: ' + dataToEvaluate[i].date)
                address=i;
                break;
            }
        }
        return address;
      }

      convertDateForAnalysis(dateIn)
      {
          let isoDate=dateIn.toISOString()
          let convertedDate=isoDate.substring(0,isoDate.indexOf('T'))
          return convertedDate;
      }
      

}
