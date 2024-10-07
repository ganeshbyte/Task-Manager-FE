
export class UtilityFunction{
  static mapArray<IN, OUT>(array: Array<IN> | undefined, mapper: (i: IN, index?:number) => OUT): Array<OUT>{
    if(array === null || array === undefined || array.length === 0){
      return [];
    }
    return array.map((value, index: number) => mapper(value, index));
  }
}
