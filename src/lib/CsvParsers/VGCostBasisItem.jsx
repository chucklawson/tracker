export default class VGCostBasisItem{

    constructor(accountIn, symbolIn, descriptionIn,acquiredDateIn,costBasisMethodIn,quantityIn,costPerSharein,totalCostIn,marketValueIn,
        shortTermGainLossIn,longTermGainLossIn,totalGainLossIn,coveredNonCoveredIn,percentGainLossIn) {
        this.account = accountIn;
        this.symbol=symbolIn;
        this.description= descriptionIn;
        this.aquiredDate=acquiredDateIn;
        this.costBasisMethod=costBasisMethodIn;
        this.quantity=quantityIn;
        this.costPerShare=costPerSharein;
        this.totalCost=totalCostIn;
        this.marketValue=marketValueIn;
        this.shortTermGainLoss=shortTermGainLossIn;
        this.longTermGainLoss=longTermGainLossIn;
        this.totalGainLoss=totalGainLossIn;
        this.coveredNonCovered=coveredNonCoveredIn;
        this.percentGainLoss=percentGainLossIn;
    }
    setAccount(accountIn)
    {
        this.account=accountIn;
    }

    getAccount()
    {
        return this.account;
    }

    setSymbol(symbolIn)
    {
        this.symbol=symbolIn;
    }
    getSymbol()
    {
        return this.symbol;
    }

    setDescription(descriptionIn)
    {
        this.description=descriptionIn;
    }
    getDescription()
    {
        return this.description;
    }

    setAcquiredDate(acquiredDateIn)
    {
        this.acquiredDate=acquiredDateIn;
    }
    getAcquiredDate()
    {
        return this.acquiredDate;
    }

    setCostBasisMethod(costBasisMethodIn)
    {
        this.costBasisMethod=costBasisMethodIn;
    }
    getCostBasisMethod()
    {
        return this.costBasisMethod;
    }

    setQuantity(quantityIn)
    {
        this.quantity=quantityIn;
    }
    getQuantity()
    {
        return this.quantity;
    }

    setCostPerShare(costPerShareIn)
    {
        this.costPerShare=costPerShareIn;
    }
    getCostPerShare()
    {
        return this.costPerShare;
    }

    setTotalCost(totalCostIn)
    {
        this.totalCost=totalCostIn;
    }
    getTotalCost()
    {
        return this.totalCost;
    }

    setMarketValue(marketValueIn)
    {
        this.marketValue=marketValueIn;
    }
    getMarketValue()
    {
        return this.marketValue;
    }

    setShortTermGainLoss(shortTermGainLossIn)
    {
        this.shortTermGainLoss=shortTermGainLossIn;
    }
    getShortTermGainLoss()
    {
        return this.shortTermGainLoss;
    }

    setLongTermGainLoss(longTermGainLossIn)
    {
        this.longTermGainLoss=longTermGainLossIn;
    }
    getLongTermGainLoss()
    {
        return this.longTermGainLoss;
    }

    setTotalGainLoss(totalGainLossIn)
    {
        this.totalGainLoss=totalGainLossIn;
    }
    getTotalGainLoss()
    {
        return this.totalGainLoss;
    }

    setCoveredNonCovered(coveredNonCoveredIn)
    {
        this.coveredNonCovered=coveredNonCoveredIn;
    }
    getCoveredNonCovered()
    {
        return this.coveredNonCovered;
    }

    setPercentGainLoss(percentGainLossIn)
    {
        this.percentGainLoss=percentGainLossIn;
    }
    getPercentGainLoss()
    {
        return this.percentGainLoss;
    }

    toString() {
        return ("VGCostBasisItem, account: " + this.account +
         ', symbol: ' + this.symbol +
         ', description: ' + this.description + 
         ', aquiredDate: ' + this.aquiredDate + 
         ', costBasisMethod: ' + this.costBasisMethod +
         ', quantity: ' + this.quantity +
          ',costPerShare: ' + this.costPerShare +
         ', totalCost: ' + this.totalCost + 
         ', marketValue: ' + this.marketValue +
         ', shortTermGainLoss: ' + this.shortTermGainLoss +
          ',longTermGainLoss: ' + this.longTermGainLoss +
         ', totalGainLoss: ' + this.totalGainLoss +
         ',coveredNonCovered: ' + this.coveredNonCovered +
        ', percentGainLoss: ' + this.percentGainLoss);
      }
}