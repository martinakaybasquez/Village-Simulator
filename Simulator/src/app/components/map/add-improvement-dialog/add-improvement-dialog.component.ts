import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { VillageService } from '../../../services/village.service';

@Component({
  selector: 'app-add-improvement-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-improvement-dialog.component.html',
  styleUrl: './add-improvement-dialog.component.css'
})
export class AddImprovementDialogComponent {
  @Output() improvementAdded = new EventEmitter<string>();
  showForm:boolean = true;
  selectedType: string | null = null; 
  benefits: string[] = [];
  costKeys: string[] = [];
  cost: { lumber: number; grain: number; water: number; sheep: number; person: number } = { lumber: 0, grain: 0, water: 0, sheep: 0, person: 0 };
  availableTypes = ['person', 'grain', 'sheep', 'lumber', 'water'];
  constructor(private villageService: VillageService) {}
  selectImprovement(type: string): void {
    this.selectedType = type;
    console.log(`Improvement selected: ${type}`);
    let improvementDetails = this.villageService.getImprovements(type);
 
    if (improvementDetails) {
      console.log(improvementDetails);
      this.cost = improvementDetails.cost;  
      console.log(this.cost);
     this.benefits = Object.keys(improvementDetails.resource).map(key => 
        `${key}: ${(improvementDetails.resource as any)[key]}`
      ); // Assuming benefits is an array of strings
      for(let key of Object.keys(this.cost)){
console.log(key);
      }
      for(let i = 0;i>=Object.keys(this.cost).length;i--) {
        this.costKeys[i]=Object.keys(this.cost)[i]  ;
     }
      
       this.costKeys = Object.keys(this.cost);
       console.log(this.costKeys);
      // console.log(this.costKeys);
      
    }
  }
  trackByIndex(index: number): number {
    return index;
  }
  
  addImprovement(): void {
    if (this.selectedType) {
      const improvementDetails = this.villageService.getImprovements(this.selectedType);
      if (improvementDetails) {
        const result = this.villageService.addImprovement(improvementDetails);
        alert(result);
        this.improvementAdded.emit(improvementDetails.type);
        this.showForm = false; // Hide the form
      } else {
        alert('Improvement details not found');
      }
    } else {
      alert('Please select an improvement type');
    }
  }
  

  // Method to cancel the form and reset
  cancel(): void {
    this.showForm = false; // Hide the form
    this.selectedType = null; // Reset the selected type
  }
}
