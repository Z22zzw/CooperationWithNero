export interface TableList{
    name:string,
    visibility:number,
    change:number,
}
export interface ProjectDetails {
    id:string
    name: string,
    totalUp:number,
    totalCite:number,
    mention:TableList[],
    regional_division:TableList[],
    platform_division:TableList[],
    // x:日期，y:变化
    change_line:{
        x:string,
        y:number,
    }[]
}