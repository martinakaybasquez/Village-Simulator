import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resource-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-line.component.html',
  styleUrl: './resource-line.component.css'
})
export class ResourceLineComponent {
  @Input() type:string = '';
  @Input() amount:number = 0;
  getIcon(): string {
    let iconMap: {[key: string]:string} = {
      'grain':'fa-seedling',
      'lumber':'fa-tree',
      'water':'fa-tint',
      'sheep':'fa-horse',
      'person':'fa-house'
    };
    return iconMap[this.type] || 'fa-question';
  }
}
