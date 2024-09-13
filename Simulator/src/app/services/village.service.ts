import { Injectable } from '@angular/core';
import { ImprovementModel } from '../models/improvement-model';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  constructor() { }
  
  improvement:ImprovementModel[] = [];
  allImprovements = 
    {house: { cost: { people: 0, lumber: 5, grain: 5, water: 5, sheep: 1 }, resource: { people: 5, lumber: 0, grain: 0, water: 0, sheep: 0 }}}
  
}

