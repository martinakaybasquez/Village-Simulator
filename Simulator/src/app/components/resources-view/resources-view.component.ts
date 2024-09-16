import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { ResourceLineComponent } from './resource-line/resource-line.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VillageService } from '../../services/village.service';
import { ImprovementModel } from '../../models/improvement-model';

@Component({
  selector: 'app-resources-view',
  standalone: true,
  imports: [ResourceLineComponent, CommonModule],
  templateUrl: './resources-view.component.html',
  styleUrl: './resources-view.component.css'
})
export class ResourcesViewComponent implements OnInit {
  public displayResources:{[key: string]:number} = {};
  private subscription:Subscription = new Subscription;
  receivedValue:any;

  constructor(private myService:VillageService) {}
  ngOnInit():void {
    this.subscription = this.myService.valueEmitter$.subscribe((value:boolean) => {
      this.reloadTable();
    });
  }

  reloadTable():void {
    this.displayResources = this.myService.getResources();
    console.log(this.displayResources);  
  }
}
