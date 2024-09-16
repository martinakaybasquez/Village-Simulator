import { Component, EventEmitter, Input,OnInit,Output } from '@angular/core';
import { ImprovementModel } from '../../models/improvement-model';
import { VillageService } from '../../services/village.service';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { AddImprovementDialogComponent } from "./add-improvement-dialog/add-improvement-dialog.component";
import { EditImprovementDialogComponent } from "./edit-improvement-dialog/edit-improvement-dialog.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, TileComponent, AddImprovementDialogComponent, EditImprovementDialogComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  grid: number[] = Array(25).fill(0); 
  improvements: ImprovementModel[] =[]; 
showAddDialog:boolean = false;
showEditDialog:boolean = false;
selectedCellIndex: number | null = null;
  constructor(private villageService: VillageService) {}

  ngOnInit():void {
    this.grid = Array(25).fill(0); // 5x5 grid
    this.improvements = Array(25).fill(null); // empty
  }
     
   

  onCellClick(index: number): void {
   console.log(`${index}`);
   
   if(this.improvements[index]=== null){
console.log("empty cell");
this.selectedCellIndex = index;
this.showAddDialog =true;
   }else{
    let improvement = this.improvements[index];
    console.log(`${improvement.type} clicked`);
    this.showEditDialog =true;
   }
  }
  onImprovementAdded(type: string): void {
    if (this.selectedCellIndex !== null) {
      let newImprovement = this.villageService.allImprovements.find(i => i.type === type);
      
      if (newImprovement) {
        // Add improvement to service and update the grid
        let result = this.villageService.addImprovement(newImprovement);
        console.log(result);
        
        // Update local improvements array
        this.improvements[this.selectedCellIndex] = newImprovement;
        this.showAddDialog = false;
        this.selectedCellIndex = null;
        
      }
    }
  }
  
  }
