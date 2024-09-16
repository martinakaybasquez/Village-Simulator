import { Injectable } from '@angular/core';
import { ImprovementModel } from '../models/improvement-model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  constructor() { }
  resources = {
    person: 0,
    lumber: 5,
    grain: 5,
    water: 5,
    sheep: 1,
  };
  private valueEmitter = new BehaviorSubject<any>(null);
  valueEmitter$ = this.valueEmitter.asObservable();
  improvement:ImprovementModel[] = [];
  allImprovements: ImprovementModel[] = [
    { 
      type: "person", 
      level: 1,  
      cost: { person: 0, lumber: 5, grain: 5, water: 5, sheep: 1 }, 
      resource: { person: 5, lumber: 0, grain: 0, water: 0, sheep: 0 } 
    },
    { 
      type: "grain", 
      level: 1,  
      cost: { person: 1, lumber: 0, grain: 0, water: 2, sheep: 0 }, 
      resource: { person: 0, lumber: 0, grain: 10, water: 0, sheep: 0 } 
    },
    { 
      type: "sheep", 
      level: 1,  
      cost: { person: 1, lumber: 0, grain: 2, water: 2, sheep: 0 }, 
      resource: { person: 0, lumber: 0, grain: 0, water: 0, sheep: 5 } 
    },
    { 
      type: "lumber", 
      level: 1,  
      cost: { person: 1, lumber: 0, grain: 0, water: 0, sheep: 0 }, 
      resource: { person: 0, lumber: 10, grain: 0, water: 0, sheep: 0 } 
    },
    { 
      type: "water", 
      level: 1,  
      cost: { person: 1, lumber: 2, grain: 0, water: 0, sheep: 0 }, 
      resource: { person: 0, lumber: 0, grain: 0, water: 10, sheep: 0 } 
    }
];
getImprovements(type:string) {
  return this.allImprovements.find(i=>i.type === type)||null;
}

getResources() {
  return this.resources;
}
  
  addImprovement(improvementItem:ImprovementModel):string{
   
if(this.canAfford(improvementItem) || true ){
  this.resources.person -= improvementItem.cost.person;
  this.resources.lumber -= improvementItem.cost.lumber;
  this.resources.grain -= improvementItem.cost.grain;
  this.resources.water -= improvementItem.cost.water;
  this.resources.sheep -= improvementItem.cost.sheep;
 this.addResources(improvementItem.resource);
  this.improvement.push(improvementItem);
  return `${improvementItem.type} is added successfully`;
}else{
return `${improvementItem.type} is not enough`;
}
  }
  removeImprovement(type: string): boolean {
   let index = this.improvement.findIndex(i => i.type === type);
  let newimprovement = this.improvement[index];
    this.addResources(newimprovement.cost); // Re-add the cost to resources
    this.deductCost(newimprovement.resource); // Remove the resources produced by the newimprovement
    this.improvement.splice(index, 1);
    console.log(`Improvement ${type} removed.`);
    return true;
}
upgradeImprovement(type: string): string {
  // Find the index of the improvement to upgrade
  let index = this.improvement.findIndex(i => i.type === type);
  let improvementToUpgrade = this.improvement[index];
  let newLevel = improvementToUpgrade.level + 1;

  // Calculate the upgrade cost (multiplying the base cost by the new level)
  let upgradeCost = {
    person: improvementToUpgrade.cost.person * newLevel,
    lumber: improvementToUpgrade.cost.lumber * newLevel,
    grain: improvementToUpgrade.cost.grain * newLevel,
    water: improvementToUpgrade.cost.water * newLevel,
    sheep: improvementToUpgrade.cost.sheep * newLevel,
  };

  // Check if the user can afford the upgrade
  if (!this.canAfford(upgradeCost)) {
    return `Not enough resources to upgrade ${type} to level ${newLevel}.`;
  }

  // Deduct the upgrade cost
  this.resources.person -= upgradeCost.person;
  this.resources.lumber -= upgradeCost.lumber;
  this.resources.grain -= upgradeCost.grain;
  this.resources.water -= upgradeCost.water;
  this.resources.sheep -= upgradeCost.sheep;

    improvementToUpgrade.level = newLevel;

   let additionalResources = {
    person: improvementToUpgrade.resource.person * newLevel,
    lumber: improvementToUpgrade.resource.lumber * newLevel,
    grain: improvementToUpgrade.resource.grain * newLevel,
    water: improvementToUpgrade.resource.water * newLevel,
    sheep: improvementToUpgrade.resource.sheep * newLevel,
  };

  this.addResources(additionalResources);

  console.log(`${type} upgraded to level ${newLevel}.`);
  return `${type} upgraded to level ${newLevel}.`;
}

  downgradeImprovement(){

  }
  private canAfford(cost: any): boolean {
    return  this.resources.lumber >= cost.lumber &&
    this.resources.grain >= cost.grain &&
    this.resources.water >= cost.water &&
    this.resources.sheep >= cost.sheep &&
    this.resources.person >= cost.person;

  }
//   private canAfford(cost: { [key: string]: number }): boolean {
//     return Object.keys(cost).every(resource => 
//         this.resources[resource] >= cost[resource]
//     );
// }

  private addResources(resource: any): void {
    this.resources.lumber += resource.lumber;
    this.resources.grain += resource.grain;
    this.resources.water += resource.water;
    this.resources.sheep += resource.sheep;
    this.resources.person += resource.person;
    this.valueEmitter.next(true);
    console.log("emitting");
}
private deductCost(cost: { [key: string]: number }): void {
  Object.keys(cost).forEach(resource => {
      (this.resources as any)[resource] -= cost[resource];
  });
}

}

