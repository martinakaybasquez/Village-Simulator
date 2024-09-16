import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImprovementModel } from '../../../models/improvement-model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input() index:number = 0;
  @Input() improvement:ImprovementModel | null = null;
  @Output() cellClick = new EventEmitter<number>();

  onClick():void {
    this.cellClick.emit(this.index);
  }
  getIcon(type:string):string {
    switch (type) {
      case 'person':
        return 'fas fa-house';
      case 'grain':
        return 'fas fa-seedling';
      case 'sheep':
        return 'fas fa-horse';
      case 'lumber':
        return 'fas fa-tree';
      case 'water':
        return 'fas fa-tint';
      default:
        return 'fas fa-question';
    }
  }
}
