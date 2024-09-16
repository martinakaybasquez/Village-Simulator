import { Injectable } from '@angular/core';
import { ImprovementModel } from '../models/improvement-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  constructor() { }
  
  private valueEmitter = new BehaviorSubject<any>(null);
  valueEmitter$ = this.valueEmitter.asObservable();

  availableResources = {
    person: 0,
    lumber: 5,
    grain: 5,
    water: 5,
    sheep: 1,
  };

  improvement:ImprovementModel[] = []; // acts as an empty "cart" you fill with improvments
  allImprovements:ImprovementModel[] = [
    {
      type:"House",
      level:1,
      cost:{lumber:5, grain:5, water:5, sheep:1, person:0},
      resource:{lumber:0, grain:0, water:0, sheep:0, person:5}
    },
    {
      type:"Field",
      level:1,
      cost:{lumber:0, grain:0, water:2, sheep:0, person:1},
      resource:{lumber:0, grain:10, water:0, sheep:0, person:0}
    },
    {
      type:"Pasture",
      level:1,
      cost:{lumber:0, grain:2, water:2, sheep:0, person:1},
      resource:{lumber:0, grain:0, water:0, sheep:5, person:0}
    },
    {
      type:"Lumber",
      level:1,
      cost:{lumber:0, grain:0, water:0, sheep:0, person:1},
      resource:{lumber:10, grain:0, water:0, sheep:0, person:0}
    },
    {
      type:"Well",
      level:1,
      cost:{lumber:2, grain:0, water:0, sheep:0, person:1},
      resource:{lumber:0, grain:0, water:10, sheep:0, person:0}
    }
  ];

  getImprovements() {
    return this.improvement;
  }
  
  getResources() {
    return this.availableResources;
  }

  //  method that takes in cost:any variable and returns a boolean
  // for user to afford improvement ALL statements must return true
  private canAfford(cost:any):boolean {
    return (
      this.availableResources.lumber >= cost.lumber &&
      this.availableResources.grain >= cost.grain &&
      this.availableResources.water >= cost.water &&
      this.availableResources.sheep >= cost.sheep &&
      this.availableResources.person >= cost.person
    );
  }

  // method that takes in resource:any and returns void
  private addResources(resource:any):void {
    this.availableResources.lumber += resource.lumber;
    this.availableResources.grain += resource.grain;
    this.availableResources.water += resource.water;
    this.availableResources.sheep += resource.sheep;
    this.availableResources.person += resource.person;
    this.valueEmitter.next(true);
    console.log("emitting");
  }

  private deductCost(cost:{[key:string]:number }):void {
    Object.keys(cost).forEach(resource => {
      (this.availableResources as any)[resource] -= cost[resource];
  });
  }
  
  // method that takes in improvementItem:ImprovementModel and returns a string
  // if user can afford improvement it will be deducted from individual cost of each item
  // after deducting, new value is assigned to availableResources
  addImprovement(improvementItem:ImprovementModel):string {
    if (this.canAfford(improvementItem) || true) {
      this.availableResources.person -= improvementItem.cost.person;
      this.availableResources.lumber -= improvementItem.cost.lumber;
      this.availableResources.grain -= improvementItem.cost.grain;
      this.availableResources.water -= improvementItem.cost.water;
      this.availableResources.sheep -= improvementItem.cost.sheep;
      this.addResources(improvementItem.resource);
      this.improvement.push(improvementItem);
      return `${improvementItem.type} is added successfully`;
    }
    else {
      return `${improvementItem.type} is not enough`; // TODO --  why unreachable
    }
  }

  // method that takes in a type:string and returns boolean
  // index = finds the index of the object in the improvement[] that matches the type of improvement 
  removeImprovement(type:string):boolean {
    let index = this.improvement.findIndex(i => i.type === type); // find the index of the improvement type within the array
    let removedImprovement = this.improvement[index]; // assign removedImprovement to the index match 
      this.addResources(removedImprovement.cost); // Re-add the cost to resources
      this.deductCost(removedImprovement.resource); // Remove the resources produced by the newimprovement
      this.improvement.splice(index, 1);
      console.log(`Improvement ${type} removed.`);
      return true;
  }

   // method that takes in a type:string and returns string
   // index = finds the index of the object in the improvement[] that matches the type of improvement 
   // PURPOSE: ↑cost ∝ resource (directly proportional)
  upgradeImprovement(type:string):string {
    let index = this.improvement.findIndex(i => i.type === type); 
    let upgradedImprovement = this.improvement[index]; // assign upgradedImprovement to the index match 
    let newLevel = upgradedImprovement.level + 1;

    // Calculate the upgrade cost (multiplying the base cost by the new level)
    let upgradedCost = {
      person:upgradedImprovement.cost.person * newLevel,
      lumber:upgradedImprovement.cost.lumber * newLevel,
      grain:upgradedImprovement.cost.grain * newLevel,
      water:upgradedImprovement.cost.water * newLevel,
      sheep:upgradedImprovement.cost.sheep * newLevel,
    };

    // Check if the user can afford the upgrade
    // !this.canAfford = false 
    if (!this.canAfford(upgradedCost)) {
      return `Not enough resources to upgrade ${type} to level ${newLevel}.`;
    }

    // Deduct the upgrade cost
    this.availableResources.person -= upgradedCost.person;
    this.availableResources.lumber -= upgradedCost.lumber;
    this.availableResources.grain -= upgradedCost.grain;
    this.availableResources.water -= upgradedCost.water;
    this.availableResources.sheep -= upgradedCost.sheep;

    upgradedImprovement.level = newLevel;

    let upgradedResources = {
      person:upgradedImprovement.resource.person * newLevel,
      lumber:upgradedImprovement.resource.lumber * newLevel,
      grain:upgradedImprovement.resource.grain * newLevel,
      water:upgradedImprovement.resource.water * newLevel,
      sheep:upgradedImprovement.resource.sheep * newLevel,
    };

    this.addResources(upgradedResources);

    console.log(`${type} upgraded to level ${newLevel}.`);
    return `${type} upgraded to level ${newLevel}.`;
  }
  
   // PURPOSE: ↓cost ∝ resource (directly proportional)
  downgradeImprovement(type:string){
    let index = this.improvement.findIndex(i => i.type === type);
    let downgradedImprovement = this.improvement[index];
    let newLevel = downgradedImprovement.level - 1;

    // still needs to be included incase upgraded >2 (?)
    let downgradedCost = {
      person:downgradedImprovement.cost.person * newLevel,
      lumber:downgradedImprovement.cost.lumber * newLevel,
      grain:downgradedImprovement.cost.grain * newLevel,
      water:downgradedImprovement.cost.water * newLevel,
      sheep:downgradedImprovement.cost.sheep * newLevel,
    };

    // "giving back" the resources
    this.availableResources.person += downgradedCost.person;
    this.availableResources.lumber += downgradedCost.lumber;
    this.availableResources.grain += downgradedCost.grain;
    this.availableResources.water += downgradedCost.water;
    this.availableResources.sheep += downgradedCost.sheep;
  
    downgradedImprovement.level = newLevel;

    let additionalResources = {
      person: downgradedImprovement.resource.person * newLevel,
      lumber: downgradedImprovement.resource.lumber * newLevel,
      grain: downgradedImprovement.resource.grain * newLevel,
      water: downgradedImprovement.resource.water * newLevel,
      sheep: downgradedImprovement.resource.sheep * newLevel,
    };

    this.addResources(additionalResources);
  }
}
