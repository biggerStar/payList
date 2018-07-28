export class PaylistEchartData{
   legendData: Array<Object>;
   seriesData: Array<Object>;
   total: Number;
  constructor(legendData:Array<Object> ,seriesData:Array<Object>,  total: Number){
    this.legendData = legendData;
    this.seriesData = seriesData;
    this.total = total;
  }
}