import VGCostBasisItem from "./VGCostBasisItem.jsx";

export default class CostBasisVanG {
    constructor(textToTranslateIn) {
        this.textToTranslate = textToTranslateIn;
    }

    parseTextIn()
    {
        let lines = this.textToTranslate.split('\n');
        /*
        for (var line = 0; line < lines.length; line++) {
                console.log(lines[line]);
            }
        */
        if(lines.length>=3)
        {
            for(let entryToEvaluate=3;entryToEvaluate<lines.length;++entryToEvaluate)
            {
                let oneLinesEntries=this.parseOneLinesEntries(lines[entryToEvaluate])
                if(oneLinesEntries.length===14)
                {
                    let aVGCostBasisItem=this.loadOneCostBasisItem(oneLinesEntries)
                    console.log('aVGCostBasisItem: ' + aVGCostBasisItem.toString() + '\n\n')
                }
            }
        }
    }

    parseOneLinesEntries(textToParse)
    {
        let oneLinesEntries=textToParse.split(',');
        /*
        console.log('oneLinesEntries.length: ' + oneLinesEntries.length)
        for (var entry = 0; entry < oneLinesEntries.length; entry++) {
            console.log(oneLinesEntries[entry]);
        }
        */
        return oneLinesEntries
    }

    loadOneCostBasisItem(entriesIn)
    {
        let aVGCostBasisItem=new VGCostBasisItem(
            entriesIn[0],
            entriesIn[1],
            entriesIn[2],
            entriesIn[3],
            entriesIn[4],
            entriesIn[5],
            entriesIn[6],
            entriesIn[7],
            entriesIn[8],
            entriesIn[9],
            entriesIn[10],
            entriesIn[11],
            entriesIn[12],
            entriesIn[13])
        return aVGCostBasisItem
    }


}
