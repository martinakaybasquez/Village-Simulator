import { Component, EventEmitter, Input, input, output, Output } from '@angular/core';
import { ImprovementModel } from '../../../models/improvement-model';
import { VillageService } from '../../../services/village.service';

@Component({
  selector: 'app-edit-improvement-dialog',
  standalone: true,
  imports: [],
  templateUrl: './edit-improvement-dialog.component.html',
  styleUrl: './edit-improvement-dialog.component.css'
})
export class EditImprovementDialogComponent {
  @Input() improvement: ImprovementModel = {} as ImprovementModel;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() improvementRemove = new EventEmitter<void>();
  showForm:boolean = true;
  upgradeMessage: string = '';
  downgradeMessage: string = '';
  cancel(): void {
      this.showForm = false; // Hide the form
      // this.selectedType = null; // Reset the selected type
    }

 
     availableResources:any;

   constructor(public villageServices: VillageService){}

  ngOnInit():void{
    this.availableResources = this.villageServices.getResources();
   console.log(this.availableResources); 
   console.log(this.improvement);
  }
  getImprovement():ImprovementModel{
    return this.improvement;
  }
 canAfford(cost: any): boolean{
   return this.villageServices.canAfford(cost);
  }

canDowngrade(resource: any): boolean {
  return this.getImprovement().level > 1;
}
upgradeImprovement():void {
  let result = this.villageServices.upgradeImprovement(this.getImprovement().type);
    this.upgradeMessage = result; // Display the upgrade message (success or failure)
    console.log(result);
    alert(result);
    this.showForm = false;
}
  
  

downgradeImprovement(): void {
  const result = this.villageServices.downgradeImprovement(this.getImprovement().type);
    this.downgradeMessage = result; // Display the downgrade message
    console.log(result);
    alert(result);
    this.showForm = false;
}



close():void {
  this.closeDialog.emit();
}
removeImprovement(): void { 
  if (this.improvement) { 
    this.villageServices.removeImprovement(this.improvement.type);
   this.improvementRemove.emit(); 
   // Notify parent about the removal 
   this.showForm = false;}} // Optionally close the dialog } }
}