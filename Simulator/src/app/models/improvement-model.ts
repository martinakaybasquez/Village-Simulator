export interface ImprovementModel {
    type:string; 
    level: number;
    cost :{
        lumber: number,
        grain: number,
        water: number,
        sheep: number,
        person: number,
    };
    resource:{
        lumber: number,
        grain: number,
        water: number,
        sheep: number,
        person: number,
    };

}
