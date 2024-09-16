import { CommonModule} from '@angular/common';
import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { TileComponent } from './tile/tile.component';
import { AddImprovementDialogComponent } from './add-improvement-dialog/add-improvement-dialog.component';
import { EditImprovementDialogComponent } from './edit-improvement-dialog/edit-improvement-dialog.component';
import { ImprovementModel } from '../../models/improvement-model';
import { VillageService } from '../../services/village.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, TileComponent, AddImprovementDialogComponent, EditImprovementDialogComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  constructor(private villageService:VillageService) {}

  grid:number[] = Array(25).fill(0); 
  improvements:ImprovementModel[] = []; 
  showAddDialog:boolean = false;
  showEditDialog:boolean = false;

  ngOnInit():void {
    this.grid = Array(25).fill(0); // 5x5 grid
    this.improvements = Array(25).fill(null); // empty
  }
     
   

  onCellClick(index: number):void {
   console.log(`${index}`);
   
   if (this.improvements[index] === null) {
    console.log("empty cell");
    this.showAddDialog = true;
   }
   else {
    let improvement = this.improvements[index];
    console.log(`${improvement.type} clicked`);
    this.showEditDialog = true;
   }
  }
  onImprovementRemove():void {
      this.refresh()

  }
  refresh():void{
    this.improvements= this.villageService.getImprovements();
  }
}
