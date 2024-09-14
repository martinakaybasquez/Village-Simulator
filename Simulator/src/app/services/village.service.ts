import { Injectable } from '@angular/core';
import { ImprovementModel } from '../models/improvement-model';

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  
  constructor() { }
  
  improvement:ImprovementModel[] = [];
  //allImprovements = current resource totals 
  allImprovements:ImprovementModel[] = [
    {
      type:"house",
      level:1,
      cost:{lumber:5, grain:5, water:5, sheep:1, person:0},
      resource:{lumber:0, grain:0, water:0, sheep:0, person:5}
    },
    {
      type:"field",
      level:1,
      cost:{lumber:0, grain:0, water:2, sheep:0, person:1},
      resource:{lumber:0, grain:10, water:0, sheep:0, person:0}
    },
    {
      type:"pasture",
      level:1,
      cost:{lumber:0, grain:2, water:2, sheep:0, person:1},
      resource:{lumber:0, grain:0, water:0, sheep:5, person:0}
    },
    {
      type:"lumber mill",
      level:1,
      cost:{lumber:0, grain:0, water:0, sheep:0, person:1},
      resource:{lumber:10, grain:0, water:0, sheep:0, person:0}
    },
    {
      type:"well",
      level:1,
      cost:{lumber:2, grain:0, water:0, sheep:0, person:1},
      resource:{lumber:0, grain:0, water:10, sheep:0, person:0}
    }]
  
  addImprovement(){
    
  }

  removeImprovement(){

  }

  upgradeImprovement(){

  }

  downgradeImprovement(){

  }
}

