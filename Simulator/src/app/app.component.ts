import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { VillageService } from './services/village.service';
import { ImprovementModel } from './models/improvement-model';
import { ResourcesViewComponent } from './components/resources-view/resources-view.component';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResourcesViewComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Simulator';

  constructor(private myService:VillageService) {}

  private subscription:Subscription = new Subscription;

  ngOnInit():void {
    const improvement:ImprovementModel = {
      type: 'Farm',   // Example value, you can change it
      level: 1,
      cost: {
        lumber: 100,
        grain: 50,
        water: 30,
        sheep: 20,
        person: 10,
      },
      resource: {
        lumber: 150,
        grain: 80,
        water: 40,
        sheep: 25,
        person: 15,
      }
    };

    this.subscription = this.myService.valueEmitter$.subscribe((value: boolean) => {
      console.log("hi" + value);
    });
  }
}
