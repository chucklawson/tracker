

        export default class StatementAnalysisKeyMetricsData {
            constructor(dataObjectIn) {
                   this.symbol=dataObjectIn.symbol;
                   this.date=dataObjectIn.date;
                   this.period=dataObjectIn.period;
                   this.calendarYear=dataObjectIn.calendarYear;
                   this.revenuePerShare=dataObjectIn.revenuePerShare;
                   this.netIncomePerShare=dataObjectIn.netIncomePerShare;
                   this.operatingCashFlowPerShare=dataObjectIn.operatingCashFlowPerShare;
                   this.freeCashFlowPerShare=dataObjectIn.freeCashFlowPerShare;
                   this.cashPerShare=dataObjectIn.cashPerShare;
                   this.bookValuePerShare=dataObjectIn.bookValuePerShare;
                   this.tangibleBookValuePerShare=dataObjectIn.tangibleBookValuePerShare;
                   this.shareholdersEquityPerShare=dataObjectIn.shareholdersEquityPerShare;
                   this.interestDebtPerShare=dataObjectIn.interestDebtPerShare;
                   this.marketCap=dataObjectIn.marketCap;
                   this.enterpriseValue=dataObjectIn.enterpriseValue;
                   this.peRatio=dataObjectIn.peRatio;
                   this.priceToSalesRatio=dataObjectIn.priceToSalesRatio;
                   this.pocfratio=dataObjectIn.pocfratio;
                   this.pfcfRatio=dataObjectIn.pfcfRatio;
                   this.pbRatio=dataObjectIn.pbRatio;
                   this.ptbRatio=dataObjectIn.ptbRatio;
                   this.evToSales=dataObjectIn.evToSales;
                   this.evToFreeCashFlow=dataObjectIn.evToFreeCashFlow;
                   this.enterpriseValueOverEBITDA=dataObjectIn.enterpriseValueOverEBITDA;
                   this.evToOperatingCashFlow=dataObjectIn.evToOperatingCashFlow;
                   this.earningsYield=dataObjectIn.earningsYield;
                   this.freeCashFlowYield=dataObjectIn.freeCashFlowYield;
                   this.debtToEquity=dataObjectIn.debtToEquity;
                   this.debtToAssets=dataObjectIn.debtToAssets;
                   this.debtToMarketCap=dataObjectIn.debtToMarketCap;
                   this.netDebtToEBITDA=dataObjectIn.netDebtToEBITDA;
                   this.currentRatio=dataObjectIn.currentRatio;
                   this.interestCoverage=dataObjectIn.interestCoverage;
                   this.incomeQuality=dataObjectIn.incomeQuality;
                   this.dividendPerShare=dataObjectIn.dividendPerShare;
                   this.dividendYield=dataObjectIn.dividendYield;
                   this.dividendYieldPercentage=dataObjectIn.dividendYieldPercentage;
                   this.payoutRatio=dataObjectIn.payoutRatio;
                   this.salesGeneralAndAdministrativeToRevenue=dataObjectIn.salesGeneralAndAdministrativeToRevenue;
                   this.researchAndDevelopementToRevenue=dataObjectIn.researchAndDevelopementToRevenue;
                   this.intangiblesToTotalAssets=dataObjectIn.intangiblesToTotalAssets;
                   this.capexToOperatingCashFlow=dataObjectIn.capexToOperatingCashFlow;
                   this.capexToRevenue=dataObjectIn.capexToRevenue;
                   this.capexToDepreciation=dataObjectIn.capexToDepreciation;
                   this.stockBasedCompensationToRevenue=dataObjectIn.stockBasedCompensationToRevenue;
                   this.grahamNumber=dataObjectIn.grahamNumber;
                   this.roic=dataObjectIn.roic;
                   this.returnOnTangibleAssets=dataObjectIn.returnOnTangibleAssets;
                   this.grahamNetNet=dataObjectIn.grahamNetNet;
                   this.workingCapital=dataObjectIn.workingCapital;
                   this.tangibleAssetValue=dataObjectIn.tangibleAssetValue;
                   this.netCurrentAssetValue=dataObjectIn.netCurrentAssetValue;
                   this.investedCapital=dataObjectIn.investedCapital;
                   this.averageReceivables=dataObjectIn.averageReceivables;
                   this.averagePayables=dataObjectIn.averagePayables;
                   this.averageInventory=dataObjectIn.averageInventory;
                   this.daysSalesOutstanding=dataObjectIn.daysSalesOutstanding;
                   this.daysPayablesOutstanding=dataObjectIn.daysPayablesOutstanding;
                   this.daysOfInventoryOnHand=dataObjectIn.daysOfInventoryOnHand;
                   this.receivablesTurnover=dataObjectIn.receivablesTurnover;
                   this.payablesTurnover=dataObjectIn.payablesTurnover;
                   this.inventoryTurnover=dataObjectIn.inventoryTurnover;
                   this.capexPerShare=dataObjectIn.capexPerShare;
                   this.updatedAt=dataObjectIn.updatedAt;
                   this.createdAt=dataObjectIn.createdAt;
                   this.xAxisDataKey=this.period + " " + this.calendarYear;
                   this.priceToEarnings = this.peRatio.toFixed(2);                  
            }

            toString() {
                return "symbol: " + this.symbol + ', date: ' + this.date
                 + ', period: ' + this.period + ', calendarYear: ' + this.calendarYear
                 + ', calendarYear: ' + this.calendarYear
                 + ', revenuePerShare: ' +  this.revenuePerShare
                 + ', netIncomePerShare: ' +   this.netIncomePerShare
                 + ', operatingCashFlowPerShare: ' +   this.operatingCashFlowPerShare
                 + ', freeCashFlowPerShare: ' +    this.freeCashFlowPerShare
                 + ', cashPerShare: ' +   this.cashPerShare
                 + ', bookValuePerShare: ' +   this.bookValuePerShare
                 + ', tangibleBookValuePerShare: ' +   this.tangibleBookValuePerShare
                 + ', shareholdersEquityPerShare: ' +   this.shareholdersEquityPerShare
                 + ', interestDebtPerShare: ' +   this.interestDebtPerShare
                 + ', marketCap: ' +   this.marketCap
                 + ', enterpriseValue: ' +   this.enterpriseValue
                 + ', peRatio: ' +   this.peRatio
                 + ', priceToSalesRatio: ' + this.priceToSalesRatio
                 + ', pocfratio: ' + this.pocfratio
                   + ', pfcfRatio: ' + this.pfcfRatio
                   + ', pbRatio: ' + this.pbRatio
                   + ', ptbRatio: ' + this.ptbRatio
                   + ', evToSales: ' + this.evToSales
                   + ', evToFreeCashFlow: ' + this.evToFreeCashFlow
                   + ', enterpriseValueOverEBITDA: ' + this.enterpriseValueOverEBITDA
                   + ', fearningsYieldoo: ' + this.earningsYield
                   + ', freeCashFlowYield: ' + this.freeCashFlowYield
                   + ', debtToEquity: ' + this.debtToEquity
                   + ', debtToAssets: ' + this.debtToAssets
                   + ', debtToMarketCap: ' + this.debtToMarketCap
                   + ', netDebtToEBITDA: ' + this.netDebtToEBITDA
                   + ', currentRatio: ' + this.currentRatio
                   + ', interestCoverage: ' + this.interestCoverage
                   + ', incomeQuality: ' + this.incomeQuality
                   + ', dividendPerShare: ' + this.dividendPerShare
                   + ', fodividendYieldo: ' + this.dividendYield
                   + ', dividendYieldPercentage: ' + this.dividendYieldPercentage
                   + ', payoutRatio: ' + this.payoutRatio
                   + ', salesGeneralAndAdministrativeToRevenue: ' + this.salesGeneralAndAdministrativeToRevenue
                   + ', researchAndDevelopementToRevenue: ' + this.researchAndDevelopementToRevenue
                   + ', intangiblesToTotalAssets: ' + this.intangiblesToTotalAssets
                   + ', capexToOperatingCashFlow: ' + this.capexToOperatingCashFlow
                   + ', capexToRevenue: ' + this.capexToRevenue
                   + ', capexToDepreciation: ' + this.capexToDepreciation
                   + ', stockBasedCompensationToRevenue: ' + this.stockBasedCompensationToRevenue
                   + ', grahamNumberfoo: ' + this.grahamNumbe
                   + ', roic: ' + this.roic
                   + ', returnOnTangibleAssets: ' + this.returnOnTangibleAssets
                   + ', grahamNetNet: ' + this.grahamNetNet
                   + ', workingCapital: ' + this.workingCapital
                   + ', tangibleAssetValue: ' + this.tangibleAssetValue
                   + ', netCurrentAssetValue: ' + this.netCurrentAssetValue
                   + ', investedCapital: ' + this.investedCapital
                   + ', averageReceivables: ' + this.averageReceivables
                   + ', averagePayables: ' + this.averagePayables
                   + ', averageInventory: ' + this.averageInventory
                   + ', daysSalesOutstanding: ' + this.daysSalesOutstanding
                   + ', daysPayablesOutstanding: ' + this.daysPayablesOutstanding
                   + ', daysOfInventoryOnHand: ' + this.daysOfInventoryOnHand
                   + ', receivablesTurnover: ' + this.receivablesTurnover
                   + ', payablesTurnover: ' + this.payablesTurnover
                   + ', inventoryTurnover: ' + this.inventoryTurnover
                   + ', capexPerShare: ' + this.capexPerShare
                   + ', updatedAt: ' + this.updatedAt
                   + ', createdAt: ' + this.createdAt
                   + ', xAxisDataKey: ' + this.xAxisDataKey
                   + ', priceToEarnings: ' + this.priceToEarnings
              }
        }

