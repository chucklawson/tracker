import HistoricalDividendData from './HistoricalDividendData.jsx'


export function loadHistoricalMetricsData(dividendData)
{
    let historicalDividendsData = [];

    if((dividendData!=null) && (dividendData.length !== undefined))
    {
        for(let i=0;i<dividendData.length;++i)
        {
            let historicalDividendData = new HistoricalDividendData(dividendData[i])
            historicalDividendsData.push(historicalDividendData);            
        }
    }
    //console.log('historicalDividendsData.length' + historicalDividendsData.length)
    return historicalDividendsData;
}

export function buildRowTitles(historicalData,periodsToShow)
{
    let rows = [];
    //let statementAnalysisKeyMetricsData=statementData[0];

    for(let i=0;i<periodsToShow;++i)
    {
        rows = setRowTitle(rows,historicalData[i].label)
    }   
    return rows;
}

function setRowTitle(rows,titleToUse)
{
    rows.push(titleToUse)
    return rows;
}

export function buildColumnTitles()
{
    let colTitles = [];
    colTitles.push('Date');
    colTitles.push('Adj Dividend');
    colTitles.push('Dividend');
    colTitles.push('Record Date');
    colTitles.push('Payment Date');
    colTitles.push('Declaration Date');
    return colTitles;
}

export function buildHstoricalDataToShow(historicalData,periodsToUse)
{
    let rows = [];
    let row = [];
    for(let i=0;i<periodsToUse;++i)
    {    
        row = []; 
        row=addOneRowElement(row,historicalData[i].date);
        row=addOneRowElement(row,historicalData[i].adjDividend);
        row=addOneRowElement(row,historicalData[i].dividend);
        row=addOneRowElement(row,historicalData[i].recordDate);
        row=addOneRowElement(row,historicalData[i].paymentDate);
        row=addOneRowElement(row,historicalData[i].declarationDate);
        rows.push(row)
    }
    return rows;
}

function addOneRowElement(row,element)
{
    if ((typeof element === 'number') && (Number.isInteger(element)==false))
    {
        row.push({ value: element.toFixed(2) })
    }
    else{
        row.push({ value: element})
    }
    return row;
}

export function calculateYield(historicalData,currentQuote)
{
    let periodsInPreviousYear=calculatePeriodsInPreiousYear(historicalData)
    //console.log('periodsInPreviousYear: ' + periodsInPreviousYear)

    let dividendRate=parseFloat(periodsInPreviousYear*historicalData[0].dividend)
    //console.log('dividendRate: ' + dividendRate)

    //console.log("currentQuote: " + JSON.stringify(currentQuote));

    //console.log('currentPrice: ' + currentQuote.price)

    let price = parseFloat(currentQuote.price)

    let percentageYield = 0.0;
    if((dividendRate>0.0)&&(price>0.0))
    {
        percentageYield=parseFloat( (dividendRate/price)*100.0).toFixed(2)
    }
    return percentageYield
}

function calculatePeriodsInPreiousYear(historicalData)
{
    let previousYear=(parseInt(historicalData[0].date.substring(0,4))-1)
    //console.log('previousYear: ' + previousYear)
    let periodsInPreviousYear=0;
    for(let i=0;i<historicalData.length;++i)
    {
        if(parseInt(historicalData[i].date.substring(0,4)) === previousYear)
        {
            ++periodsInPreviousYear;
        }
    }
    return periodsInPreviousYear;
}

